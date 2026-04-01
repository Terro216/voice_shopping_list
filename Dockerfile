FROM node:20-slim

# Install build dependencies required for native modules like better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./

# Install dependencies, allowing fallback to npm install if package-lock is missing
RUN npm ci || npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
