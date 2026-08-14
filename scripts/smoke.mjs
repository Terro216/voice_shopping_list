// End-to-end smoke test: boots the real server on a test port with an isolated
// database and exercises the auth + items API. Run: npm run smoke
import { spawn } from 'child_process';
import { rmSync } from 'fs';
import { setTimeout as sleep } from 'timers/promises';
import { io as connectSocket } from 'socket.io-client';

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

  r = await api(`/api/items?list=${user}`);
  check('items without token → 401', r.status === 401, JSON.stringify(r));

  r = await api(`/api/items?list=${user}`, { token });
  check('items with token → empty list', r.status === 200 && Array.isArray(r.data) && r.data.length === 0, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-1', name: '  молоко  ', count: 2, list: user } });
  check('add item → 201', r.status === 201, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-1', name: 'молоко', count: 2, list: user } });
  check('replayed add (same id) tolerated → 200', r.status === 200 && r.data.success, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'bad id!', name: 'x', list: user } });
  check('bad item id → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-2', name: '', list: user } });
  check('empty name → 400', r.status === 400, JSON.stringify(r));

  r = await api(`/api/items?list=${user}`, { token });
  check('name got trimmed', r.data?.[0]?.name === 'молоко', JSON.stringify(r.data));
  check('count stored', r.data?.[0]?.count === 2, JSON.stringify(r.data));

  r = await api('/api/items/item-1/count', { method: 'PATCH', token, body: { list: user, delta: 3 } });
  check('increment by 3 → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  check('count is now 5', r.data?.[0]?.count === 5, JSON.stringify(r.data));

  r = await api('/api/items/item-1/count', { method: 'PATCH', token, body: { list: user, delta: -5 } });
  check('decrement to zero → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  check('item removed at zero', r.data?.length === 0, JSON.stringify(r.data));

  r = await api('/api/items/item-9/count', { method: 'PATCH', token, body: { list: user, delta: 1 } });
  check('count change on missing item → 404', r.status === 404, JSON.stringify(r));

  // Bought flow
  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-4', name: 'молоко', list: user } });
  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-5', name: 'хлеб', list: user } });
  r = await api('/api/items/item-4/bought', { method: 'PATCH', token, body: { list: user, bought: true } });
  check('mark bought → 200', r.status === 200, JSON.stringify(r));

  r = await api(`/api/items?list=${user}`, { token });
  check('bought item sorts last', r.data?.length === 2 && r.data[1].id === 'item-4' && r.data[1].bought === true, JSON.stringify(r.data));

  r = await api('/api/items/item-4/bought', { method: 'PATCH', token, body: { list: user, bought: 'yes' } });
  check('non-boolean bought → 400', r.status === 400, JSON.stringify(r));

  r = await api(`/api/items/suggestions?list=${user}&q=мол`, { token });
  check('suggestions by prefix include молоко', r.status === 200 && r.data?.some((s) => s.name === 'молоко'), JSON.stringify(r.data));

  r = await api(`/api/items/bought?list=${user}`, { method: 'DELETE', token });
  check('clear bought → removed 1', r.status === 200 && r.data?.removed === 1, JSON.stringify(r));

  r = await api(`/api/items?list=${user}`, { token });
  check('only active item remains', r.data?.length === 1 && r.data[0].id === 'item-5', JSON.stringify(r.data));

  r = await api(`/api/items/item-5?list=${user}`, { method: 'DELETE', token });

  // Push (VAPID not configured in the smoke environment)
  r = await api('/api/push/public-key');
  check('push public key → null when unconfigured', r.status === 200 && r.data?.key === null, JSON.stringify(r));

  r = await api('/api/push/subscribe', { method: 'POST', token, body: { subscription: { endpoint: 'https://x', keys: { p256dh: 'a', auth: 'b' } }, list: user } });
  check('push subscribe unconfigured → 503', r.status === 503, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-3', name: 'хлеб', list: user } });
  r = await api(`/api/items/item-3?list=${user}`, { method: 'DELETE', token });
  check('delete → 200', r.status === 200, JSON.stringify(r));

  r = await api('/api/nonexistent');
  check('unknown api route → 404 JSON', r.status === 404 && r.data?.error === 'Not found', JSON.stringify(r));

  const raw = await fetch(BASE + '/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: '{broken json',
  });
  check('malformed JSON body → 400 JSON error', raw.status === 400, String(raw.status));

  // ---- renaming ----
  await api('/api/items', { method: 'POST', token, body: { id: 'item-r', name: 'малако', list: user } });
  r = await api('/api/items/item-r', { method: 'PATCH', token, body: { list: user, name: '  молоко  жирное ' } });
  check('rename → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  check(
    'renamed name is normalized',
    r.data?.find((i) => i.id === 'item-r')?.name === 'молоко жирное',
    JSON.stringify(r.data),
  );
  r = await api('/api/items/item-missing', { method: 'PATCH', token, body: { list: user, name: 'x' } });
  check('rename of a missing item → 404', r.status === 404, JSON.stringify(r));
  r = await api('/api/items/item-r', { method: 'PATCH', token, body: { list: user, name: '   ' } });
  check('rename to blank → 400', r.status === 400, JSON.stringify(r));

  // ---- notes ----
  r = await api('/api/items/item-r', { method: 'PATCH', token, body: { list: user, note: '  тот, в красной  пачке ' } });
  check('set note → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  {
    const edited = r.data?.find((i) => i.id === 'item-r');
    check('note stored and normalized', edited?.note === 'тот, в красной пачке', JSON.stringify(edited));
    check('setting a note leaves the name alone', edited?.name === 'молоко жирное', JSON.stringify(edited));
  }

  r = await api('/api/items/item-r', { method: 'PATCH', token, body: { list: user, note: '' } });
  r = await api(`/api/items?list=${user}`, { token });
  check('empty note clears it', r.data?.find((i) => i.id === 'item-r')?.note === null, JSON.stringify(r.data));

  r = await api('/api/items/item-r', { method: 'PATCH', token, body: { list: user, note: 'x'.repeat(201) } });
  check('overlong note → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/items/item-r', { method: 'PATCH', token, body: { list: user } });
  check('patch with nothing to change → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-n', name: 'сыр', note: 'без плесени', list: user } });
  check('item created with a note → 201', r.status === 201, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  check('created note round-trips', r.data?.find((i) => i.id === 'item-n')?.note === 'без плесени', JSON.stringify(r.data));

  // ---- most recently bought sorts first within the bought group ----
  await api('/api/items', { method: 'POST', token, body: { id: 'b-1', name: 'первый', list: user } });
  await api('/api/items', { method: 'POST', token, body: { id: 'b-2', name: 'второй', list: user } });
  await api('/api/items/b-1/bought', { method: 'PATCH', token, body: { list: user, bought: true } });
  await sleep(5);
  await api('/api/items/b-2/bought', { method: 'PATCH', token, body: { list: user, bought: true } });
  r = await api(`/api/items?list=${user}`, { token });
  {
    const bought = r.data.filter((i) => i.bought).map((i) => i.id);
    check('latest bought item comes first', bought[0] === 'b-2', JSON.stringify(bought));
  }

  // ---- suggestions fold ё into е ----
  await api('/api/items', { method: 'POST', token, body: { id: 'item-yo', name: 'Ёлка', list: user } });
  r = await api(`/api/items/suggestions?list=${user}&q=ел`, { token });
  check('«ел» suggests «Ёлка»', r.data?.some((s) => s.name === 'Ёлка'), JSON.stringify(r.data));
  r = await api(`/api/items/suggestions?list=${user}&q=ёл`, { token });
  check('«ёл» suggests «Ёлка» too', r.data?.some((s) => s.name === 'Ёлка'), JSON.stringify(r.data));

  // ---- access control: knowing a list name is not access ----
  const other = `${user}_b`;
  r = await api('/api/auth/register', { method: 'POST', body: { username: other, password: 'password123' } });
  const otherToken = r.data.token;
  check('second account registered', r.status === 201 && !!otherToken, JSON.stringify(r));

  r = await api(`/api/items?list=${user}`, { token: otherToken });
  check('stranger cannot read the list → 403', r.status === 403, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token: otherToken, body: { id: 'evil-1', name: 'x', list: user } });
  check('stranger cannot add to the list → 403', r.status === 403, JSON.stringify(r));

  r = await api(`/api/items/bought?list=${user}`, { method: 'DELETE', token: otherToken });
  check('stranger cannot clear the list → 403', r.status === 403, JSON.stringify(r));

  r = await api(`/api/items/item-r?list=${user}`, { method: 'DELETE', token: otherToken });
  check('stranger cannot delete an item → 403', r.status === 403, JSON.stringify(r));

  // ---- invite links ----
  r = await api('/api/lists/share', { token });
  const invite = r.data?.token;
  check('owner gets an invite token', r.status === 200 && typeof invite === 'string' && invite.length >= 16, JSON.stringify(r));

  r = await api('/api/lists/join', { method: 'POST', token: otherToken, body: { token: 'nope' } });
  check('malformed invite → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/lists/join', { method: 'POST', token: otherToken, body: { token: 'a'.repeat(24) } });
  check('unknown invite → 404', r.status === 404, JSON.stringify(r));

  r = await api('/api/lists/join', { method: 'POST', token: otherToken, body: { token: invite } });
  check('valid invite grants access', r.status === 200 && r.data?.list === user, JSON.stringify(r));

  r = await api(`/api/items?list=${user}`, { token: otherToken });
  check('member can read the list', r.status === 200 && Array.isArray(r.data), JSON.stringify(r));

  r = await api('/api/lists', { token: otherToken });
  check(
    "joined list appears in the member's lists",
    r.data?.some((l) => l.name === user && l.owned === false),
    JSON.stringify(r.data),
  );

  r = await api('/api/lists/share/rotate', { method: 'POST', token });
  const rotated = r.data?.token;
  check('rotating issues a different token', typeof rotated === 'string' && rotated !== invite, JSON.stringify(r));

  r = await api('/api/lists/join', { method: 'POST', token: otherToken, body: { token: invite } });
  check('the replaced invite stops working → 404', r.status === 404, JSON.stringify(r));

  r = await api('/api/lists/members', { method: 'DELETE', token: otherToken, body: { list: user, member: other } });
  check('only the owner may remove members → 403', r.status === 403, JSON.stringify(r));

  r = await api('/api/lists/members', { method: 'DELETE', token, body: { list: user, member: other } });
  check('owner removes the member → 200', r.status === 200, JSON.stringify(r));

  r = await api(`/api/items?list=${user}`, { token: otherToken });
  check('removed member loses access → 403', r.status === 403, JSON.stringify(r));

  // ---- the old `username` spelling of the list parameter still replays ----
  // Mutations queued offline before the rename carry it, and a phone that spent
  // a week in a drawer has to be able to send them.
  r = await api(`/api/items?username=${user}`, { token });
  check('legacy ?username= still reads the list', r.status === 200 && Array.isArray(r.data), JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'legacy-1', name: 'старьё', username: user } });
  check('legacy body {username} still writes → 201', r.status === 201, JSON.stringify(r));

  r = await api(`/api/items/legacy-1?username=${user}`, { method: 'DELETE', token });
  check('legacy delete still works → 200', r.status === 200, JSON.stringify(r));

  r = await api(`/api/items?username=${user}`, { token: otherToken });
  check('the legacy spelling is still access-checked → 403', r.status === 403, JSON.stringify(r));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'no-list', name: 'x' } });
  check('naming no list at all → 400', r.status === 400, JSON.stringify(r));

  // ---- the deleted drawer: deleting hides an item, it does not destroy it ----
  r = await api(`/api/items/deleted?list=${user}`, { token });
  check(
    'deleted items are kept in the drawer',
    r.status === 200 && r.data?.some((i) => i.id === 'item-3'),
    JSON.stringify(r.data),
  );
  check(
    'the drawer is not part of the list itself',
    !(await api(`/api/items?list=${user}`, { token })).data.some((i) => i.id === 'item-3'),
  );

  r = await api('/api/items/item-3/restore', { method: 'POST', token, body: { list: user } });
  check('restore → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  check(
    'a restored item is back on the list and not bought',
    r.data?.some((i) => i.id === 'item-3' && i.bought === false),
    JSON.stringify(r.data),
  );

  r = await api('/api/items/item-3/restore', { method: 'POST', token, body: { list: user } });
  check('restoring something that is not deleted → 404', r.status === 404, JSON.stringify(r));

  // Undo re-posts a deleted item under its original id; that has to bring it back.
  await api(`/api/items/item-3?list=${user}`, { method: 'DELETE', token });
  r = await api('/api/items', { method: 'POST', token, body: { id: 'item-3', name: 'хлеб', count: 2, list: user } });
  check('re-posting a deleted id revives it → 201', r.status === 201, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  check(
    'the revived item carries the re-posted fields',
    r.data?.find((i) => i.id === 'item-3')?.count === 2,
    JSON.stringify(r.data),
  );

  r = await api(`/api/items/deleted?list=${user}`, { method: 'DELETE', token });
  check('emptying the drawer → 200', r.status === 200 && r.data?.purged > 0, JSON.stringify(r));
  r = await api(`/api/items/deleted?list=${user}`, { token });
  check('the drawer is empty afterwards', r.data?.length === 0, JSON.stringify(r.data));

  // ---- manual order ----
  r = await api(`/api/items?list=${user}`, { token });
  const activeIds = r.data.filter((i) => !i.bought).map((i) => i.id);
  check('there are several active items to order', activeIds.length >= 3, JSON.stringify(activeIds));

  const reversed = [...activeIds].reverse();
  r = await api('/api/items/order', { method: 'PUT', token, body: { list: user, ids: reversed } });
  check('reorder → 200', r.status === 200, JSON.stringify(r));
  r = await api(`/api/items?list=${user}`, { token });
  check(
    'the list comes back in the requested order',
    r.data.filter((i) => !i.bought).map((i) => i.id).join() === reversed.join(),
    JSON.stringify(r.data.map((i) => i.id)),
  );

  // A stale tab may not know about every row; the ones it omits must survive.
  r = await api('/api/items/order', {
    method: 'PUT',
    token,
    body: { list: user, ids: [reversed[reversed.length - 1]] },
  });
  r = await api(`/api/items?list=${user}`, { token });
  check(
    'items left out of a reorder stay on the list',
    r.data.filter((i) => !i.bought).length === activeIds.length,
    JSON.stringify(r.data.map((i) => i.id)),
  );
  check(
    'the mentioned item moved to the front',
    r.data.filter((i) => !i.bought)[0].id === reversed[reversed.length - 1],
    JSON.stringify(r.data.map((i) => i.id)),
  );

  r = await api('/api/items/order', { method: 'PUT', token, body: { list: user, ids: 'nope' } });
  check('a malformed order payload → 400', r.status === 400, JSON.stringify(r));

  // ---- several named lists per account ----
  r = await api('/api/lists', { method: 'POST', token, body: { name: '  Дача  ' } });
  const dacha = r.data;
  check('create a list → 201', r.status === 201 && dacha?.owned === true, JSON.stringify(r));
  check('the name is normalized', dacha?.name === 'Дача', JSON.stringify(dacha));
  check('a new list gets an id of its own', typeof dacha?.id === 'string' && dacha.id !== user, JSON.stringify(dacha));

  r = await api('/api/lists', { method: 'POST', token, body: { name: '   ' } });
  check('a blank list name → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/lists', { token });
  check('both lists are listed', r.data?.filter((l) => l.owned).length >= 2, JSON.stringify(r.data));

  r = await api('/api/items', { method: 'POST', token, body: { id: 'd-1', name: 'грабли', list: dacha.id } });
  check('add to the second list → 201', r.status === 201, JSON.stringify(r));
  r = await api(`/api/items?list=${encodeURIComponent(dacha.id)}`, { token });
  check('the second list holds only its own items', r.data?.length === 1 && r.data[0].name === 'грабли', JSON.stringify(r.data));

  r = await api(`/api/items?list=${encodeURIComponent(dacha.id)}`, { token: otherToken });
  check('a stranger cannot read the second list → 403', r.status === 403, JSON.stringify(r));

  r = await api(`/api/lists/${encodeURIComponent(dacha.id)}`, { method: 'PATCH', token, body: { name: 'Дача и сад' } });
  check('rename a list → 200', r.status === 200 && r.data?.name === 'Дача и сад', JSON.stringify(r));
  r = await api(`/api/lists/${encodeURIComponent(dacha.id)}`, { method: 'PATCH', token: otherToken, body: { name: 'моё' } });
  check('only the owner may rename → 403', r.status === 403, JSON.stringify(r));

  r = await api(`/api/lists/share?list=${encodeURIComponent(dacha.id)}`, { token });
  const dachaInvite = r.data?.token;
  check('the second list has an invite of its own', typeof dachaInvite === 'string' && dachaInvite !== rotated, JSON.stringify(r));

  r = await api(`/api/lists/share?list=${encodeURIComponent(dacha.id)}`, { token: otherToken });
  check('a stranger cannot ask for its invite → 403', r.status === 403, JSON.stringify(r));

  r = await api('/api/lists/join', { method: 'POST', token: otherToken, body: { token: dachaInvite } });
  check('joining answers with the list and its name', r.data?.list === dacha.id && r.data?.name === 'Дача и сад', JSON.stringify(r));
  r = await api(`/api/items?list=${encodeURIComponent(dacha.id)}`, { token: otherToken });
  check('the new member can read it', r.status === 200, JSON.stringify(r));

  r = await api(`/api/lists/${encodeURIComponent(user)}`, { method: 'DELETE', token });
  check('the main list cannot be deleted → 400', r.status === 400, JSON.stringify(r));

  r = await api(`/api/lists/${encodeURIComponent(dacha.id)}`, { method: 'DELETE', token: otherToken });
  check('a member "deleting" a list only leaves it', r.data?.left === true, JSON.stringify(r));
  r = await api(`/api/items?list=${encodeURIComponent(dacha.id)}`, { token: otherToken });
  check('after leaving there is no access → 403', r.status === 403, JSON.stringify(r));
  r = await api(`/api/items?list=${encodeURIComponent(dacha.id)}`, { token });
  check('the owner still has their list', r.status === 200, JSON.stringify(r));

  r = await api(`/api/lists/${encodeURIComponent(dacha.id)}`, { method: 'DELETE', token });
  check('the owner deletes the list → 200', r.data?.deleted === true, JSON.stringify(r));
  r = await api(`/api/items?list=${encodeURIComponent(dacha.id)}`, { token });
  check('a deleted list is gone → 403', r.status === 403, JSON.stringify(r));

  // ---- realtime: the socket carries the same token as the REST calls ----
  const openSocket = (auth) =>
    new Promise((resolve) => {
      const socket = connectSocket(BASE, { auth, transports: ['websocket'], reconnection: false });
      const done = (outcome) => {
        clearTimeout(timer);
        resolve({ socket, outcome });
      };
      const timer = setTimeout(() => done('timeout'), 4000);
      socket.on('connect', () => done('connected'));
      socket.on('connect_error', (err) => done(err.message));
    });

  {
    const anonymous = await openSocket({});
    check('socket without a token is refused', anonymous.outcome === 'unauthorized', anonymous.outcome);
    anonymous.socket.close();

    const authed = await openSocket({ token });
    check('socket with a token connects', authed.outcome === 'connected', authed.outcome);

    // A change made over HTTP must reach the room, tagged with the client id of
    // whoever made it so that tab can skip reacting to its own echo.
    const updateSeen = new Promise((resolve) => {
      authed.socket.on('list_updated', resolve);
      setTimeout(() => resolve(null), 4000);
    });
    authed.socket.emit('join_list', { list: user });
    await sleep(150);
    await fetch(BASE + '/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Client-Id': 'smoke-client',
      },
      body: JSON.stringify({ id: 'sock-1', name: 'сокет', list: user }),
    });
    const payload = await updateSeen;
    check('list_updated reaches the room with its actor', payload?.actor === 'smoke-client', JSON.stringify(payload));

    // Joining a list this account has no access to must be silently ignored.
    const strangerSocket = await openSocket({ token: otherToken });
    const noUpdate = new Promise((resolve) => {
      strangerSocket.socket.on('list_updated', () => resolve('leaked'));
      setTimeout(() => resolve('silent'), 1200);
    });
    strangerSocket.socket.emit('join_list', { list: user });
    await sleep(150);
    await api('/api/items', { method: 'POST', token, body: { id: 'sock-2', name: 'второй', list: user } });
    check('socket cannot join a list it has no access to', (await noUpdate) === 'silent');

    authed.socket.close();
    strangerSocket.socket.close();
  }

  // ---- password change ----
  r = await api('/api/auth/password', { method: 'POST', token: otherToken, body: { currentPassword: 'wrong', newPassword: 'newpassword1' } });
  check('password change with wrong current → 401', r.status === 401, JSON.stringify(r));

  r = await api('/api/auth/password', { method: 'POST', token: otherToken, body: { currentPassword: 'password123', newPassword: 'short' } });
  check('password change to a short one → 400', r.status === 400, JSON.stringify(r));

  r = await api('/api/auth/password', { method: 'POST', token: otherToken, body: { currentPassword: 'password123', newPassword: 'newpassword1' } });
  check('password changed → 200 + token', r.status === 200 && !!r.data.token, JSON.stringify(r));

  r = await api('/api/auth/login', { method: 'POST', body: { username: other, password: 'newpassword1' } });
  check('login with the new password → 200', r.status === 200, JSON.stringify(r));

  // ---- account deletion ----
  r = await api('/api/auth/account', { method: 'DELETE', token: otherToken, body: { password: 'password123' } });
  check('delete account with the old password → 401', r.status === 401, JSON.stringify(r));

  r = await api('/api/auth/account', { method: 'DELETE', token: otherToken, body: { password: 'newpassword1' } });
  check('account deleted → 200', r.status === 200, JSON.stringify(r));

  r = await api('/api/auth/login', { method: 'POST', body: { username: other, password: 'newpassword1' } });
  check('deleted account can no longer log in → 401', r.status === 401, JSON.stringify(r));
} finally {
  server.kill('SIGTERM');
  await sleep(500);
  rmSync(dataDir, { recursive: true, force: true });
}

console.log(failures === 0 ? '\nALL SMOKE TESTS PASSED' : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
