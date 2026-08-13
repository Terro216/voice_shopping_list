import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { hasListAccess } from "../lists.js";
import { isValidListId } from "../validation.js";

export const signToken = (username) =>
  jwt.sign({ username }, config.jwtSecret, { expiresIn: config.tokenTtl });

/** Header carrying a refreshed token; the client swaps its stored one for it. */
export const RENEWED_TOKEN_HEADER = "X-Renewed-Token";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  if (!token) return res.status(401).json({ error: "No token provided" });

  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
  req.user = payload;

  // Sliding session: a token nearing its expiry is replaced on the way out, so
  // someone who opens the app regularly is never logged out mid-shopping trip
  // (and an offline queue replayed days later still carries a valid token).
  const secondsLeft = payload.exp - Math.floor(Date.now() / 1000);
  if (secondsLeft > 0 && secondsLeft < config.tokenRenewBeforeSeconds) {
    res.set(RENEWED_TOKEN_HEADER, signToken(payload.username));
  }

  next();
};

/**
 * Guards every list-scoped endpoint. The list id arrives as `username` (query
 * for reads, body for writes) — the parameter kept its old name so that offline
 * mutations queued before lists became first-class still replay. The token says
 * who is asking, this says whether they may.
 */
export const requireListAccess = (req, res, next) => {
  const list = req.method === "GET" || req.method === "DELETE" ? req.query.username : req.body?.username;
  if (!isValidListId(list)) {
    return res.status(400).json({ error: "username is required" });
  }
  if (!hasListAccess(req.user.username, list)) {
    return res.status(403).json({ error: "No access to this list" });
  }
  req.list = list;
  next();
};
