-- Lists become first-class objects with names of their own, so one account can
-- keep "Продукты", "Дача" and "Хозтовары" side by side.
--
-- The trick that keeps this migration cheap: an account's original list keeps
-- `id = the owner's username`. Every row that references a list — items,
-- history, list_access, list_shares, push_subscriptions — stores that same
-- string, so nothing has to be rewritten and every invite link handed out
-- before this migration keeps working. Newly created lists get a random id.
CREATE TABLE IF NOT EXISTS lists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  position INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_lists_owner ON lists(owner);

INSERT OR IGNORE INTO lists (id, name, owner, created_at, position)
SELECT username, username, username, CAST(strftime('%s', 'now') AS INTEGER) * 1000, 0
FROM users;

-- Manual order inside a list: people walk a shop aisle by aisle, and the order
-- things were dictated in is rarely the order they are picked up in.
ALTER TABLE items ADD COLUMN position INTEGER;
UPDATE items SET position = rowid WHERE position IS NULL;

-- Deleting an item now only hides it: it moves to the list's "deleted" drawer
-- and can be put back. This is also what lets undo survive a page reload — the
-- item the undo entry points at still exists.
ALTER TABLE items ADD COLUMN deleted_at INTEGER;
CREATE INDEX IF NOT EXISTS idx_items_list_deleted ON items(username, deleted_at);
