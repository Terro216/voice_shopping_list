// End-to-end smoke test: boots the real server on a test port with an isolated
// database and exercises the auth + items API. Run: npm run smoke
import { spawn } from 'child_process';
import { rmSync } from 'fs';
import { setTimeout as sleep } from 'timers/promises';

const PORT = 3999;
const BASE = `http://127.0.0.1:${PORT}`;
const user = `smoke_${Date.now().toString(36)}`;
let failures = 0;

const check = (label, cond, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${cond ? '' : '  ' + extra}`);
  if (!cond) failures++;
};

const api = async (path, { method = 'GET', body, token } = {}) => {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON */
  }
  return { status: res.status, data };
};

const dataDir = `smoke-data-${process.pid}`;
const server = spawn('node', ['server/index.js'], {
  env: { ...process.env, PORT: String(PORT), NODE_ENV: '', DATA_DIR: dataDir },
  stdio: ['ignore', 'pipe', 'inherit'],
});

await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('server did not start')), 10000);
  server.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
    if (chunk.toString().includes('listening')) {
      clearTimeout(timer);
      resolve();
    }
  });
  server.on('exit', (code) => reject(new Error(`server exited early: ${code}`)));
});

try {
  let r = await api('/api/auth/register', { method: 'POST', body: { username: user, password: 'password123' } });
  check('register → 201 + token', r.status === 201 && !!r.data.token, JSON.stringify(r));
  const token = r.data.token;

  r = await api('/api/auth/register', { method: 'POST', body: { username: user, password: 'password123' } });
  check('duplicate register → 409', r.status === 409, JSON.stringify(r));

  r = await api('/api/auth/register', { method: 'POST', body: { username: user + 'x', password: 'short' } });
  check('short password → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/auth/register', { method: 'POST', body: { username: 'иван', password: 'password123' } });
  check('invalid username charset → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/auth/login', { method: 'POST', body: { username: user, password: 'wrongpass' } });
  check('login wrong password → 401', r.status === 401, JSON.stringify(r));

  r = await api('/api/auth/login', { method: 'POST', body: { username: user, password: 'password123' } });
  check('login → 200 + token', r.status === 200 && !!r.data.token, JSON.stringify(r));

  r = await api(`/api/items?username=${user}`);
  check('items without token → 401', r.status === 401, JSON.stringify(r));

  r = await api(`/api/items?username=${user}`, { token });
  check('items with token → empty list', r.status === 200 && Array.isArray(r.data) && r.data.length === 0, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-1', name: '  молоко  ', count: 2, username: user } });
  check('add item → 201', r.status === 201, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-1', name: 'молоко', count: 2, username: user } });
  check('replayed add (same id) tolerated → 200', r.status === 200 && r.data.success, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'bad id!', name: 'x', username: user } });
  check('bad item id → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-2', name: '', username: user } });
  check('empty name → 400', r.status === 400, JSON.stringify(r));

  r = await api(`/api/items?username=${user}`, { token });
  check('name got trimmed', r.data?.[0]?.name === 'молоко', JSON.stringify(r.data));
  check('count stored', r.data?.[0]?.count === 2, JSON.stringify(r.data));

  r = await api('/api/items/item-1/count', { method: 'PATCH', token, body: { username: user, delta: 3 } });
  check('increment by 3 → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?username=${user}`, { token });
  check('count is now 5', r.data?.[0]?.count === 5, JSON.stringify(r.data));

  r = await api('/api/items/item-1/count', { method: 'PATCH', token, body: { username: user, delta: -5 } });
  check('decrement to zero → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?username=${user}`, { token });
  check('item removed at zero', r.data?.length === 0, JSON.stringify(r.data));

  r = await api('/api/items/item-9/count', { method: 'PATCH', token, body: { username: user, delta: 1 } });
  check('count change on missing item → 404', r.status === 404, JSON.stringify(r));

  // Bought flow
  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-4', name: 'молоко', username: user } });
  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-5', name: 'хлеб', username: user } });
  r = await api('/api/items/item-4/bought', { method: 'PATCH', token, body: { username: user, bought: true } });
  check('mark bought → 200', r.status === 200, JSON.stringify(r));

  r = await api(`/api/items?username=${user}`, { token });
  check('bought item sorts last', r.data?.length === 2 && r.data[1].id === 'item-4' && r.data[1].bought === true, JSON.stringify(r.data));

  r = await api('/api/items/item-4/bought', { method: 'PATCH', token, body: { username: user, bought: 'yes' } });
  check('non-boolean bought → 400', r.status === 400, JSON.stringify(r));

  r = await api(`/api/items/suggestions?username=${user}&q=мол`, { token });
  check('suggestions by prefix include молоко', r.status === 200 && r.data?.some((s) => s.name === 'молоко'), JSON.stringify(r.data));

  r = await api(`/api/items/bought?username=${user}`, { method: 'DELETE', token });
  check('clear bought → removed 1', r.status === 200 && r.data?.removed === 1, JSON.stringify(r));

  r = await api(`/api/items?username=${user}`, { token });
  check('only active item remains', r.data?.length === 1 && r.data[0].id === 'item-5', JSON.stringify(r.data));

  r = await api(`/api/items/item-5?username=${user}`, { method: 'DELETE', token });

  // Push (VAPID not configured in the smoke environment)
  r = await api('/api/push/public-key');
  check('push public key → null when unconfigured', r.status === 200 && r.data?.key === null, JSON.stringify(r));

  r = await api('/api/push/subscribe', { method: 'POST', token, body: { subscription: { endpoint: 'https://x', keys: { p256dh: 'a', auth: 'b' } }, list: user } });
  check('push subscribe unconfigured → 503', r.status === 503, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-3', name: 'хлеб', username: user } });
  r = await api(`/api/items/item-3?username=${user}`, { method: 'DELETE', token });
  check('delete → 200', r.status === 200, JSON.stringify(r));

  r = await api('/api/nonexistent');
  check('unknown api route → 404 JSON', r.status === 404 && r.data?.error === 'Not found', JSON.stringify(r));

  const raw = await fetch(BASE + '/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: '{broken json',
  });
  check('malformed JSON body → 400 JSON error', raw.status === 400, String(raw.status));
} finally {
  server.kill('SIGTERM');
  await sleep(500);
  rmSync(dataDir, { recursive: true, force: true });
}

console.log(failures === 0 ? '\nALL SMOKE TESTS PASSED' : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
