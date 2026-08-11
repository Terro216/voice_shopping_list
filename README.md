# Voice Shopping List

Shared shopping lists with voice input. React 19 + Vite PWA on the frontend,
Express 5 + SQLite (better-sqlite3) + Socket.IO on the backend.

## Features

- **Voice input** (Web Speech API, Russian/English): "добавь молоко и 2 хлеба" →
  items with quantities. Saying an existing item again bumps its count, and
  items dictated in one breath are applied in order so a repeated name lands as
  ×2 instead of two rows.
- **Voice commands**: "вычеркни молоко" checks off, "удали хлеб" removes,
  "очисти купленное" clears the cart, "отмена" undoes the last action. Fuzzy
  matching handles inflected forms ("молока" → «молоко»). When nothing could be
  parsed the app says what it heard and offers to add it verbatim.
- **Undo everywhere**: an ↩️ button in the header, plus an "Undo" action on the
  toast that follows every delete or "clear bought".
- **Bought state**: tap an item to check it off — it sinks to the bottom with a
  strikethrough, most recently checked first; "Clear bought" wipes the cart
  after checkout. The screen stays awake (Wake Lock) while the mic is listening.
- **Editing**: the ⋯ button on a row opens an inline rename field, with delete
  tucked behind it so a mis-tap next to "−" cannot wipe an item.
- **Suggestions**: unobtrusive autocomplete from purchase history while typing,
  plus a "Frequent" chip row for one-tap re-adds. History folds ё into е and is
  capped per list.
- **Shared lists**: "🔗" hands out an invite link carrying an unguessable token.
  Opening it once grants access; changes then sync live over WebSockets and a 👀
  row shows who is viewing the list. The owner can list members, remove any of
  them, or replace the link.
- **Web Push**: the 🔔 bell subscribes a device to a list — others' changes
  arrive as a batched notification (silent when the app is focused). Requires
  VAPID keys in `.env`; the bell hides itself when unconfigured.
- **Offline-first PWA**: the list is cached locally so it opens with no signal,
  and mutations made offline are queued and replayed (in order, with a fresh
  token) when the connection returns. A bar shows the offline state and how many
  changes are still waiting.
- **Russian or English UI**, following the recognition language, plus a
  light/dark/system theme switch.
- **Auth**: username/password (bcrypt), JWT valid for 30 days and silently
  renewed on use, so an app that gets opened never expires under the user.
  Password changes and account deletion live in ⚙️ Settings.

## Project layout

```
server/
  index.js            Express app, Socket.IO (JWT-authenticated), CSP, static serving
  config.js           env parsing; refuses to start in prod without JWT_SECRET
  lists.js            membership, invite tokens, access checks
  validation.js       shared input validation rules
  routes/ controllers/ middleware/
  db/                 better-sqlite3 init (WAL) + transactional .sql migrations
src/
  api/                fetch client, auth/items/lists endpoints, offline queue, list cache
  hooks/              useShoppingList (data + realtime), useSpeechRecognition, useTheme
  components/         Login, ShoppingList, VoiceControls, ItemRow, sheets
  i18n.ts             ru/en dictionary
  utils/speechParser  spoken text → [{ name, count }]
```

## Access model

A list is identified by its owner's username, but knowing that name grants
nothing. Reading or writing a list requires being its owner or a member, and
membership comes from redeeming an invite token (`?join=TOKEN`). The owner can
revoke a member or rotate the token, which invalidates every copy of the old
link. The same check gates Socket.IO rooms and push subscriptions.

## Development

```bash
cp .env.example .env      # fill in JWT_SECRET (openssl rand -hex 32)
npm install
npm start                 # API on :3000 (creates data/database.sqlite)
npm run dev               # Vite on :5173, proxies /api and /socket.io to :3000
```

Tests and checks:

```bash
npm test                  # vitest (speech parser, item matching, offline queue)
npm run lint
npm run smoke             # boots the real server, exercises the API and sockets
npm run build             # tsc + vite build (output in dist/, served by server)
```

## Backups

```bash
npm run backup            # consistent snapshot into data/backups/, keeps the last 14
```

Safe to run against a live server. `BACKUP_DIR` and `BACKUP_KEEP` override the
destination and how many snapshots are retained; a nightly cron entry is
suggested in `scripts/backup.mjs`.

## Deployment (Docker + Caddy)

```bash
cp .env.example .env      # set DOMAIN and JWT_SECRET
mkdir -p data             # persistent SQLite volume
docker-compose up -d --build
```

The container serves the built SPA and API on port 3000; the compose file
attaches it to the external `caddy_net` network with labels for
`shopping.$DOMAIN`. Pending migrations are applied at startup — take a backup
before deploying a version that adds one.
