import webpush from "web-push";
import db from "./db/index.js";
import { config } from "./config.js";

export const pushEnabled = Boolean(config.vapidPublicKey && config.vapidPrivateKey);

if (pushEnabled) {
  webpush.setVapidDetails(config.vapidSubject, config.vapidPublicKey, config.vapidPrivateKey);
}

// Rapid edits (a dictated "milk and bread and eggs") are collapsed into one
// notification per list+actor instead of spamming a push per item.
const FLUSH_DELAY_MS = 4000;
const MAX_BATCH = 10;
const pending = new Map(); // "list\nactor" -> { labels, timer }

const flush = async (list, actor, labels) => {
  const subs = db
    .prepare("SELECT * FROM push_subscriptions WHERE list_username = ? AND subscriber != ?")
    .all(list, actor);
  if (subs.length === 0) return;

  const summary =
    labels.slice(0, 4).join(", ") + (labels.length > 4 ? `, +${labels.length - 4} more` : "");
  const payload = JSON.stringify({
    title: `🛒 ${list}`,
    body: `${actor}: ${summary}`,
    tag: `list-${list}`,
    url: `/?list=${encodeURIComponent(list)}`,
  });

  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
        );
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          // Subscription is gone (app uninstalled, permission revoked)
          db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(sub.endpoint);
        } else {
          console.error("Push send failed:", err.statusCode || err.message);
        }
      }
    }),
  );
};

export const scheduleListPush = (list, actor, label) => {
  if (!pushEnabled) return;

  const key = `${list}\n${actor}`;
  let entry = pending.get(key);
  if (!entry) {
    entry = { labels: [], timer: null };
    pending.set(key, entry);
  }
  entry.labels.push(label);

  if (entry.timer) clearTimeout(entry.timer);
  if (entry.labels.length >= MAX_BATCH) {
    pending.delete(key);
    void flush(list, actor, entry.labels);
    return;
  }
  entry.timer = setTimeout(() => {
    pending.delete(key);
    void flush(list, actor, entry.labels);
  }, FLUSH_DELAY_MS);
  entry.timer.unref?.();
};
