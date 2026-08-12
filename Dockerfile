FROM node:22-slim AS build

# Toolchain for native modules (better-sqlite3) in case no prebuilt binary matches
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-slim

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
COPY server ./server
# Maintenance scripts run inside the container because the data volume belongs
# to it: `docker compose exec -T web node scripts/backup.mjs`.
COPY scripts ./scripts

EXPOSE 3000

CMD ["node", "server/index.js"]
