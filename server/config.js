import crypto from "crypto";

const isProduction = process.env.NODE_ENV === "production";

let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  if (isProduction) {
    console.error(
      "FATAL: JWT_SECRET is not set. Add it to .env (e.g. `openssl rand -hex 32`) and restart.",
    );
    process.exit(1);
  }
  // Dev convenience: random per-process secret, so a leaked dev token is useless
  // elsewhere. Tokens are invalidated on every restart.
  jwtSecret = crypto.randomBytes(32).toString("hex");
  console.warn("JWT_SECRET is not set — generated a temporary dev secret.");
}

export const config = {
  isProduction,
  port: Number(process.env.PORT) || 3000,
  jwtSecret,
  tokenTtl: "30d",
  // A token seen with less than this much life left is reissued on the way out,
  // so an app that gets opened at all never expires under the user.
  tokenRenewBeforeSeconds: 20 * 24 * 60 * 60,
  bcryptRounds: 10,
  // Web Push is optional: without keys the feature is simply disabled.
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY || null,
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY || null,
  vapidSubject: process.env.VAPID_SUBJECT || "mailto:admin@example.com",
};
