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
  # The data volume belongs to the container, so the snapshot is taken from
  # inside it. A pending migration is exactly when this matters most.
  docker compose exec -T web node scripts/backup.mjs
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
