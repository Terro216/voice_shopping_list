import crypto from "crypto";
import db from "./db/index.js";
import { MAX_LIST_NAME_LENGTH, MAX_LISTS_PER_OWNER } from "./validation.js";

/**
 * Access model: a list is an opaque id with a display name and an owner.
 * Reading or editing it requires being that owner or an explicitly granted
 * member, and membership is granted by opening an invite link carrying an
 * unguessable token.
 *
 * Historical note: lists used to *be* their owner's username, and the columns
 * that reference one were named accordingly until migration 007 renamed them
 * all to `list_id`. An account's original list still has `id = username`, which
 * is why invite links, cached snapshots and queued offline mutations from
 * before lists had names all kept working.
 */

const selectList = db.prepare("SELECT id, name, owner, created_at FROM lists WHERE id = ?");

export const getList = (id) => (typeof id === "string" ? (selectList.get(id) ?? null) : null);

const selectAccess = db.prepare(
  "SELECT 1 FROM list_access WHERE list_id = ? AND member = ?",
);

/**
 * The owner of a list. Falls back to the id itself for the rare row that
 * predates the `lists` table (an account whose list was never touched since),
 * matching the original "your list is named after you" rule.
 */
export const listOwner = (id) => getList(id)?.owner ?? id;

export const hasListAccess = (viewer, list) =>
  listOwner(list) === viewer || Boolean(selectAccess.get(list, viewer));

export const isListOwner = (viewer, list) => listOwner(list) === viewer;

/** The list an account gets for free; it is never deleted while the account lives. */
export const primaryListId = (username) => username;

/** Creates the account's own list if it does not exist yet (new or legacy account). */
export const ensureUserList = (username) => {
  db.prepare(
    "INSERT OR IGNORE INTO lists (id, name, owner, created_at, position) VALUES (?, ?, ?, ?, 0)",
  ).run(username, username, username, Date.now());
};

const summarize = (row, owned) => ({
  id: row.id,
  name: row.name,
  owner: row.owner,
  owned,
});

/** Lists the viewer can open: their own (in their chosen order) then joined ones. */
export const accessibleLists = (viewer) => {
  const owned = db
    .prepare("SELECT id, name, owner FROM lists WHERE owner = ? ORDER BY position, created_at")
    .all(viewer)
    .map((row) => summarize(row, true));

  const joined = db
    .prepare(
      `SELECT a.list_id AS id, l.name AS name, l.owner AS owner
         FROM list_access a LEFT JOIN lists l ON l.id = a.list_id
        WHERE a.member = ? ORDER BY a.granted_at`,
    )
    .all(viewer)
    .filter((row) => row.owner !== viewer)
    // A joined list whose `lists` row is missing predates this table: it is its
    // owner's personal list, named after them.
    .map((row) => summarize({ id: row.id, name: row.name ?? row.id, owner: row.owner ?? row.id }, false));

  return [...owned, ...joined];
};

export const ownedListCount = (owner) =>
  db.prepare("SELECT COUNT(*) AS total FROM lists WHERE owner = ?").get(owner).total;

const newListId = () => crypto.randomBytes(9).toString("base64url");

/** Returns the new list, or null when the owner is already at the cap. */
export const createList = (owner, name) => {
  if (ownedListCount(owner) >= MAX_LISTS_PER_OWNER) return null;

  const id = newListId();
  const { next } = db
    .prepare("SELECT COALESCE(MAX(position), 0) + 1 AS next FROM lists WHERE owner = ?")
    .get(owner);
  db.prepare(
    "INSERT INTO lists (id, name, owner, created_at, position) VALUES (?, ?, ?, ?, ?)",
  ).run(id, name, owner, Date.now(), next);

  return { id, name, owner, owned: true };
};

export const renameList = (id, name) => {
  db.prepare("UPDATE lists SET name = ? WHERE id = ?").run(name.slice(0, MAX_LIST_NAME_LENGTH), id);
};

/** Drops a list and everything hanging off it. Members simply lose the entry. */
export const deleteList = (id) =>
  db.transaction(() => {
    db.prepare("DELETE FROM items WHERE list_id = ?").run(id);
    db.prepare("DELETE FROM history WHERE list_id = ?").run(id);
    db.prepare("DELETE FROM list_access WHERE list_id = ?").run(id);
    db.prepare("DELETE FROM list_shares WHERE list_id = ?").run(id);
    db.prepare("DELETE FROM push_subscriptions WHERE list_id = ?").run(id);
    db.prepare("DELETE FROM lists WHERE id = ?").run(id);
  })();

export const listMembers = (list) =>
  db
    .prepare("SELECT member FROM list_access WHERE list_id = ? ORDER BY granted_at")
    .all(list)
    .map((row) => row.member);

const newToken = () => crypto.randomBytes(18).toString("base64url");

/** Current invite token for a list, minted on first use. */
export const getOrCreateShareToken = (list) => {
  const existing = db.prepare("SELECT token FROM list_shares WHERE list_id = ?").get(list);
  if (existing) return existing.token;

  const token = newToken();
  db.prepare("INSERT INTO list_shares (list_id, token, created_at) VALUES (?, ?, ?)").run(
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
    `INSERT INTO list_shares (list_id, token, created_at) VALUES (?, ?, ?)
     ON CONFLICT(list_id) DO UPDATE SET token = excluded.token, created_at = excluded.created_at`,
  ).run(list, token, Date.now());
  return token;
};

export const resolveShareToken = (token) =>
  db.prepare("SELECT list_id FROM list_shares WHERE token = ?").get(token)?.list_id ??
  null;

export const grantAccess = (list, member) => {
  if (listOwner(list) === member) return;
  db.prepare(
    "INSERT OR IGNORE INTO list_access (list_id, member, granted_at) VALUES (?, ?, ?)",
  ).run(list, member, Date.now());
};

export const revokeAccess = (list, member) => {
  db.prepare("DELETE FROM list_access WHERE list_id = ? AND member = ?").run(list, member);
  // A device can only be subscribed to a list it can still open.
  db.prepare("DELETE FROM push_subscriptions WHERE list_id = ? AND subscriber = ?").run(
    list,
    member,
  );
};
