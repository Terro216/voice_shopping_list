ALTER TABLE items ADD COLUMN bought INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  name_lower TEXT NOT NULL,
  uses INTEGER NOT NULL DEFAULT 1,
  last_used INTEGER NOT NULL,
  UNIQUE (username, name_lower)
);
CREATE INDEX IF NOT EXISTS idx_history_username ON history(username);

CREATE TABLE IF NOT EXISTS push_subscriptions (
  endpoint TEXT PRIMARY KEY,
  subscriber TEXT NOT NULL,
  list_username TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_push_list ON push_subscriptions(list_username);
