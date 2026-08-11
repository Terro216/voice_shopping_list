// Consistent snapshot of the SQLite database, safe to run against a live server
// (better-sqlite3's backup copies pages under a read lock rather than reading
// the file while WAL frames are in flight). Run: npm run backup
//
// Suggested cron on the host:
//   0 4 * * *  cd /path/to/voice_shopping_list && npm run backup >> data/backup.log 2>&1
import Database from "better-sqlite3";
import { mkdirSync, readdirSync, rmSync, statSync } from "fs";
import path from "path";

const KEEP = Number(process.env.BACKUP_KEEP) || 14;

const dataDir = process.env.DATA_DIR || "data";
const backupDir = process.env.BACKUP_DIR || path.join(dataDir, "backups");
const source = path.join(dataDir, "database.sqlite");

mkdirSync(backupDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const target = path.join(backupDir, `database-${stamp}.sqlite`);

const db = new Database(source, { readonly: true });
await db.backup(target);
db.close();

console.log(`Backed up ${source} → ${target} (${statSync(target).size} bytes)`);

// Rotate: keep the newest KEEP snapshots, drop the rest.
const stale = readdirSync(backupDir)
  .filter((name) => name.startsWith("database-") && name.endsWith(".sqlite"))
  .sort()
  .slice(0, -KEEP);

for (const name of stale) {
  rmSync(path.join(backupDir, name), { force: true });
  console.log(`Removed old backup ${name}`);
}
