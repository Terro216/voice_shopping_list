import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import { config } from "./config.js";
import { closeDb } from "./db/index.js";
import { hasListAccess } from "./lists.js";
import { authLimiter } from "./middleware/rateLimits.js";
import itemsRouter from "./routes/items.js";
import authRouter from "./routes/auth.js";
import listsRouter from "./routes/lists.js";
import pushRouter from "./routes/push.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "../dist");

const app = express();
const server = createServer(app);
// No CORS config on purpose: the SPA is served from this same origin (Vite dev
// proxies /api and /socket.io here), so cross-origin access stays disallowed.
const io = new Server(server);

app.set("io", io);

// Приложение живёт за одним обратным прокси (Caddy), поэтому доверяем ровно одному
// хопу X-Forwarded-For — иначе express-rate-limit видит IP прокси вместо клиента.
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: config.isProduction
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            // 'unsafe-inline' is required: react-hot-toast (goober) injects a
            // <style> element at runtime.
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'", "ws:", "wss:"],
            workerSrc: ["'self'"],
            manifestSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
          },
        }
      : false, // Vite dev serves its own pages; CSP here would only get in the way
  }),
);
app.use(express.json({ limit: "10kb" }));

// Sockets carry the same JWT as the REST calls: the name shown in presence and
// the rooms a client may join both come from the token, not from what the
// client claims about itself.
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (typeof token !== "string" || !token) return next(new Error("unauthorized"));
  try {
    socket.data.user = jwt.verify(token, config.jwtSecret).username;
    next();
  } catch {
    next(new Error("unauthorized"));
  }
});

/** Names of everyone currently viewing a list's room. */
const roomPresence = (list) => {
  const room = io.sockets.adapter.rooms.get(`list_${list}`);
  const users = new Set();
  for (const socketId of room ?? []) {
    const user = io.sockets.sockets.get(socketId)?.data?.user;
    if (user) users.add(user);
  }
  return [...users];
};

const announcePresence = (list) => {
  if (list) io.to(`list_${list}`).emit("presence", roomPresence(list));
};

io.on("connection", (socket) => {
  socket.on("join_list", (payload) => {
    const list = typeof payload === "string" ? payload : payload?.list;
    if (typeof list !== "string" || list.length === 0 || list.length > 64) return;
    if (!hasListAccess(socket.data.user, list)) return;

    // Switching lists must vacate the old room, otherwise the previous list
    // keeps showing this viewer until the connection itself drops.
    const previous = socket.data.list;
    if (previous === list) return;
    if (previous) socket.leave(`list_${previous}`);

    socket.data.list = list;
    socket.join(`list_${list}`);
    announcePresence(previous);
    announcePresence(list);
  });

  socket.on("disconnect", () => announcePresence(socket.data.list));
});

// Only the unauthenticated auth endpoints are limited by IP; everything behind
// a token is limited per account inside its own router (see rateLimits.js).
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/items", itemsRouter);
app.use("/api/lists", listsRouter);
app.use("/api/push", pushRouter);
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Vite emits content-hashed filenames under /assets — cache them forever.
app.use("/assets", express.static(path.join(distDir, "assets"), { immutable: true, maxAge: "1y" }));
app.use(express.static(distDir));

// SPA fallback for client-side routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

// Errors thrown in handlers (including malformed JSON bodies) end up here;
// keep API responses JSON instead of Express' default HTML page.
app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error(err);
  if (res.headersSent) return;
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
});

server.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

// Let SQLite checkpoint cleanly when Docker stops the container.
const shutdown = () => {
  io.close();
  server.close(() => {
    closeDb();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000).unref();
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
