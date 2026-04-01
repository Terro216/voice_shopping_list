# Voice Shopping List (Node + SQLite)

A shopping list application built with Vite, React 19, Express, and SQLite.
Users can define a list name/username to maintain individual shopping lists.

## Features Added (Architecture Upgrade)

1. **Frontend separation**: Components are broken down into logical files (`Login.tsx`, `ShoppingList.tsx`, `VoiceControls.tsx`, `ItemRow.tsx`). 
2. **Backend separation**: A properly structured Node/Express architecture is in place (`server/index.js`, `server/db`, `server/controllers`, `server/routes`).
3. **Shareable Lists**: You can now share your list using the **"🔗 Share List"** button, which copies a URL like `?list=USERNAME`.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Make sure the `data` directory exists locally to store your persistent database:
   ```bash
   mkdir -p data
   ```

3. Run with Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

## Development

You can run both the frontend and backend in development:

1. Start the Node backend API (runs on port `3000`):
   ```bash
   npm start
   ```

2. In a separate terminal, start the Vite dev server (proxies `/api` to `3000`):
   ```bash
   npm run dev
   ```
