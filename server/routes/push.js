import express from "express";
import db from "../db/index.js";
import { config } from "../config.js";
import { pushEnabled } from "../push.js";
import { verifyToken } from "../middleware/auth.js";
import { readLimiter, writeLimiter } from "../middleware/rateLimits.js";
import { hasListAccess } from "../lists.js";
import { isValidListId } from "../validation.js";

const router = express.Router();

// Public by nature — the browser needs it before any subscription exists.
router.get("/public-key", readLimiter, (req, res) => {
  res.json({ key: pushEnabled ? config.vapidPublicKey : null });
});

const isValidSubscription = (sub) =>
  sub &&
  typeof sub.endpoint === "string" &&
  sub.endpoint.startsWith("https://") &&
  sub.endpoint.length <= 1000 &&
  typeof sub.keys?.p256dh === "string" &&
  typeof sub.keys?.auth === "string";

// A device may subscribe to multiple lists. One device has one signed-in owner.
router.post("/subscribe", verifyToken, writeLimiter, (req, res) => {
  if (!pushEnabled) return res.status(503).json({ error: "Push is not configured" });

  const { subscription, list } = req.body;
  if (!isValidSubscription(subscription) || !isValidListId(list)) {
    return res.status(400).json({ error: "Invalid subscription" });
  }
  if (!hasListAccess(req.user.username, list)) {
    return res.status(403).json({ error: "No access to this list" });
  }

  db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ? AND subscriber != ?").run(subscription.endpoint, req.user.username);
  db.prepare(
    `INSERT INTO push_subscriptions (endpoint, subscriber, list_id, p256dh, auth)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(endpoint, list_id) DO UPDATE SET
       subscriber = excluded.subscriber,
       list_id = excluded.list_id,
       p256dh = excluded.p256dh,
       auth = excluded.auth`,
  ).run(
    subscription.endpoint,
    req.user.username,
    list,
    subscription.keys.p256dh,
    subscription.keys.auth,
  );

  res.status(201).json({ success: true });
});

router.delete("/subscribe", verifyToken, writeLimiter, (req, res) => {
  const { endpoint, list } = req.body;
  if (list !== undefined && !isValidListId(list)) return res.status(400).json({ error: "Invalid list" });
  if (typeof endpoint !== "string") return res.status(400).json({ error: "Invalid endpoint" });

  if (list === undefined) db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ? AND subscriber = ?").run(endpoint, req.user.username);
  else db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ? AND subscriber = ? AND list_id = ?").run(endpoint, req.user.username, list);
  res.json({ success: true });
});

// Which list is this device subscribed to (if any)?
router.get("/status", verifyToken, readLimiter, (req, res) => {
  const { endpoint } = req.query;
  if (typeof endpoint !== "string") return res.status(400).json({ error: "Invalid endpoint" });

  const rows = db
    .prepare("SELECT list_id FROM push_subscriptions WHERE endpoint = ? AND subscriber = ?")
    .all(endpoint, req.user.username);
  res.json({ list: rows[0]?.list_id ?? null, lists: rows.map(row => row.list_id) });
});

export default router;
