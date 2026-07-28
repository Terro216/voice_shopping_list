# Voice Shopping List

Shared shopping lists with voice input. React 19 + Vite PWA on the frontend,
Express 5 + SQLite (better-sqlite3) + Socket.IO on the backend.

## Features

- **Voice input** (Web Speech API, Russian/English): "добавь молоко и 2 хлеба" →
  items with quantities. Saying an existing item again bumps its count.
- **Shared lists**: "🔗 Share" copies a `?list=USERNAME` link; anyone logged in
  can open and edit that list, changes sync live over WebSockets.
- **Offline-first PWA**: mutations made offline are queued in localStorage and
  replayed (in order, with a fresh token) when the connection returns.
- **Auth**: username/password (bcrypt), JWT for 7 days.

## Project layout

```
server/
  index.js            Express app, Socket.IO, CSP, rate limits, static serving
  config.js           env parsing; refuses to start in prod without JWT_SECRET
  validation.js       shared input validation rules
  routes/ controllers/ middleware/
  db/                 better-sqlite3 init (WAL) + transactional .sql migrations
src/
  api/                fetch client, auth/items endpoints, offline queue
  hooks/              useShoppingList (data + realtime), useSpeechRecognition
  components/         Login, ShoppingList, VoiceControls, ItemRow
  utils/speechParser  spoken text → [{ name, count }]
```

## Access model (deliberate)

A list is identified by its owner's username. Any *authenticated* user who
knows a list's name can read and edit it — that is exactly what the share link
relies on. Don't put secrets in item names.

## Development

```bash
cp .env.example .env      # fill in JWT_SECRET (openssl rand -hex 32)
npm install
npm start                 # API on :3000 (creates data/database.sqlite)
npm run dev               # Vite on :5173, proxies /api and /socket.io to :3000
```

Tests and checks:

```bash
npm test                  # vitest (speech parser, offline queue)
npm run lint
npm run smoke             # boots the real server, exercises the API end to end
npm run build             # tsc + vite build (output in dist/, served by server)
```

## Deployment (Docker + Caddy)

```bash
cp .env.example .env      # set DOMAIN and JWT_SECRET
mkdir -p data             # persistent SQLite volume
docker-compose up -d --build
```

The container serves the built SPA and API on port 3000; the compose file
attaches it to the external `caddy_net` network with labels for
`shopping.$DOMAIN`.
