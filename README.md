# Voice Shopping List

Shared shopping lists with voice input. React 19 + Vite PWA on the frontend,
Express 5 + SQLite (better-sqlite3) + Socket.IO on the backend.

## Features

- **Voice input** (Web Speech API, Russian/English): "добавь молоко и 2 хлеба" →
  items with quantities. Saying an existing item again bumps its count, and
  items dictated in one breath are applied in order so a repeated name lands as
  ×2 instead of two rows. An utterance is assembled before it is acted on:
  engines re-deliver a *growing prefix* of the same phrase as several "final"
  results, and taking each at face value turned «три пакета с маршмеллоу» into
  four half-parsed rows (see `utils/transcript`).
- **Gestures**: swipe a row right to check it off, left to delete; hold the ⠿
  grip and drag to arrange the list in the order the shop is walked. A drag can
  only start from the grip and a swipe only wins once it clearly beats the
  vertical axis, so scrolling a long list never disturbs it. Arrow keys on a
  focused grip do the same reordering without a touchscreen.
- **Several named lists**: an account keeps as many as it likes ("Продукты",
  "Дача"), each with its own items, history, members and invite link. The first
  list keeps `id = username`, so links handed out before this existed still work.
- **Voice commands**: "вычеркни молоко" checks off, "удали хлеб" removes,
  "очисти купленное" clears the cart, "отмена" undoes the last action. Fuzzy
  matching handles inflected forms ("молока" → «молоко»). When nothing could be
  parsed the app says what it heard and offers to add it verbatim.
- **Undo everywhere**: an ↩️ button in the header, plus an "Undo" action on the
  toast that follows every delete or "clear bought". Entries are stored as data
  rather than closures, so the stack survives a reload — closing the app in a
  shop no longer throws the safety net away. Entries pointing at items somebody
  else has since removed are skipped rather than failing.
- **Deleted items are recoverable**: deleting only moves a row to the list's
  "Удалённое" drawer at the bottom of the screen, where it stays for 30 days and
  can be put back with one tap. "Clear bought" goes there too.
- **Instructions**: a ❓ sheet explains voice, commands, gestures, lists,
  sharing and offline use; it opens by itself on the first visit and afterwards
  lives behind the button (and in ⚙️ Settings).
- **Bought state**: tap an item to check it off — it sinks to the bottom with a
  strikethrough, most recently checked first; "Clear bought" wipes the cart
  after checkout. The screen stays awake (Wake Lock) while the mic is listening.
- **Editing**: the ⋯ button on a row opens an inline editor for the name and a
  short note ("тот, в красной пачке"), with delete tucked behind it so a mis-tap
  next to "−" cannot wipe an item.
- **Eyes-free confirmation**: short, distinguishable tones — rising for an item
  added, falling for one removed, a blip for a tick, a low buzz for speech that
  could not be parsed — plus vibration, which stays on even when the tones are
  switched off in Settings.
- **Bulk input**: paste a list from notes or a chat, or use the system "Share"
  sheet from any app — the text is parsed line by line and shown for review
  before anything is added. A home-screen shortcut opens straight into
  dictation.
- **Suggestions**: unobtrusive autocomplete from purchase history while typing,
  plus a "Frequent" chip row for one-tap re-adds. History folds ё into е and is
  capped per list.
- **Notifications you can dismiss**: toasts go away when tapped, never stack
  more than three deep, and the chatty ones (speech results, item actions) reuse
  an id so a burst replaces itself instead of burying the list.
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
  changes are still waiting. A new build announces itself instead of installing
  silently and waiting for the app to be fully closed.
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
  lists.js            lists, membership, invite tokens, access checks
  validation.js       shared input validation rules
  routes/ controllers/ middleware/
  db/                 better-sqlite3 init (WAL) + transactional .sql migrations
src/
  api/                fetch client, auth/items/lists endpoints, offline queue,
                      list cache, persisted undo stack
  hooks/              useShoppingList (data + realtime), useSpeechRecognition,
                      useDragReorder, useTheme
  components/         Login, ShoppingList, ItemRow (swipe), sheets, DeletedDrawer
  i18n.ts             ru/en dictionary
  utils/speechParser  spoken text → [{ name, count }]
  utils/transcript    merges the fragments an engine calls "final" into one phrase
```

## Access model

A list is an opaque id with a name and an owner. Reading or writing it requires
being that owner or a member, and membership comes from redeeming an invite
token (`?join=TOKEN`). The owner can revoke a member or rotate the token, which
invalidates every copy of the old link. The same check gates Socket.IO rooms and
push subscriptions.

Lists used to *be* their owner's username, and everything that referenced one
was named accordingly until migration 007 renamed the columns to `list_id` and
the API parameter to `list`. An account's first list still has `id = username`,
which is what let invite links handed out before lists had names keep working.

The API also still answers to `username` as a name for the `list` parameter, and
snapshots stored under the old shape are read back. Both exist for one reason:
a phone that queued mutations offline before the rename — or updated while in a
shop with no signal — has to be able to replay them and open onto its list.

## Development

```bash
cp .env.example .env      # fill in JWT_SECRET (openssl rand -hex 32)
npm install
npm start                 # API on :3000 (creates data/database.sqlite)
npm run dev               # Vite on :5173, proxies /api and /socket.io to :3000
```

Tests and checks:

```bash
npm test                  # vitest: parsers, offline queue, undo across reloads,
                          # swipe and drag gestures, list cache, app render
npm run lint
npm run smoke             # boots the real server, exercises the API and sockets
npm run build             # tsc + vite build (output in dist/, served by server)
```

## Known limitations

- Reordering is last-write-wins between collaborators: two people dragging the
  same list at the same time end up with whichever order landed second. Each
  request carries the whole visible order, so the result is always *an* order
  somebody asked for, never a scrambled merge.
- The undo stack is per device. Undo reverses what *this* phone did, which is
  usually what is wanted, but it cannot take back a collaborator's change.
- The deleted drawer keeps 30 days and shows the 50 most recent entries.
- Dictation waits ~0.9 s of silence before applying a phrase. That delay is what
  lets the overlapping "final" results be merged into one utterance.

## Backups

The data volume belongs to the container, so backups run inside it:

```bash
docker compose exec -T web node scripts/backup.mjs
```

This takes a consistent snapshot into `data/backups/` and keeps the newest 14
(`BACKUP_KEEP`, `BACKUP_DIR` to override). It is safe against a live server.
A nightly entry is installed in the host's crontab.

## Deployment (Docker + Caddy)

```bash
cp .env.example .env      # set DOMAIN and JWT_SECRET
mkdir -p data             # persistent SQLite volume
./scripts/deploy.sh
```

`deploy.sh` snapshots the database, rebuilds, restarts, and waits for the app to
answer before reporting success — pending migrations are applied at startup, so
the snapshot matters. The container serves the built SPA and API on port 3000;
the compose file attaches it to the external `caddy_net` network with labels for
`shopping.$DOMAIN`.
