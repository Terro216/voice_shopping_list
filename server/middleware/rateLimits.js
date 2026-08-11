import rateLimit, { ipKeyGenerator } from "express-rate-limit";

// Authenticated traffic is counted per account, not per IP: a household shares
// one NAT address, and two people filling a list from the same Wi-Fi used to
// burn through a single IP budget between them.
const perUser = (req) => (req.user?.username ? `u:${req.user.username}` : ipKeyGenerator(req.ip));

const limiter = (windowMs, limit, keyGenerator) =>
  rateLimit({
    windowMs,
    limit,
    ...(keyGenerator ? { keyGenerator } : {}),
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests — slow down for a moment" },
  });

const QUARTER_HOUR = 15 * 60 * 1000;

// Reads are cheap and chatty (typeahead fires one per keystroke pause, and a
// live list reloads on every collaborator's edit), so they get their own
// generous budget instead of competing with writes.
export const readLimiter = limiter(QUARTER_HOUR, 3000, perUser);

export const writeLimiter = limiter(QUARTER_HOUR, 1000, perUser);

// Unauthenticated and brute-forceable, so this one stays per-IP and strict.
export const authLimiter = limiter(QUARTER_HOUR, 50);
