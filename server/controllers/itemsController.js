import db from "../db/index.js";
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

const notifyList = (req, username) => {
  req.app.get("io").to(`list_${username}`).emit("list_updated");
};

export const getItems = (req, res) => {
  const { username } = req.query;
  if (!isPlausibleUsername(username)) {
    return res.status(400).json({ error: "username is required" });
  }

  const items = db
    .prepare("SELECT id, name, count, username FROM items WHERE username = ? ORDER BY rowid")
    .all(username);
  res.json(items);
};

export const addItem = (req, res) => {
  const { id, count, username } = req.body;
  const name = normalizeItemName(req.body.name);

  if (!isValidItemId(id) || !name || !isPlausibleUsername(username)) {
    return res.status(400).json({ error: "Invalid item fields" });
  }
  if (count !== undefined && !isValidCount(count)) {
    return res.status(400).json({ error: "Invalid count" });
  }

  try {
    db.prepare("INSERT INTO items (id, name, count, username) VALUES (?, ?, ?, ?)").run(
      id,
      name,
      count ?? 1,
      username,
    );
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
      // Offline queue replay can resend the same client-generated id — treat as done.
      return res.json({ success: true });
    }
    throw err;
  }

  notifyList(req, username);
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
    const item = db.prepare("SELECT count FROM items WHERE id = ? AND username = ?").get(id, username);
    if (!item) return false;

    const next = Math.min(MAX_COUNT, item.count + delta);
    if (next <= 0) {
      db.prepare("DELETE FROM items WHERE id = ? AND username = ?").run(id, username);
    } else {
      db.prepare("UPDATE items SET count = ? WHERE id = ? AND username = ?").run(next, id, username);
    }
    return true;
  });

  if (!apply()) {
    return res.status(404).json({ error: "Item not found" });
  }

  notifyList(req, username);
  res.json({ success: true });
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  const { username } = req.query;

  if (!isValidItemId(id) || !isPlausibleUsername(username)) {
    return res.status(400).json({ error: "Invalid fields" });
  }

  db.prepare("DELETE FROM items WHERE id = ? AND username = ?").run(id, username);

  notifyList(req, username);
  res.json({ success: true });
};
