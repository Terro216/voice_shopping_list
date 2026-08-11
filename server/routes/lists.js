import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { readLimiter, writeLimiter } from "../middleware/rateLimits.js";
import { isPlausibleUsername, isValidShareToken } from "../validation.js";
import {
  accessibleLists,
  getOrCreateShareToken,
  grantAccess,
  hasListAccess,
  listMembers,
  resolveShareToken,
  revokeAccess,
  rotateShareToken,
} from "../lists.js";

const router = express.Router();

router.use(verifyToken);

/** Every list this account can open — its own plus the ones it was invited to. */
router.get("/", readLimiter, (req, res) => {
  const me = req.user.username;
  res.json(
    accessibleLists(me).map((name) => ({
      name,
      owned: name === me,
      members: name === me ? listMembers(name) : [],
    })),
  );
});

// Only the owner hands out invites, and the token — not the list name — is what
// grants access, so a guessed username gets nobody anywhere.
router.get("/share", readLimiter, (req, res) => {
  res.json({ token: getOrCreateShareToken(req.user.username) });
});

/** Invalidates the previous invite link; already-joined members keep access. */
router.post("/share/rotate", writeLimiter, (req, res) => {
  res.json({ token: rotateShareToken(req.user.username) });
});

router.post("/join", writeLimiter, (req, res) => {
  const { token } = req.body;
  if (!isValidShareToken(token)) {
    return res.status(400).json({ error: "Invalid invite link" });
  }

  const list = resolveShareToken(token);
  if (!list) return res.status(404).json({ error: "This invite link is no longer valid" });

  grantAccess(list, req.user.username);
  res.json({ list });
});

router.post("/leave", writeLimiter, (req, res) => {
  const { list } = req.body;
  if (!isPlausibleUsername(list)) return res.status(400).json({ error: "Invalid list" });
  if (list === req.user.username) {
    return res.status(400).json({ error: "You cannot leave your own list" });
  }

  revokeAccess(list, req.user.username);
  res.json({ success: true });
});

/** Owner drops a member; the member's push subscription to the list goes too. */
router.delete("/members", writeLimiter, (req, res) => {
  const { list, member } = req.body;
  if (!isPlausibleUsername(list) || !isPlausibleUsername(member)) {
    return res.status(400).json({ error: "Invalid fields" });
  }
  if (list !== req.user.username) {
    return res.status(403).json({ error: "Only the list owner can remove members" });
  }

  revokeAccess(list, member);
  res.json({ success: true });
});

router.get("/members", readLimiter, (req, res) => {
  const { list } = req.query;
  if (!isPlausibleUsername(list)) return res.status(400).json({ error: "Invalid list" });
  if (!hasListAccess(req.user.username, list)) {
    return res.status(403).json({ error: "No access to this list" });
  }

  res.json({ owner: list, members: listMembers(list) });
});

export default router;
