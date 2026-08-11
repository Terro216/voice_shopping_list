-- When an item was checked off, so the store screen can show the most recently
-- bought things first instead of an arbitrary order.
ALTER TABLE items ADD COLUMN bought_at INTEGER;

-- Explicit membership replaces "any authenticated user who guesses the list
-- name". The owner's access is implicit (list_username = their own username);
-- this table holds everyone they invited.
CREATE TABLE IF NOT EXISTS list_access (
  list_username TEXT NOT NULL,
  member TEXT NOT NULL,
  granted_at INTEGER NOT NULL,
  PRIMARY KEY (list_username, member)
);
CREATE INDEX IF NOT EXISTS idx_list_access_member ON list_access(member);

-- One unguessable invite token per list. Revoking simply replaces the token.
CREATE TABLE IF NOT EXISTS list_shares (
  list_username TEXT PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL
);

-- Anyone who had push notifications for someone else's list was demonstrably a
-- collaborator before membership existed — keep their access.
INSERT OR IGNORE INTO list_access (list_username, member, granted_at)
SELECT list_username, subscriber, CAST(strftime('%s', 'now') AS INTEGER) * 1000
FROM push_subscriptions
WHERE subscriber <> list_username;

-- History keys are normalized (ё → е) from here on; fold the existing rows so
-- «ёлка» and «елка» stop competing as two separate suggestions.
UPDATE history SET uses = uses + COALESCE(
  (SELECT SUM(dup.uses) FROM history dup
   WHERE dup.username = history.username
     AND dup.name_lower <> history.name_lower
     AND replace(dup.name_lower, 'ё', 'е') = history.name_lower),
  0
) WHERE name_lower NOT LIKE '%ё%';

DELETE FROM history WHERE name_lower LIKE '%ё%' AND EXISTS (
  SELECT 1 FROM history other
  WHERE other.username = history.username
    AND other.name_lower = replace(history.name_lower, 'ё', 'е')
);

UPDATE history SET name_lower = replace(name_lower, 'ё', 'е') WHERE name_lower LIKE '%ё%';
