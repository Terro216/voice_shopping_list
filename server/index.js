import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import itemsRouter from "./routes/items.js";
import authRouter from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled for Vite local dev/PWA ease
  }),
);
app.use(cors());
app.use(express.json());

// Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
});

// WebSockets
io.on("connection", (socket) => {
  socket.on("join_list", (listName) => {
    socket.join(`list_${listName}`);
  });
});

// API Routes
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/items", generalLimiter, itemsRouter);

// Serve frontend
app.use(express.static(path.join(__dirname, "../dist")));

// Fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
