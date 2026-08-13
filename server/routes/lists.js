import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { readLimiter, writeLimiter } from "../middleware/rateLimits.js";
import {
  isPlausibleUsername,
  isValidListId,
  isValidShareToken,
  normalizeListName,
  MAX_LISTS_PER_OWNER,
} from "../validation.js";
import {
  accessibleLists,
  createList,
  deleteList,
  ensureUserList,
  getList,
  getOrCreateShareToken,
  grantAccess,
  hasListAccess,
  isListOwner,
  listMembers,
  primaryListId,
  renameList,
  resolveShareToken,
  revokeAccess,
  rotateShareToken,
} from "../lists.js";

const router = express.Router();

router.use(verifyToken);

/**
 * Resolves the list a request is about. Share endpoints used to be implicitly
 * about "your list" because an account had exactly one; that spelling still
 * works so an older client (or a replayed offline mutation) keeps functioning.
 */
const resolveTarget = (req, raw) => {
  const list = raw === undefined || raw === null ? primaryListId(req.user.username) : raw;
  return isValidListId(list) ? list : null;
};

/** Every list this account can open — its own plus the ones it was invited to. */
router.get("/", readLimiter, (req, res) => {
  ensureUserList(req.user.username);
  res.json(
    accessibleLists(req.user.username).map((list) => ({
      ...list,
      members: list.owned ? listMembers(list.id) : [],
    })),
  );
});

router.post("/", writeLimiter, (req, res) => {
  const name = normalizeListName(req.body?.name);
  if (!name) return res.status(400).json({ error: "Invalid list name" });

  ensureUserList(req.user.username);
  const list = createList(req.user.username, name);
  if (!list) {
    return res.status(409).json({ error: `A single account may keep ${MAX_LISTS_PER_OWNER} lists` });
  }

  res.status(201).json({ ...list, members: [] });
});

// Only the owner hands out invites, and the token — not the list id — is what
// grants access, so a guessed name gets nobody anywhere.
router.get("/share", readLimiter, (req, res) => {
  const list = resolveTarget(req, req.query.list);
  if (!list) return res.status(400).json({ error: "Invalid list" });
  if (!isListOwner(req.user.username, list)) {
    return res.status(403).json({ error: "Only the list owner can share it" });
  }

  res.json({ token: getOrCreateShareToken(list) });
});

/** Invalidates the previous invite link; already-joined members keep access. */
router.post("/share/rotate", writeLimiter, (req, res) => {
  const list = resolveTarget(req, req.body?.list);
  if (!list) return res.status(400).json({ error: "Invalid list" });
  if (!isListOwner(req.user.username, list)) {
    return res.status(403).json({ error: "Only the list owner can share it" });
  }

  res.json({ token: rotateShareToken(list) });
});

router.post("/join", writeLimiter, (req, res) => {
  const { token } = req.body;
  if (!isValidShareToken(token)) {
    return res.status(400).json({ error: "Invalid invite link" });
  }

  const list = resolveShareToken(token);
  if (!list) return res.status(404).json({ error: "This invite link is no longer valid" });

  grantAccess(list, req.user.username);
  res.json({ list, name: getList(list)?.name ?? list });
});

router.post("/leave", writeLimiter, (req, res) => {
  const { list } = req.body;
  if (!isValidListId(list)) return res.status(400).json({ error: "Invalid list" });
  if (isListOwner(req.user.username, list)) {
    return res.status(400).json({ error: "You cannot leave your own list" });
  }

  revokeAccess(list, req.user.username);
  res.json({ success: true });
});

/** Owner drops a member; the member's push subscription to the list goes too. */
router.delete("/members", writeLimiter, (req, res) => {
  const { list, member } = req.body;
  if (!isValidListId(list) || !isPlausibleUsername(member)) {
    return res.status(400).json({ error: "Invalid fields" });
  }
  if (!isListOwner(req.user.username, list)) {
    return res.status(403).json({ error: "Only the list owner can remove members" });
  }

  revokeAccess(list, member);
  res.json({ success: true });
});

router.get("/members", readLimiter, (req, res) => {
  const { list } = req.query;
  if (!isValidListId(list)) return res.status(400).json({ error: "Invalid list" });
  if (!hasListAccess(req.user.username, list)) {
    return res.status(403).json({ error: "No access to this list" });
  }

  res.json({ owner: getList(list)?.owner ?? list, members: listMembers(list) });
});

// The /:id patterns come last: registered earlier they would swallow the fixed
// paths above ("DELETE /api/lists/members" is not a list called "members").

router.patch("/:id", writeLimiter, (req, res) => {
  const { id } = req.params;
  const name = normalizeListName(req.body?.name);
  if (!isValidListId(id) || !name) return res.status(400).json({ error: "Invalid fields" });
  if (!isListOwner(req.user.username, id)) {
    return res.status(403).json({ error: "Only the list owner can rename it" });
  }

  // A list that predates the `lists` table has no row to update yet.
  if (!getList(id)) ensureUserList(req.user.username);
  renameList(id, name);
  res.json({ id, name, owner: req.user.username, owned: true });
});

/**
 * The owner deletes the list outright; a member only drops their own access.
 * The account's original list stays: it is where a new dictation always lands.
 */
router.delete("/:id", writeLimiter, (req, res) => {
  const { id } = req.params;
  if (!isValidListId(id)) return res.status(400).json({ error: "Invalid list" });

  if (!isListOwner(req.user.username, id)) {
    if (!hasListAccess(req.user.username, id)) {
      return res.status(403).json({ error: "No access to this list" });
    }
    revokeAccess(id, req.user.username);
    return res.json({ success: true, left: true });
  }

  if (id === primaryListId(req.user.username)) {
    return res.status(400).json({ error: "Your main list cannot be deleted" });
  }

  deleteList(id);
  res.json({ success: true, deleted: true });
});

export default router;
