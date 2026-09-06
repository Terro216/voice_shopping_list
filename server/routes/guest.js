import express from "express";
import { getList, resolveShareToken } from "../lists.js";
import { readListItems } from "../controllers/itemsController.js";
import { guestReadLimiter } from "../middleware/rateLimits.js";
import { isValidShareToken } from "../validation.js";

const router = express.Router();

router.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  res.set("X-Robots-Tag", "noindex, nofollow");
  next();
});

// A share token authorizes this read only. It never becomes a session or a
// membership, and every poll resolves it again so rotating the link revokes it.
router.get("/list", guestReadLimiter, (req, res) => {
  const { token } = req.query;
  const listId = isValidShareToken(token) ? resolveShareToken(token) : null;
  const list = listId ? getList(listId) : null;
  if (!list) return res.status(404).json({ error: "This invite link is no longer valid" });

  res.json({
    name: list.name,
    items: readListItems(listId).map(({ id, name, note, count, unit, bought }) => ({
      id, name, note, count, unit, bought,
    })),
  });
});

export default router;
