import db from "../db/index.js";
import { scheduleListPush } from "../push.js";
import {
  isPlausibleUsername,
  isValidItemId,
  isValidCount,
  normalizeItemName,
  MAX_COUNT,
} from "../validation.js";

// Access model (by design): a list is identified by its owner's username, and
// any authenticated user who knows the name can read and edit it — that is what
// the "Share list" link relies on. The token proves who acts, `username` in the
// request names the list acted upon.

const notifyList = (req, username, pushLabel) => {
  req.app.get("io").to(`list_${username}`).emit("list_updated");
  if (pushLabel) scheduleListPush(username, req.user.username, pushLabel);
};

const toItemJson = (row) => ({ ...row, bought: Boolean(row.bought) });

// Frequency history behind autocomplete/"frequent" chips. Never worth failing
// the actual mutation over.
const recordHistory = (username, name) => {
  try {
    db.prepare(
      `INSERT INTO history (username, name, name_lower, uses, last_used) VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(username, name_lower) DO UPDATE SET
         uses = uses + 1,
         last_used = excluded.last_used,
         name = excluded.name`,
    ).run(username, name, name.toLowerCase(), Date.now());
  } catch (err) {
    console.error("history record failed:", err.message);
  }
};

export const getItems = (req, res) => {
  const { username } = req.query;
  if (!isPlausibleUsername(username)) {
    return res.status(400).json({ error: "username is required" });
  }

  const rows = db
    .prepare(
      "SELECT id, name, count, username, bought FROM items WHERE username = ? ORDER BY bought, rowid",
    )
    .all(username);
  res.json(rows.map(toItemJson));
};

export const getSuggestions = (req, res) => {
  const { username } = req.query;
  if (!isPlausibleUsername(username)) {
    return res.status(400).json({ error: "username is required" });
  }

  const q = typeof req.query.q === "string" ? req.query.q.trim().toLowerCase().slice(0, 100) : "";
  const rows = q
    ? db
        .prepare(
          `SELECT name, uses FROM history WHERE username = ? AND name_lower LIKE ? ESCAPE '\\'
           ORDER BY uses DESC, last_used DESC LIMIT 8`,
        )
        .all(username, q.replace(/[\\%_]/g, "\\$&") + "%")
    : db
        .prepare(
          "SELECT name, uses FROM history WHERE username = ? ORDER BY uses DESC, last_used DESC LIMIT 12",
        )
        .all(username);
  res.json(rows);
};

export const addItem = (req, res) => {
  const { id, count, username, bought } = req.body;
  const name = normalizeItemName(req.body.name);

  if (!isValidItemId(id) || !name || !isPlausibleUsername(username)) {
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
      "INSERT INTO items (id, name, count, username, bought) VALUES (?, ?, ?, ?, ?)",
    ).run(id, name, count ?? 1, username, bought ? 1 : 0);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
      // Offline queue replay can resend the same client-generated id — treat as done.
      return res.json({ success: true });
    }
    throw err;
  }

  recordHistory(username, name);
  notifyList(req, username, `+ ${name}${(count ?? 1) > 1 ? ` ×${count}` : ""}`);
  res.status(201).json({ success: true });
};

// Single mutation endpoint for counts: positive delta increments (clamped to
// MAX_COUNT), negative decrements; a count dropping to zero deletes the row.
export const changeItemCount = (req, res) => {
  const { id } = req.params;
  const { username, delta } = req.body;

  if (!isValidItemId(id) || !isPlausibleUsername(username)) {
    return res.status(400).json({ error: "Invalid fields" });
  }
  if (!Number.isInteger(delta) || delta === 0 || Math.abs(delta) > MAX_COUNT) {
    return res.status(400).json({ error: "delta must be a non-zero integer" });
  }

  const apply = db.transaction(() => {
    const item = db
      .prepare("SELECT name, count FROM items WHERE id = ? AND username = ?")
      .get(id, username);
    if (!item) return null;

    const next = Math.min(MAX_COUNT, item.count + delta);
    if (next <= 0) {
      db.prepare("DELETE FROM items WHERE id = ? AND username = ?").run(id, username);
      return { label: `− ${item.name}` };
    }
    db.prepare("UPDATE items SET count = ? WHERE id = ? AND username = ?").run(next, id, username);
    return { label: `${item.name} ×${next}` };
  });

  const result = apply();
  if (!result) {
    return res.status(404).json({ error: "Item not found" });
  }

  notifyList(req, username, result.label);
  res.json({ success: true });
};

export const setItemBought = (req, res) => {
  const { id } = req.params;
  const { username, bought } = req.body;

  if (!isValidItemId(id) || !isPlausibleUsername(username) || typeof bought !== "boolean") {
    return res.status(400).json({ error: "Invalid fields" });
  }

  const item = db.prepare("SELECT name FROM items WHERE id = ? AND username = ?").get(id, username);
  if (!item) return res.status(404).json({ error: "Item not found" });

  db.prepare("UPDATE items SET bought = ? WHERE id = ? AND username = ?").run(
    bought ? 1 : 0,
    id,
    username,
  );

  notifyList(req, username, `${bought ? "✓" : "↩"} ${item.name}`);
  res.json({ success: true });
};

export const clearBought = (req, res) => {
  const { username } = req.query;
  if (!isPlausibleUsername(username)) {
    return res.status(400).json({ error: "username is required" });
  }

  const { changes } = db
    .prepare("DELETE FROM items WHERE username = ? AND bought = 1")
    .run(username);

  if (changes > 0) {
    notifyList(req, username, `cleared bought (${changes})`);
  }
  res.json({ success: true, removed: changes });
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  const { username } = req.query;

  if (!isValidItemId(id) || !isPlausibleUsername(username)) {
    return res.status(400).json({ error: "Invalid fields" });
  }

  const item = db.prepare("SELECT name FROM items WHERE id = ? AND username = ?").get(id, username);
  db.prepare("DELETE FROM items WHERE id = ? AND username = ?").run(id, username);

  if (item) notifyList(req, username, `− ${item.name}`);
  res.json({ success: true });
};
