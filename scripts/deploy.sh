#!/usr/bin/env bash
# Deploys the current working tree: snapshot the database, rebuild the image,
# restart, and refuse to report success until the app actually answers.
#
# Run from the project directory:  ./scripts/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

say() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }

if [ ! -f .env ]; then
  echo "No .env — copy .env.example and fill in DOMAIN and JWT_SECRET." >&2
  exit 1
fi

say "Backing up the database"
if docker compose ps --status running --quiet web | grep -q .; then
  # Taken from inside the container, which owns the data volume. Deliberately
  # inline rather than calling scripts/backup.mjs: the container still running
  # at this point is the *previous* build, which may predate that script.
  # better-sqlite3 is the only thing this relies on, and every build has it.
  # The filename matches what the scheduled backup writes, so the nightly
  # rotation cleans these up too.
  docker compose exec -T web node --input-type=commonjs -e '
    const Database = require("better-sqlite3");
    const fs = require("fs");
    fs.mkdirSync("/app/data/backups", { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const target = "/app/data/backups/database-" + stamp + ".sqlite";
    const db = new Database("/app/data/database.sqlite", { readonly: true });
    db.backup(target)
      .then(() => { db.close(); console.log("Snapshot: " + target); })
      .catch((err) => { console.error("Backup failed: " + err.message); process.exit(1); });
  '
else
  echo "Container is not running — nothing to back up yet, continuing."
fi

say "Building and restarting"
docker compose up -d --build

say "Waiting for the app to answer"
for attempt in $(seq 1 30); do
  if docker compose exec -T web node -e "
      fetch('http://127.0.0.1:3000/api/push/public-key')
        .then((r) => process.exit(r.ok ? 0 : 1))
        .catch(() => process.exit(1))
    " 2>/dev/null; then
    say "Deployed"
    docker compose logs --tail 5 web
    exit 0
  fi
  sleep 2
  printf '.'
done

echo >&2
echo "The app did not answer within 60s. Recent logs:" >&2
docker compose logs --tail 40 web >&2
exit 1
