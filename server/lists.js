import crypto from "crypto";
import db from "./db/index.js";

/**
 * Access model: a list is still identified by its owner's username, but reading
 * or editing it now requires being the owner or an explicitly granted member.
 * Membership is granted by opening an invite link carrying an unguessable
 * token, so knowing someone's username is no longer enough to touch their list.
 */

const selectAccess = db.prepare(
  "SELECT 1 FROM list_access WHERE list_username = ? AND member = ?",
);

export const hasListAccess = (viewer, list) =>
  viewer === list || Boolean(selectAccess.get(list, viewer));

/** Lists the viewer can open: their own first, then the ones they joined. */
export const accessibleLists = (viewer) => {
  const joined = db
    .prepare("SELECT list_username FROM list_access WHERE member = ? ORDER BY granted_at")
    .all(viewer)
    .map((row) => row.list_username);
  return [viewer, ...joined.filter((list) => list !== viewer)];
};

export const listMembers = (list) =>
  db
    .prepare("SELECT member FROM list_access WHERE list_username = ? ORDER BY granted_at")
    .all(list)
    .map((row) => row.member);

const newToken = () => crypto.randomBytes(18).toString("base64url");

/** Current invite token for a list, minted on first use. */
export const getOrCreateShareToken = (list) => {
  const existing = db.prepare("SELECT token FROM list_shares WHERE list_username = ?").get(list);
  if (existing) return existing.token;

  const token = newToken();
  db.prepare("INSERT INTO list_shares (list_username, token, created_at) VALUES (?, ?, ?)").run(
    list,
    token,
    Date.now(),
  );
  return token;
};

/** Invalidates the old link. Existing members keep access unless also dropped. */
export const rotateShareToken = (list) => {
  const token = newToken();
  db.prepare(
    `INSERT INTO list_shares (list_username, token, created_at) VALUES (?, ?, ?)
     ON CONFLICT(list_username) DO UPDATE SET token = excluded.token, created_at = excluded.created_at`,
  ).run(list, token, Date.now());
  return token;
};

export const resolveShareToken = (token) =>
  db.prepare("SELECT list_username FROM list_shares WHERE token = ?").get(token)?.list_username ??
  null;

export const grantAccess = (list, member) => {
  if (list === member) return;
  db.prepare(
    "INSERT OR IGNORE INTO list_access (list_username, member, granted_at) VALUES (?, ?, ?)",
  ).run(list, member, Date.now());
};

export const revokeAccess = (list, member) => {
  db.prepare("DELETE FROM list_access WHERE list_username = ? AND member = ?").run(list, member);
  // A device can only be subscribed to a list it can still open.
  db.prepare("DELETE FROM push_subscriptions WHERE list_username = ? AND subscriber = ?").run(
    list,
    member,
  );
};
