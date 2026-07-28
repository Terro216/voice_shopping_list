import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = process.env.DATA_DIR || path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "database.sqlite"));
db.pragma("journal_mode = WAL");
db.pragma("synchronous = NORMAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const migrationsDir = path.join(__dirname, "migrations");
const migrationFiles = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const isApplied = db.prepare("SELECT id FROM migrations WHERE name = ?");
const markApplied = db.prepare("INSERT INTO migrations (name) VALUES (?)");

for (const file of migrationFiles) {
  if (isApplied.get(file)) continue;
  console.log(`Applying migration: ${file}`);
  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
  db.transaction(() => {
    db.exec(sql);
    markApplied.run(file);
  })();
}

export const closeDb = () => {
  db.close();
};

export default db;
