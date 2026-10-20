import crypto from 'node:crypto';
import db from '../db/index.js';

/** Only synchronous SQLite handlers belong here. Send and broadcast after commit. */
export const mutation = (handler) => (req, res, next) => {
  const id = req.get('X-Mutation-Id');
  // Older clients remain usable until their service worker updates.
  if (!id) return handler(req, res, next);
  if (!/^[a-zA-Z0-9_-]{8,100}$/.test(id)) return res.status(400).json({ error: 'Invalid mutation id' });
  const fingerprint = crypto.createHash('sha256')
    .update(JSON.stringify([req.method, req.originalUrl, req.body ?? null])).digest('hex');
  const json = res.json;
  const effects = [];
  let response;
  try {
    db.transaction(() => {
      const receipt = db.prepare('SELECT * FROM mutation_receipts WHERE user_id = ? AND mutation_id = ?').get(req.user.sub, id);
      if (receipt) {
        response = receipt.fingerprint === fingerprint
          ? { status: receipt.status, body: JSON.parse(receipt.response) }
          : { status: 409, body: { error: 'Mutation id already used for another request' } };
        return;
      }
      req.afterCommit = (effect) => effects.push(effect);
      res.json = (body) => { response = { status: res.statusCode, body }; return res; };
      handler(req, res);
      if (!response) throw new Error('Mutation handler did not return JSON');
      if (response.status >= 500) throw new Error('Mutation failed');
      db.prepare('INSERT INTO mutation_receipts VALUES (?, ?, ?, ?, ?, ?)')
        .run(req.user.sub, id, fingerprint, response.status, JSON.stringify(response.body), Date.now());
    })();
  } catch (error) {
    res.json = json;
    return next(error);
  }
  res.json = json;
  for (const effect of effects) effect();
  return res.status(response.status).json(response.body);
};
