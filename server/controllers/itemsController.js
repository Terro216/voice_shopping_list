import db from "../db/index.js";
import { scheduleListPush } from "../push.js";
import { hasListAccess, getList } from "../lists.js";
import {
  isValidItemId,
  isValidListId,
  isValidCount,
  normalizeItemName,
  normalizeItemNote,
  historyKey,
  isValidUnit,
  quantityLimit,
  roundQuantity,
  MAX_ORDER_IDS,
} from "../validation.js";

// Access model: `requireListAccess` runs before every handler here and puts the
// list id in `req.list` — the token says who is asking, that says whether they
// may. See the note at the top of server/lists.js for how lists are identified.

// Broadcasts after commit. The actor identifies a page instance; current
// clients reconcile all echoes with guards for in-flight local changes.
const notifyList = (req, pushLabel, list = req.list) => {
  const notify = () => {
    req.app.get("io").to(`list_${list}`).emit("list_updated", { actor: req.get("X-Client-Id") || null, version: db.prepare("SELECT version FROM lists WHERE id = ?").get(list)?.version });
    if (pushLabel) scheduleListPush(list, req.user.username, pushLabel);
  };
  if (req.afterCommit) req.afterCommit(notify); else notify();
};

const matchesExpectation = (item, expected) => expected &&
  item.name === expected.name && (item.note ?? null) === expected.note &&
  item.count === expected.count && (item.unit ?? null) === expected.unit &&
  Boolean(item.bought) === expected.bought;

const toItemJson = (row) => ({ ...row, bought: Boolean(row.bought) });

// Active items follow the manual order (`position`, which dictation appends to
// and dragging rewrites); bought ones surface most-recently-checked first, so
// "what did I just tick off" is always at the top of that group.
const ITEM_COLUMNS = "id, name, note, count, unit, list_id, bought, bought_at, position";
const ITEM_ORDER =
  "ORDER BY bought, CASE WHEN bought = 1 THEN -COALESCE(bought_at, 0) ELSE COALESCE(position, rowid) END, rowid";

const LIVE = "deleted_at IS NULL";

// How long a deleted item stays recoverable in the list's "deleted" drawer.
const TRASH_TTL_MS = 30 * 24 * 60 * 60 * 1000;
// Only ever a handful are worth showing, and the drawer is a safety net rather
// than an archive.
const TRASH_VISIBLE = 50;

// Beyond this many remembered names per list, the rarest are dropped: the
// suggestion row only ever shows a handful, and typos would accumulate forever.
const HISTORY_LIMIT = 400;

const nextPosition = (list) =>
  db
    .prepare(`SELECT COALESCE(MAX(position), 0) + 1 AS next FROM items WHERE list_id = ?`)
    .get(list).next;

// Expired trash is swept lazily on reads. Doing it per request would mean a
// write on every poll, so one process sweeps at most once an hour.
const SWEEP_INTERVAL_MS = 60 * 60 * 1000;
let lastSweep = 0;
const sweepTrash = () => {
  const now = Date.now();
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  try {
    db.prepare("DELETE FROM items WHERE deleted_at IS NOT NULL AND deleted_at < ?").run(
      now - TRASH_TTL_MS,
    );
  } catch (err) {
    console.error("trash sweep failed:", err.message);
  }
};

// Frequency history behind autocomplete/"frequent" chips. Never worth failing
// the actual mutation over.
const recordHistory = (list, name) => {
  try {
    db.prepare(
      `INSERT INTO history (list_id, name, name_lower, uses, last_used) VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(list_id, name_lower) DO UPDATE SET
         uses = uses + 1,
         last_used = excluded.last_used,
         name = excluded.name`,
    ).run(list, name, historyKey(name), Date.now());

    const { total } = db
      .prepare("SELECT COUNT(*) AS total FROM history WHERE list_id = ?")
      .get(list);
    if (total > HISTORY_LIMIT) {
      db.prepare(
        `DELETE FROM history WHERE id IN (
           SELECT id FROM history WHERE list_id = ?
           ORDER BY uses ASC, last_used ASC LIMIT ?
         )`,
      ).run(list, total - HISTORY_LIMIT);
    }
  } catch (err) {
    console.error("history record failed:", err.message);
  }
};

// Shared by member and guest reads. This helper never sweeps trash or writes.
export const readListItems = (list) => {
  const rows = db
    .prepare(`SELECT ${ITEM_COLUMNS} FROM items WHERE list_id = ? AND ${LIVE} ${ITEM_ORDER}`)
    .all(list);
  return rows.map(toItemJson);
};

export const getItems = (req, res) => {
  sweepTrash();
  res.json(readListItems(req.list));
};

/** A revision and its full snapshot are read in one SQLite transaction. */
export const getSync = (req, res) => {
  sweepTrash();
  const since=req.query.since;
  if (since !== undefined && (typeof since !== "string" || !/^\d{1,16}$/.test(since) || !Number.isSafeInteger(Number(since)))) {
    return res.status(400).json({error:"Invalid list version"});
  }
  const result=db.transaction(()=>{
    const {version}=db.prepare("SELECT version FROM lists WHERE id = ?").get(req.list);
    return {version,items:since !== undefined && Number(since)===version ? null : readListItems(req.list)};
  })();
  res.set("Cache-Control","no-store").json(result);
};

export const getDeletedItems = (req, res) => {
  sweepTrash();
  const rows = db
    .prepare(
      `SELECT ${ITEM_COLUMNS}, deleted_at FROM items
        WHERE list_id = ? AND deleted_at IS NOT NULL
        ORDER BY deleted_at DESC LIMIT ?`,
    )
    .all(req.list, TRASH_VISIBLE);
  res.json(rows.map(toItemJson));
};

export const getSuggestions = (req, res) => {
  const q = typeof req.query.q === "string" ? historyKey(req.query.q.trim()).slice(0, 100) : "";
  const rows = q
    ? db
        .prepare(
          `SELECT name, uses FROM history WHERE list_id = ? AND name_lower LIKE ? ESCAPE '\\'
           ORDER BY uses DESC, last_used DESC LIMIT 8`,
        )
        .all(req.list, q.replace(/[\\%_]/g, "\\$&") + "%")
    : db
        .prepare(
          "SELECT name, uses FROM history WHERE list_id = ? ORDER BY uses DESC, last_used DESC LIMIT 12",
        )
        .all(req.list);
  res.json(rows);
};

export const addItem = (req, res) => {
  const { id, count, bought } = req.body;
  const unit = req.body.unit ?? null;
  const name = normalizeItemName(req.body.name);
  // Undoing a delete re-posts the item as it was, notes included.
  const note = req.body.note === undefined ? null : normalizeItemNote(req.body.note);

  if (!isValidItemId(id) || !name || note === false) {
    return res.status(400).json({ error: "Invalid item fields" });
  }
  if (!isValidCount(count === undefined ? 1 : count, unit)) {
    return res.status(400).json({ error: "Invalid count" });
  }
  if (bought !== undefined && typeof bought !== "boolean") {
    return res.status(400).json({ error: "Invalid bought flag" });
  }

  // An id that is already here is either an offline replay of a POST that did
  // land, or an undo re-posting something that was deleted. Both mean "make the
  // row look like this", which also brings a deleted row back.
  const created = db.transaction(() => {
    const existing = db
      .prepare("SELECT deleted_at FROM items WHERE id = ? AND list_id = ?")
      .get(id, req.list);

    if (existing) {
      if (existing.deleted_at === null) return false;
      db.prepare(
        `UPDATE items SET name = ?, note = ?, count = ?, unit = ?, bought = ?, bought_at = ?,
                          deleted_at = NULL, position = ?
          WHERE id = ? AND list_id = ?`,
      ).run(
        name,
        note,
        count ?? 1,
        unit,
        bought ? 1 : 0,
        bought ? Date.now() : null,
        nextPosition(req.list),
        id,
        req.list,
      );
      return true;
    }

    db.prepare(
      `INSERT INTO items (id, name, note, count, unit, list_id, bought, bought_at, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      id,
      name,
      note,
      count ?? 1,
      unit,
      req.list,
      bought ? 1 : 0,
      bought ? Date.now() : null,
      nextPosition(req.list),
    );
    return true;
  })();

  if (!created) {
    // Already present and live: the replay has nothing to do.
    return res.json({ success: true });
  }

  recordHistory(req.list, name);
  notifyList(req, `+ ${name}${unit ? ` ${count ?? 1} ${unit}` : (count ?? 1) > 1 ? ` ×${count}` : ""}`);
  res.status(201).json({ success: true });
};

// Single mutation endpoint for counts: positive delta increments (clamped to
// the unit's limit), negative decrements; a count dropping to zero sends the row to
// the deleted drawer, exactly like an explicit delete.
export const changeItemCount = (req, res) => {
  const { id } = req.params;
  const { delta, expectedUnit } = req.body;

  if (!isValidItemId(id)) {
    return res.status(400).json({ error: "Invalid fields" });
  }
  if (typeof delta !== "number" || !Number.isFinite(delta) || delta === 0 ||
      Math.abs(delta) > 999999 || delta !== roundQuantity(delta) ||
      (expectedUnit !== undefined && !isValidUnit(expectedUnit))) {
    return res.status(400).json({ error: "Invalid quantity change" });
  }

  const apply = db.transaction(() => {
    const item = db
      .prepare(`SELECT name, count, unit FROM items WHERE id = ? AND list_id = ? AND ${LIVE}`)
      .get(id, req.list);
    if (!item) return null;

    if (expectedUnit !== undefined && expectedUnit !== item.unit) return { error: 409 };
    if (!isValidCount(Math.abs(delta), item.unit)) return { error: 400 };
    const next = Math.min(quantityLimit(item.unit), roundQuantity(item.count + delta));
    if (next <= 0) {
      db.prepare("UPDATE items SET deleted_at = ? WHERE id = ? AND list_id = ?").run(
        Date.now(),
        id,
        req.list,
      );
      return { label: `− ${item.name}` };
    }
    db.prepare("UPDATE items SET count = ? WHERE id = ? AND list_id = ?").run(next, id, req.list);
    return { label: `${item.name} ${item.unit ? `${next} ${item.unit}` : `×${next}`}` };
  });

  const result = apply();
  if (!result) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (result.error) return res.status(result.error).json({ error: "Quantity or unit changed; refresh the item" });
  notifyList(req, result.label);
  res.json({ success: true });
};

/**
 * Fixes what dictation misheard ("малако жирное") and attaches the note that
 * tells whoever is in the shop which one to grab — without deleting and
 * re-adding the row, which would lose its place and its count. Either field may
 * be omitted to leave it untouched.
 */
export const updateItem = (req, res) => {
  const { id } = req.params;
  const hasName = req.body.name !== undefined;
  const hasNote = req.body.note !== undefined;
  const hasCount = req.body.count !== undefined;
  const hasUnit = req.body.unit !== undefined;
  const hasBought = req.body.bought !== undefined;

  const name = hasName ? normalizeItemName(req.body.name) : null;
  const note = hasNote ? normalizeItemNote(req.body.note) : null;

  if (!isValidItemId(id) || (!hasName && !hasNote && !hasCount && !hasUnit && !hasBought)) {
    return res.status(400).json({ error: "Invalid fields" });
  }
  if ((hasName && !name) || (hasNote && note === false)) {
    return res.status(400).json({ error: "Invalid fields" });
  }

  if (hasBought && typeof req.body.bought !== "boolean") return res.status(400).json({ error: "Invalid bought flag" });
  const assignments = [];
  const values = [];
  if (hasBought) { assignments.push("bought = ?", "bought_at = ?"); values.push(req.body.bought ? 1 : 0, req.body.bought ? Date.now() : null); }
  if (hasName) {
    assignments.push("name = ?");
    values.push(name);
  }
  if (hasNote) {
    assignments.push("note = ?");
    values.push(note);
  }

  const result = db.transaction(() => {
    const item = db.prepare(`SELECT ${ITEM_COLUMNS} FROM items WHERE id = ? AND list_id = ? AND ${LIVE}`).get(id, req.list);
    if (!item) return 404;
    if (req.body.expected !== undefined && !matchesExpectation(item, req.body.expected)) {
      // A lost response may replay an already applied absolute correction.
      const alreadyApplied = req.body.expected && matchesExpectation(item, {
        ...req.body.expected,
        ...(hasName ? { name } : {}), ...(hasNote ? { note } : {}),
        ...(hasCount ? { count: req.body.count } : {}), ...(hasUnit ? { unit: req.body.unit } : {}),
        ...(hasBought ? { bought: req.body.bought } : {}),
      });
      return alreadyApplied ? 208 : 409;
    }
    if ((hasCount || hasUnit) && !isValidCount(hasCount ? req.body.count : item.count, hasUnit ? req.body.unit : item.unit)) return 400;
    if (hasCount) { assignments.push("count = ?"); values.push(req.body.count); }
    if (hasUnit) { assignments.push("unit = ?"); values.push(req.body.unit); }
    db.prepare(`UPDATE items SET ${assignments.join(", ")} WHERE id = ? AND list_id = ? AND ${LIVE}`)
      .run(...values, id, req.list);
    return 200;
  })();
  if (result === 208) return res.json({ success: true });
  if (result !== 200) return res.status(result).json({ error: result === 404 ? "Item not found" : result === 409 ? "Item changed; repeat the correction" : "Invalid quantity or unit" });

  if (hasName) recordHistory(req.list, name);

  const label = hasName
    ? `✎ ${name}`
    : `✎ ${db.prepare("SELECT name FROM items WHERE id = ? AND list_id = ?").get(id, req.list).name}`;
  notifyList(req, label);
  res.json({ success: true });
};

/** Move the existing row atomically, preserving its identity and all details. */
export const moveItem = (req, res) => {
  const { id } = req.params;
  const { destination, expected } = req.body;
  if (!isValidItemId(id) || !isValidListId(destination) || destination === req.list) {
    return res.status(400).json({ error: "Invalid destination" });
  }
  if (!getList(destination) || !hasListAccess(req.user.username, destination)) {
    return res.status(403).json({ error: "No access to destination list" });
  }
  const result = db.transaction(() => {
    const item = db.prepare(`SELECT ${ITEM_COLUMNS} FROM items WHERE id = ? AND ${LIVE}`).get(id);
    if (!item || (item.list_id !== req.list && item.list_id !== destination)) return { error: 404 };
    // Replaying a request whose response was lost must not duplicate the row.
    if (item.list_id === destination) return { item, replay: true };
    if (expected !== undefined && !matchesExpectation(item, expected)) return { error: 409 };
    const position = nextPosition(destination);
    db.prepare(`UPDATE items SET list_id = ?, position = ? WHERE id = ? AND list_id = ? AND ${LIVE}`)
      .run(destination, position, id, req.list);
    return { item: { ...item, list_id: destination, position } };
  })();
  if (result.error) return res.status(result.error).json({ error: "Item missing or changed; repeat the move" });
  if (!result.replay) {
    notifyList(req, `→ ${result.item.name}`);
    notifyList(req, `← ${result.item.name}`, destination);
  }
  res.json(toItemJson(result.item));
};

export const setItemBought = (req, res) => {
  const { id } = req.params;
  const { bought } = req.body;

  if (!isValidItemId(id) || typeof bought !== "boolean") {
    return res.status(400).json({ error: "Invalid fields" });
  }

  const item = db
    .prepare(`SELECT ${ITEM_COLUMNS} FROM items WHERE id = ? AND list_id = ? AND ${LIVE}`)
    .get(id, req.list);
  if (!item) return res.status(404).json({ error: "Item not found" });
  if (req.body.expected && !matchesExpectation(item, req.body.expected)) return res.status(409).json({ error: "Item changed" });

  db.prepare("UPDATE items SET bought = ?, bought_at = ? WHERE id = ? AND list_id = ?").run(
    bought ? 1 : 0,
    bought ? Date.now() : null,
    id,
    req.list,
  );

  notifyList(req, `${bought ? "✓" : "↩"} ${item.name}`);
  res.json({ success: true });
};

/**
 * Rewrites the manual order from the ids the client sends, in the order it
 * shows them. Ids that are not on the list are ignored, and anything the client
 * did not mention keeps a position after the ones it did — so a stale tab
 * reordering four of five items cannot make the fifth vanish from the order.
 */
export const reorderItems = (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length > MAX_ORDER_IDS || !ids.every(isValidItemId)) {
    return res.status(400).json({ error: "ids must be an array of item ids" });
  }

  const applied = db.transaction(() => {
    const live = new Set(
      db
        .prepare(`SELECT id FROM items WHERE list_id = ? AND ${LIVE}`)
        .all(req.list)
        .map((row) => row.id),
    );
    const update = db.prepare("UPDATE items SET position = ? WHERE id = ? AND list_id = ?");

    let position = 0;
    const seen = new Set();
    for (const id of ids) {
      if (!live.has(id) || seen.has(id)) continue;
      seen.add(id);
      update.run(++position, id, req.list);
    }
    // Push everything the client did not mention behind what it did.
    for (const id of live) {
      if (seen.has(id)) continue;
      update.run(++position, id, req.list);
    }
    return seen.size;
  })();

  if (applied > 0) notifyList(req, null);
  res.json({ success: true, ordered: applied });
};

const selectedIds = (req, res) => {
  const ids = req.body?.ids;
  if (ids !== undefined && (!Array.isArray(ids) || ids.length > MAX_ORDER_IDS || !ids.every(isValidItemId))) {
    res.status(400).json({ error: "Invalid item ids" });
    return false;
  }
  return ids === undefined ? { clause: '', values: [] } : {
    clause: ` AND id IN (${ids.map(() => '?').join(',') || 'NULL'})`, values: ids,
  };
};

export const clearBought = (req, res) => {
  const selected = selectedIds(req, res);
  if (!selected) return;
  const { changes } = db
    .prepare(`UPDATE items SET deleted_at = ? WHERE list_id = ? AND bought = 1 AND ${LIVE}${selected.clause}`)
    .run(Date.now(), req.list, ...selected.values);

  if (changes > 0) {
    notifyList(req, `cleared bought (${changes})`);
  }
  res.json({ success: true, removed: changes });
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  if (!isValidItemId(id)) {
    return res.status(400).json({ error: "Invalid fields" });
  }

  const item = db
    .prepare(`SELECT ${ITEM_COLUMNS} FROM items WHERE id = ? AND list_id = ? AND ${LIVE}`)
    .get(id, req.list);
  if (item && req.body?.expected && !matchesExpectation(item, req.body.expected)) return res.status(409).json({ error: "Item changed" });
  db.prepare(`UPDATE items SET deleted_at = ? WHERE id = ? AND list_id = ? AND ${LIVE}`).run(
    Date.now(),
    id,
    req.list,
  );

  if (item) notifyList(req, `− ${item.name}`);
  res.json({ success: true });
};

/** Puts an item from the deleted drawer back at the end of the active list. */
export const restoreItem = (req, res) => {
  const { id } = req.params;
  if (!isValidItemId(id)) {
    return res.status(400).json({ error: "Invalid fields" });
  }

  const restored = db.transaction(() => {
    const item = db
      .prepare("SELECT name FROM items WHERE id = ? AND list_id = ? AND deleted_at IS NOT NULL")
      .get(id, req.list);
    if (!item) return null;
    db.prepare(
      "UPDATE items SET deleted_at = NULL, bought = 0, bought_at = NULL, position = ? WHERE id = ? AND list_id = ?",
    ).run(nextPosition(req.list), id, req.list);
    return item;
  })();

  if (!restored) return res.status(404).json({ error: "Item not found" });

  notifyList(req, `+ ${restored.name}`);
  res.json({ success: true });
};

/** Empties the deleted drawer for good. */
export const purgeDeleted = (req, res) => {
  const selected = selectedIds(req, res);
  if (!selected) return;
  const { changes } = db
    .prepare(`DELETE FROM items WHERE list_id = ? AND deleted_at IS NOT NULL${selected.clause}`)
    .run(req.list, ...selected.values);
  if (changes > 0) notifyList(req, null);
  res.json({ success: true, purged: changes });
};
