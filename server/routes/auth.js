import crypto from "crypto";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/index.js";
import { config } from "../config.js";
import { isValidNewUsername, isPlausibleUsername, isValidPassword } from "../validation.js";

const router = express.Router();

const signToken = (username) =>
  jwt.sign({ username }, config.jwtSecret, { expiresIn: config.tokenTtl });

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!isValidNewUsername(username)) {
    return res
      .status(400)
      .json({ error: "Username must be 3-32 characters: letters, digits, _ or -" });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const hash = await bcrypt.hash(password, config.bcryptRounds);
  try {
    db.prepare("INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)").run(
      crypto.randomUUID(),
      username,
      hash,
    );
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({ error: "Username already exists" });
    }
    throw err;
  }

  res.status(201).json({ token: signToken(username), username });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!isPlausibleUsername(username) || typeof password !== "string" || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  const passwordOk = user && (await bcrypt.compare(password, user.password_hash));
  if (!passwordOk) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ token: signToken(user.username), username: user.username });
});

export default router;
