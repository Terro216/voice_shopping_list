import db from "../db/index.js";
import { scheduleListPush } from "../push.js";
import { isValidItemId, isValidCount, normalizeItemName, historyKey, MAX_COUNT } from "../validation.js";

// Access model: a list is identified by its owner's username, and reading or
// writing it requires being the owner or an invited member. `requireListAccess`
// enforces that before any handler here runs and puts the list in `req.list`.

// Broadcasts to everyone viewing the list. The originating tab identifies
// itself with X-Client-Id so it can ignore the echo of its own change instead
// of refetching (and briefly flickering back to the pre-optimistic value).
const notifyList = (req, pushLabel) => {
  req.app.get("io").to(`list_${req.list}`).emit("list_updated", { actor: req.get("X-Client-Id") || null });
  if (pushLabel) scheduleListPush(req.list, req.user.username, pushLabel);
};

const toItemJson = (row) => ({ ...row, bought: Boolean(row.bought) });

// Active items keep insertion order; bought ones surface most-recently-checked
// first, so "what did I just tick off" is always at the top of that group.
const ITEM_COLUMNS = "id, name, count, username, bought, bought_at";
const ITEM_ORDER =
  "ORDER BY bought, CASE WHEN bought = 1 THEN -COALESCE(bought_at, 0) ELSE rowid END";

// Beyond this many remembered names per list, the rarest are dropped: the
// suggestion row only ever shows a handful, and typos would accumulate forever.
const HISTORY_LIMIT = 400;

// Frequency history behind autocomplete/"frequent" chips. Never worth failing
// the actual mutation over.
const recordHistory = (list, name) => {
  try {
    db.prepare(
      `INSERT INTO history (username, name, name_lower, uses, last_used) VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(username, name_lower) DO UPDATE SET
         uses = uses + 1,
         last_used = excluded.last_used,
         name = excluded.name`,
    ).run(list, name, historyKey(name), Date.now());

    const { total } = db
      .prepare("SELECT COUNT(*) AS total FROM history WHERE username = ?")
      .get(list);
    if (total > HISTORY_LIMIT) {
      db.prepare(
        `DELETE FROM history WHERE id IN (
           SELECT id FROM history WHERE username = ?
           ORDER BY uses ASC, last_used ASC LIMIT ?
         )`,
      ).run(list, total - HISTORY_LIMIT);
    }
  } catch (err) {
    console.error("history record failed:", err.message);
  }
};

export const getItems = (req, res) => {
  const rows = db
    .prepare(`SELECT ${ITEM_COLUMNS} FROM items WHERE username = ? ${ITEM_ORDER}`)
    .all(req.list);
  res.json(rows.map(toItemJson));
};

export const getSuggestions = (req, res) => {
  const q = typeof req.query.q === "string" ? historyKey(req.query.q.trim()).slice(0, 100) : "";
  const rows = q
    ? db
        .prepare(
          `SELECT name, uses FROM history WHERE username = ? AND name_lower LIKE ? ESCAPE '\\'
           ORDER BY uses DESC, last_used DESC LIMIT 8`,
        )
        .all(req.list, q.replace(/[\\%_]/g, "\\$&") + "%")
    : db
        .prepare(
          "SELECT name, uses FROM history WHERE username = ? ORDER BY uses DESC, last_used DESC LIMIT 12",
        )
        .all(req.list);
  res.json(rows);
};

export const addItem = (req, res) => {
  const { id, count, bought } = req.body;
  const name = normalizeItemName(req.body.name);

  if (!isValidItemId(id) || !name) {
    return res.status(400).json({ error: "Invalid item fields" });
  }
  if (count !== undefined && !isValidCount(count)) {
    return res.status(400).json({ error: "Invalid count" });
  }
  if (bought !== undefined && typeof bought !== "boolean") {
    return res.status(400).json({ error: "Invalid bought flag" });
  }

  try {
    db.prepare(
      "INSERT INTO items (id, name, count, username, bought, bought_at) VALUES (?, ?, ?, ?, ?, ?)",
    ).run(id, name, count ?? 1, req.list, bought ? 1 : 0, bought ? Date.now() : null);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
      // Offline queue replay can resend the same client-generated id — treat as done.
      return res.json({ success: true });
    }
    throw err;
  }

  recordHistory(req.list, name);
  notifyList(req, `+ ${name}${(count ?? 1) > 1 ? ` ×${count}` : ""}`);
  res.status(201).json({ success: true });
};

// Single mutation endpoint for counts: positive delta increments (clamped to
// MAX_COUNT), negative decrements; a count dropping to zero deletes the row.
export const changeItemCount = (req, res) => {
  const { id } = req.params;
  const { delta } = req.body;

  if (!isValidItemId(id)) {
    return res.status(400).json({ error: "Invalid fields" });
  }
  if (!Number.isInteger(delta) || delta === 0 || Math.abs(delta) > MAX_COUNT) {
    return res.status(400).json({ error: "delta must be a non-zero integer" });
  }

  const apply = db.transaction(() => {
    const item = db
      .prepare("SELECT name, count FROM items WHERE id = ? AND username = ?")
      .get(id, req.list);
    if (!item) return null;

    const next = Math.min(MAX_COUNT, item.count + delta);
    if (next <= 0) {
      db.prepare("DELETE FROM items WHERE id = ? AND username = ?").run(id, req.list);
      return { label: `− ${item.name}` };
    }
    db.prepare("UPDATE items SET count = ? WHERE id = ? AND username = ?").run(next, id, req.list);
    return { label: `${item.name} ×${next}` };
  });

  const result = apply();
  if (!result) {
    return res.status(404).json({ error: "Item not found" });
  }

  notifyList(req, result.label);
  res.json({ success: true });
};

// Fixing what dictation misheard ("малако жирное") without deleting and
// re-adding the row, which would lose its place and its count.
export const renameItem = (req, res) => {
  const { id } = req.params;
  const name = normalizeItemName(req.body.name);

  if (!isValidItemId(id) || !name) {
    return res.status(400).json({ error: "Invalid fields" });
  }

  const { changes } = db
    .prepare("UPDATE items SET name = ? WHERE id = ? AND username = ?")
    .run(name, id, req.list);
  if (changes === 0) return res.status(404).json({ error: "Item not found" });

  recordHistory(req.list, name);
  notifyList(req, `✎ ${name}`);
  res.json({ success: true });
};

export const setItemBought = (req, res) => {
  const { id } = req.params;
  const { bought } = req.body;

  if (!isValidItemId(id) || typeof bought !== "boolean") {
    return res.status(400).json({ error: "Invalid fields" });
  }

  const item = db.prepare("SELECT name FROM items WHERE id = ? AND username = ?").get(id, req.list);
  if (!item) return res.status(404).json({ error: "Item not found" });

  db.prepare("UPDATE items SET bought = ?, bought_at = ? WHERE id = ? AND username = ?").run(
    bought ? 1 : 0,
    bought ? Date.now() : null,
    id,
    req.list,
  );

  notifyList(req, `${bought ? "✓" : "↩"} ${item.name}`);
  res.json({ success: true });
};

export const clearBought = (req, res) => {
  const { changes } = db
    .prepare("DELETE FROM items WHERE username = ? AND bought = 1")
    .run(req.list);

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

  const item = db.prepare("SELECT name FROM items WHERE id = ? AND username = ?").get(id, req.list);
  db.prepare("DELETE FROM items WHERE id = ? AND username = ?").run(id, req.list);

  if (item) notifyList(req, `− ${item.name}`);
  res.json({ success: true });
};
