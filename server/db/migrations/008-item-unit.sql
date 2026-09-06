-- Existing rows keep their integer count and no explicit unit. SQLite's
-- non-STRICT INTEGER affinity also stores fractional numeric values as REAL;
-- no table rebuild is needed to keep old ids, notes, trash and indexes intact.
ALTER TABLE items ADD COLUMN unit TEXT DEFAULT NULL
  CHECK (unit IS NULL OR unit IN ('pcs', 'g', 'kg', 'ml', 'l', 'pack'));
