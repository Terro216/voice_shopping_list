ALTER TABLE users ADD COLUMN session_version INTEGER NOT NULL DEFAULT 1;

-- A receipt and its mutation commit together. Keep receipts for the lifetime of
-- the account: an old offline client must never repeat an acknowledged delta.
CREATE TABLE mutation_receipts (
  user_id TEXT NOT NULL,
  mutation_id TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  status INTEGER NOT NULL,
  response TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, mutation_id)
);

ALTER TABLE push_subscriptions RENAME TO push_subscriptions_old;
CREATE TABLE push_subscriptions (
  endpoint TEXT NOT NULL,
  subscriber TEXT NOT NULL,
  list_id TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (endpoint, list_id)
);
INSERT INTO push_subscriptions (endpoint, subscriber, list_id, p256dh, auth, created_at)
SELECT endpoint, subscriber, list_id, p256dh, auth, created_at FROM push_subscriptions_old;
DROP TABLE push_subscriptions_old;
CREATE INDEX idx_push_subscriptions_list ON push_subscriptions(list_id);
