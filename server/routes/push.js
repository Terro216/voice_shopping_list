import express from "express";
import db from "../db/index.js";
import { config } from "../config.js";
import { pushEnabled } from "../push.js";
import { verifyToken } from "../middleware/auth.js";
import { readLimiter, writeLimiter } from "../middleware/rateLimits.js";
import { hasListAccess } from "../lists.js";
import { isPlausibleUsername } from "../validation.js";

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

// A device subscribes to exactly one list (endpoint is the primary key), so
// subscribing from another list simply re-points the device.
router.post("/subscribe", verifyToken, writeLimiter, (req, res) => {
  if (!pushEnabled) return res.status(503).json({ error: "Push is not configured" });

  const { subscription, list } = req.body;
  if (!isValidSubscription(subscription) || !isPlausibleUsername(list)) {
    return res.status(400).json({ error: "Invalid subscription" });
  }
  if (!hasListAccess(req.user.username, list)) {
    return res.status(403).json({ error: "No access to this list" });
  }

  db.prepare(
    `INSERT INTO push_subscriptions (endpoint, subscriber, list_username, p256dh, auth)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(endpoint) DO UPDATE SET
       subscriber = excluded.subscriber,
       list_username = excluded.list_username,
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
  const { endpoint } = req.body;
  if (typeof endpoint !== "string") return res.status(400).json({ error: "Invalid endpoint" });

  db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ? AND subscriber = ?").run(
    endpoint,
    req.user.username,
  );
  res.json({ success: true });
});

// Which list is this device subscribed to (if any)?
router.get("/status", verifyToken, readLimiter, (req, res) => {
  const { endpoint } = req.query;
  if (typeof endpoint !== "string") return res.status(400).json({ error: "Invalid endpoint" });

  const row = db
    .prepare("SELECT list_username FROM push_subscriptions WHERE endpoint = ? AND subscriber = ?")
    .get(endpoint, req.user.username);
  res.json({ list: row?.list_username ?? null });
});

export default router;
