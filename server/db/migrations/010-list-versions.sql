ALTER TABLE lists ADD COLUMN version INTEGER NOT NULL DEFAULT 0;

-- SQLite triggers cover every writer, including old clients and trash expiry.
-- The revision commits or rolls back with the rows it describes.
CREATE TRIGGER items_version_insert AFTER INSERT ON items BEGIN
  UPDATE lists SET version = version + 1 WHERE id = NEW.list_id;
END;
CREATE TRIGGER items_version_update AFTER UPDATE ON items BEGIN
  UPDATE lists SET version = version + 1 WHERE id = OLD.list_id;
  UPDATE lists SET version = version + 1 WHERE id = NEW.list_id AND NEW.list_id != OLD.list_id;
END;
CREATE TRIGGER items_version_delete AFTER DELETE ON items BEGIN
  UPDATE lists SET version = version + 1 WHERE id = OLD.list_id;
END;
