import crypto from "crypto";
import express from "express";
import bcrypt from "bcryptjs";
import db from "../db/index.js";
import { config } from "../config.js";
import { signToken, verifyToken } from "../middleware/auth.js";
import { isValidNewUsername, isPlausibleUsername, isValidPassword } from "../validation.js";
import { ensureUserList } from "../lists.js";

import { revokeSessions, revokeRoom, notifyCatalog } from "../realtime.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!isValidNewUsername(username)) {
    return res
      .status(400)
      .json({ error: "Username must be 3-32 characters: letters, digits, _ or -" });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const hash = await bcrypt.hash(password, config.bcryptRounds);
  try {
    db.prepare("INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)").run(
      crypto.randomUUID(),
      username,
      hash,
    );
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({ error: "Username already exists" });
    }
    throw err;
  }

  ensureUserList(username);
  res.status(201).json({ token: signToken(username), username });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!isPlausibleUsername(username) || typeof password !== "string" || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  const passwordOk = user && (await bcrypt.compare(password, user.password_hash));
  if (!passwordOk) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // bcrypt yields. Do not authenticate a stale password or a replacement
  // account created while the comparison was running.
  const current = db.prepare('SELECT id, session_version, password_hash FROM users WHERE id = ?').get(user.id);
  if (!current || current.session_version !== user.session_version || current.password_hash !== user.password_hash) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Accounts made before lists became first-class have no row for their own list.
  ensureUserList(user.username);
  res.json({ token: signToken(user.username), username: user.username });
});

// Password changes revoke every previous token, including connected sockets.
router.post("/password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (typeof currentPassword !== "string" || !currentPassword) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (!isValidPassword(newPassword)) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(req.user.username);
  if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
    return res.status(400).json({ error: "Current password is wrong", code: "WRONG_PASSWORD" });
  }

  const hash = await bcrypt.hash(newPassword, config.bcryptRounds);
  const changed = db.prepare("UPDATE users SET password_hash = ?, session_version = session_version + 1 WHERE id = ? AND session_version = ?")
    .run(hash, req.user.sub, req.user.version);
  if (!changed.changes) return res.status(401).json({ error: "Session revoked" });
  revokeSessions(req, req.user.sub);

  res.json({ token: signToken(user.username), username: user.username });
});

// Removes the account and everything attached to it: the list, its history, its
// invites, memberships in both directions, and any push subscriptions.
router.delete("/account", verifyToken, async (req, res) => {
  const { password } = req.body;
  if (typeof password !== "string" || !password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const username = req.user.username;
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(400).json({ error: "Password is wrong", code: "WRONG_PASSWORD" });
  }

  // bcrypt yields: another request can revoke this session while it runs.
  const current = db.prepare('SELECT session_version FROM users WHERE id = ?').get(req.user.sub);
  if (!current || current.session_version !== req.user.version) return res.status(401).json({ error: 'Session revoked' });
  const affected = db.prepare('SELECT id FROM lists WHERE owner = ?').all(username);
  const memberships = db.prepare('SELECT list_id FROM list_access WHERE member = ?').all(username);
  for (const { list_id } of memberships) notifyCatalog(req, list_id);
  for (const { id } of affected) { notifyCatalog(req, id); revokeRoom(req, id); }
  revokeSessions(req, req.user.sub);
  db.transaction(() => {
    db.prepare('DELETE FROM mutation_receipts WHERE user_id = ?').run(req.user.sub);
    // Every list this account owns goes, not just the one named after them.
    const owned = db.prepare("SELECT id FROM lists WHERE owner = ?").all(username).map((r) => r.id);
    const ids = owned.includes(username) ? owned : [...owned, username];

    for (const list of ids) {
      db.prepare("DELETE FROM items WHERE list_id = ?").run(list);
      db.prepare("DELETE FROM history WHERE list_id = ?").run(list);
      db.prepare("DELETE FROM list_shares WHERE list_id = ?").run(list);
      db.prepare("DELETE FROM list_access WHERE list_id = ?").run(list);
      db.prepare("DELETE FROM push_subscriptions WHERE list_id = ?").run(list);
    }

    // Memberships and subscriptions this account holds in *other* people's lists.
    db.prepare("DELETE FROM list_access WHERE member = ?").run(username);
    db.prepare("DELETE FROM push_subscriptions WHERE subscriber = ?").run(username);
    db.prepare("DELETE FROM lists WHERE owner = ?").run(username);
    db.prepare("DELETE FROM users WHERE username = ?").run(username);
  })();

  res.json({ success: true });
});

export default router;
