import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config.js";
import { closeDb } from "./db/index.js";
import itemsRouter from "./routes/items.js";
import authRouter from "./routes/auth.js";
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

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

// Presence: names of everyone currently viewing a list's room. Self-reported
// (the socket is unauthenticated) — display-only, nothing is authorized by it.
const roomPresence = (list) => {
  const room = io.sockets.adapter.rooms.get(`list_${list}`);
  const users = new Set();
  for (const socketId of room ?? []) {
    const user = io.sockets.sockets.get(socketId)?.data?.user;
    if (user) users.add(user);
  }
  return [...users];
};

io.on("connection", (socket) => {
  // Payload is { list, user }; a bare string is tolerated for older cached clients.
  socket.on("join_list", (payload) => {
    const list = typeof payload === "string" ? payload : payload?.list;
    const user = typeof payload === "object" && payload !== null ? payload.user : null;
    if (typeof list !== "string" || list.length === 0 || list.length > 64) return;
    if (user !== null && user !== undefined && (typeof user !== "string" || user.length > 64)) return;

    socket.data.list = list;
    socket.data.user = user || null;
    socket.join(`list_${list}`);
    io.to(`list_${list}`).emit("presence", roomPresence(list));
  });

  socket.on("disconnect", () => {
    if (socket.data.list) {
      io.to(`list_${socket.data.list}`).emit("presence", roomPresence(socket.data.list));
    }
  });
});

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/items", generalLimiter, itemsRouter);
app.use("/api/push", generalLimiter, pushRouter);
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
