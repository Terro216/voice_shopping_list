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
 * Guards every list-scoped endpoint. The list id arrives as `list` — in the
 * query for reads, in the body for writes. The token says who is asking, this
 * says whether they may.
 *
 * `username` is still accepted as a name for the same parameter: mutations
 * queued offline before the rename carry it in their URLs and bodies, and a
 * phone that spent a week in a drawer has to be able to replay them.
 */
export const requireListAccess = (req, res, next) => {
  const source = req.method === "GET" || req.method === "DELETE" ? req.query : (req.body ?? {});
  const list = source.list ?? source.username;
  if (!isValidListId(list)) {
    return res.status(400).json({ error: "list is required" });
  }
  if (!hasListAccess(req.user.username, list)) {
    return res.status(403).json({ error: "No access to this list" });
  }
  req.list = list;
  next();
};
