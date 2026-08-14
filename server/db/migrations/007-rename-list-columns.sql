-- Calling the list key "username" stopped being true the moment an account
-- could keep several named lists: every one of these columns holds a list id,
-- and only the first list of an account still happens to equal its owner's
-- name. The values do not change here — only what they are called.
--
-- The API keeps accepting the old `username` spelling of the parameter (see
-- middleware/auth.js): mutations queued offline before this deploy carry it in
-- their URLs, and they have to keep replaying.
ALTER TABLE items RENAME COLUMN username TO list_id;
ALTER TABLE history RENAME COLUMN username TO list_id;
ALTER TABLE list_access RENAME COLUMN list_username TO list_id;
ALTER TABLE list_shares RENAME COLUMN list_username TO list_id;
ALTER TABLE push_subscriptions RENAME COLUMN list_username TO list_id;

-- SQLite rewrites index definitions along with the column, so these still work
-- as they are; they are recreated only so their names stop lying too.
DROP INDEX IF EXISTS idx_items_username;
DROP INDEX IF EXISTS idx_items_list_deleted;
DROP INDEX IF EXISTS idx_history_username;
DROP INDEX IF EXISTS idx_push_list;

CREATE INDEX IF NOT EXISTS idx_items_list ON items(list_id);
CREATE INDEX IF NOT EXISTS idx_items_list_deleted ON items(list_id, deleted_at);
CREATE INDEX IF NOT EXISTS idx_history_list ON history(list_id);
CREATE INDEX IF NOT EXISTS idx_push_list ON push_subscriptions(list_id);
