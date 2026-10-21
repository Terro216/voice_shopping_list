import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import net from 'node:net';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import webpush from 'web-push';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { io } from 'socket.io-client';

const results = [];
const artifactDir = process.env.BROWSER_ARTIFACTS || mkdtempSync(path.join(tmpdir(), 'shopping-browser-artifacts-'));
mkdirSync(artifactDir, { recursive: true });
const dataDir = mkdtempSync(path.join(tmpdir(), 'shopping-browser-data-'));
const screenshot = (name) => path.join(artifactDir, name);
const probe = async (name, fn) => {
  try { const detail = await fn(); results.push({ name, ...detail }); console.log(JSON.stringify(results.at(-1))); }
  catch (e) { results.push({ name, probe_error: String(e).slice(0, 1200) }); console.log(JSON.stringify(results.at(-1))); }
};
const listener = net.createServer();
await new Promise(resolve => listener.listen(0, '127.0.0.1', resolve));
const port = listener.address().port;
await new Promise(resolve => listener.close(resolve));
const base = `http://127.0.0.1:${port}`;
const vapid = webpush.generateVAPIDKeys();
const server = spawn(process.execPath, ['server/index.js'], {
  env: { ...process.env, NODE_ENV: 'development', PORT: String(port), DATA_DIR: dataDir, HOST: '127.0.0.1', JWT_SECRET: randomUUID(), VAPID_PUBLIC_KEY: vapid.publicKey, VAPID_PRIVATE_KEY: vapid.privateKey, VAPID_SUBJECT: 'mailto:test@example.invalid' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverLog = '';
server.stdout.on('data', chunk => { serverLog += chunk; });
server.stderr.on('data', chunk => { serverLog += chunk; });
let browser;
const api = async (path, token, method = 'GET', body) => {
  const r = await fetch(base + path, { method, headers: { 'content-type': 'application/json', ...(token ? { authorization: 'Bearer ' + token } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  return { status: r.status, data: await r.json() };
};
const register = async (username) => {
  const password = randomUUID();
  const r = await api('/api/auth/register', null, 'POST', { username, password });
  if (r.status !== 201) throw new Error('fixture registration ' + r.status);
  return { ...r.data, password };
};
const seedItem = async (account, name, count = 1, fields = {}) => {
  const item = { id: randomUUID(), list: account.username, name, count, bought: false, ...fields };
  await api('/api/items', account.token, 'POST', item);
  return item;
};
const openAccount = async (account, { width = 390, helpSeen = true, serviceWorkers = 'block', list, mockSpeech = true } = {}) => {
  const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, serviceWorkers });
  await context.addInitScript(({ account, helpSeen, mockSpeech }) => {
    if (!sessionStorage.getItem('review_initialized')) {
      localStorage.setItem('username', account.username);
      localStorage.setItem('token', account.token);
      if (helpSeen) localStorage.setItem('help_seen_v1', '1');
      localStorage.setItem('sound_enabled', '0');
      sessionStorage.setItem('review_initialized', '1');
    }
    if (mockSpeech) {
      window.SpeechRecognition = class {
        constructor() { window.reviewRecognition = this; }
        start() { this.onstart?.(); }
        stop() { this.onend?.(); }
        abort() {}
      };
    }
  }, { account: { username: account.username, token: account.token }, helpSeen, mockSpeech });
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + (list ? '/?list=' + list : '/'), { waitUntil: 'networkidle' });
  return { context, page, errors };
};
const rows = async (account) => (await api('/api/items?list=' + account.username, account.token)).data;

try {
  for (let n = 0; n < 100; n++) {
    if (serverLog.includes('Server listening')) break;
    if (server.exitCode !== null) throw new Error('test server exited ' + serverLog);
    await sleep(50);
  }
  const chromePath = process.env.CHROMIUM_EXECUTABLE_PATH;
  browser = await chromium.launch({ headless: true, ...(chromePath && existsSync(chromePath) ? { executablePath: chromePath } : {}), args: ['--no-sandbox', '--disable-dev-shm-usage'] });

  await probe('token_lifecycle_after_password_change_and_account_recreation', async () => {
    const account = await register('audit_session');
    const replacement = randomUUID();
    const changed = await api('/api/auth/password', account.token, 'POST', { currentPassword: account.password, newPassword: replacement });
    const oldAfterChange = await api('/api/lists', account.token);
    const deleted = await api('/api/auth/account', changed.data.token, 'DELETE', { password: replacement });
    const oldAfterDelete = await api('/api/lists', account.token);
    const recreated = await register(account.username);
    await seedItem(recreated, 'PRIVATE_NEW_ACCOUNT_FIXTURE');
    const oldReadsNew = await rows(account);
    assert.equal(oldAfterChange.status, 401); assert.equal(oldAfterDelete.status, 401); assert.equal(Array.isArray(oldReadsNew), false);
    return { password_change_status: changed.status, old_token_after_change: oldAfterChange.status, deletion_status: deleted.status, old_token_after_delete: oldAfterDelete.status, old_token_reads_new_accounts_item: Array.isArray(oldReadsNew) && oldReadsNew.some(x => x.name === 'PRIVATE_NEW_ACCOUNT_FIXTURE') };
  });

  const phone = await register('audit_phone');
  await api('/api/lists/' + phone.username, phone.token, 'PATCH', { name: 'Продукты' });
  for (const [name, count, fields] of [
    ['Молоко безлактозное', 2, { unit: 'l', note: 'В красной пачке' }],
    ['Хлеб бородинский', 1, {}], ['Яйца', 2, { unit: 'pack' }], ['Помидоры черри', 0.5, { unit: 'kg' }],
    ['Сыр', 250, { unit: 'g' }], ['Кофе в зёрнах', 1, { unit: 'pack' }],
  ]) await seedItem(phone, name, count, fields);
  await probe('mobile_layout_first_visit_and_regular_list', async () => {
    const fresh = await openAccount(phone, { helpSeen: false });
    await fresh.page.screenshot({ path: screenshot('first-visit-390.png') });
    assert.equal(await fresh.page.getByRole('dialog').count(), 0);
    const help = { inlineIntro: await fresh.page.getByRole('note').isVisible() };
    assert.equal(help.inlineIntro, true);
    await fresh.context.close();
    const { context, page, errors } = await openAccount(phone);
    await page.screenshot({ path: screenshot('list-390.png') });
    const geometry = await page.evaluate(() => ({ viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, firstItemY: document.querySelector('button[aria-label^="Отметить купленным"]')?.getBoundingClientRect().top, firstItemTextWidth: document.querySelector('[class*="itemName"]')?.getBoundingClientRect().width, rowHeight: document.querySelector('[class*="itemSlot"]')?.getBoundingClientRect().height }));
    await page.setViewportSize({ width: 320, height: 740 });
    await page.screenshot({ path: screenshot('list-320.png') });
    const narrow = await page.evaluate(() => ({ viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, firstItemTextWidth: document.querySelector('[class*="itemName"]')?.getBoundingClientRect().width, firstItemTextHeight: document.querySelector('[class*="itemName"]')?.getBoundingClientRect().height, rowHeight: document.querySelector('[class*="itemSlot"]')?.getBoundingClientRect().height }));
    await page.getByRole('button', { name: /^Изменить: / }).first().click();
    await page.screenshot({ path: screenshot('editor-320.png') });
    const editorOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    await context.close();
    assert.ok(narrow.firstItemTextWidth > 130); assert.ok(narrow.rowHeight < 130); assert.equal(narrow.scrollWidth, 320); assert.equal(editorOverflow, false); assert.deepEqual(errors, []);
    return { help, geometry, narrow, editorOverflow, pageErrors: errors };
  });

  await probe('compact_controls_reorder_and_bottom_composer', async () => {
    const account = await register('compact');
    for (let n = 0; n < 18; n++) await seedItem(account, 'Покупка ' + n);
    const {context, page} = await openAccount(account, {width:320});
    assert.equal(await page.getByRole('button', {name:/^Переместить:/}).count(),0);
    assert.equal(await page.getByRole('button', {name:/^Ещё один:/}).count(),0);
    const before = (await rows(account)).filter(item => !item.bought).map(item => item.id);
    await page.getByRole('button', {name:'Действия со списком',exact:true}).click();
    await page.getByRole('button', {name:'Изменить порядок',exact:true}).click();
    const grip = page.locator('button[data-no-swipe]').first();
    await grip.focus(); await grip.press('ArrowDown');
    await sleep(200);
    assert.deepEqual((await rows(account)).map(item => item.id).slice(0,2),[before[1],before[0]]);
    await page.getByRole('button',{name:'Готово',exact:true}).click();
    await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
    const geometry = await page.locator('[class*="composer"]').evaluate(el => ({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom,height:innerHeight}));
    assert.ok(Math.abs(geometry.bottom-geometry.height)<2);
    await page.getByRole('textbox',{name:'Добавить вручную…'}).fill('5 яблок');
    await page.getByRole('button',{name:'Добавить',exact:true}).click();
    await sleep(200);
    assert.equal((await rows(account)).find(item => item.name==='яблок')?.count,5);
    await page.screenshot({path:screenshot('composer-long-list-320.png')});
    await context.close();
    return {keyboardReorder:true,bottomComposer:geometry,manualAdd:true};
  });

  await probe('lost_quantity_response_applies_once', async () => {
    const account = await register('audit_replay');
    await seedItem(account, 'молоко');
    const { context, page } = await openAccount(account);
    let countRequests = 0;
    await page.route('**/api/items/*/count', async route => {
      countRequests++;
      if (countRequests === 1) { await route.fetch(); await route.abort('failed'); }
      else await route.continue();
    });
    await page.getByRole('button', { name: 'Количество: молоко', exact: true }).click();
    await page.getByRole('button', { name: 'Ещё один: молоко', exact: true }).click();
    await sleep(2200);
    const state = await rows(account);
    await context.close();
    assert.equal(state[0].count, 2); assert.ok(countRequests >= 2);
    return { requestsForOneTap: countRequests, expectedCount: 2, actualCount: state[0].count };
  });

  await probe('manual_quantity_entry_and_swipe_from_product_name', async () => {
    const account = await register('audit_inputs');
    const { context, page } = await openAccount(account);
    await page.getByRole('textbox', { name: 'Добавить вручную…' }).fill('2 молока');
    await page.getByRole('button', { name: 'Добавить', exact: true }).click();
    await sleep(250);
    const manual = (await rows(account))[0];
    const target = page.getByRole('checkbox', { name: 'Отметить купленным: молока', exact: true });
    const rect = await target.boundingBox();
    const cdp = await context.newCDPSession(page);
    const y = rect.y + rect.height / 2;
    const x = rect.x + 40;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let step = 1; step <= 8; step++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + step * 18, y }] }); await sleep(16); }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(250);
    const afterSwipe = (await rows(account))[0];
    await context.close();
    assert.equal(manual.count, 2); assert.equal(manual.name, 'молока'); assert.equal(afterSwipe.bought, true);
    return { typed: '2 молока', storedName: manual.name, storedCount: manual.count, swipeDistance: 144, boughtAfterSwipe: afterSwipe.bought };
  });

  await probe('undo_toast_restores_its_own_action', async () => {
    const account = await register('audit_undo');
    await seedItem(account, 'молоко');
    await seedItem(account, 'хлеб');
    const { context, page } = await openAccount(account);
    await page.getByRole('button', { name: /^Изменить: / }).first().click();
    await page.getByRole('dialog').getByRole('button', { name: 'Удалить: молоко', exact: true }).click();
    await page.getByRole('button', { name: 'Количество: хлеб', exact: true }).click();
    await page.getByRole('button', { name: 'Ещё один: хлеб', exact: true }).click();
    await page.getByRole('button', { name: 'Вернуть', exact: true }).click();
    await sleep(250);
    const state = await rows(account);
    await context.close();
    assert.ok(state.some(x => x.name === 'молоко')); assert.equal(state.find(x => x.name === 'хлеб')?.count, 2);
    return { milkRestored: state.some(x => x.name === 'молоко'), breadCount: state.find(x => x.name === 'хлеб')?.count };
  });

  await probe('wrong_current_password_keeps_session', async () => {
    const account = await register('audit_password');
    const { context, page } = await openAccount(account);
    await page.getByRole('button', { name: 'Действия со списком', exact: true }).click();
    await page.getByRole('button', { name: 'Настройки', exact: true }).click();
    await page.getByPlaceholder('Текущий пароль', { exact: true }).fill('wrong-password');
    await page.getByPlaceholder('Новый пароль', { exact: true }).fill('new-password-fixture');
    await page.getByRole('button', { name: 'Сохранить', exact: true }).click();
    await sleep(300);
    const loggedOut = await page.evaluate(() => !localStorage.getItem('token'));
    const loginVisible = await page.getByRole('button', { name: 'Войти', exact: true }).isVisible();
    await context.close();
    assert.equal(loggedOut, false); assert.equal(loginVisible, false);
    return { loggedOut, loginVisible };
  });

  await probe('offline_pwa_preserves_items_and_catalog', async () => {
    const account = await register('audit_offline');
    await seedItem(account, 'молоко');
    await api('/api/lists', account.token, 'POST', { name: 'Дача' });
    const { context, page } = await openAccount(account, { serviceWorkers: 'allow' });
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload({ waitUntil: 'networkidle' });
    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByRole('checkbox', { name: 'Отметить купленным: молоко', exact: true }).waitFor();
    await page.getByRole('button', { name: /^Выбрать список:/ }).click();
    const listCount = await page.getByRole('dialog').locator('li').count();
    await page.screenshot({ path: screenshot('offline-lists-390.png') });
    await context.close();
    assert.equal(listCount, 2);
    return { cachedItemsVisible: true, expectedListCount: 2, actualListCount: listCount };
  });

  await probe('ambiguous_voice_delete_requires_choice', async () => {
    const account = await register('audit_voice');
    await seedItem(account, 'молоко обычное');
    await seedItem(account, 'молоко безлактозное');
    const { context, page } = await openAccount(account);
    await page.getByRole('button', { name: '🎤 Говорить', exact: true }).click();
    await page.evaluate(() => window.reviewRecognition.onresult({ resultIndex: 0, results: [{ isFinal: true, 0: { transcript: 'удали молоко' } }] }));
    await sleep(900);
    const state = await rows(account);
    const choiceShown = await page.getByRole('dialog').count();
    await context.close();
    assert.equal(state.length, 2); assert.equal(choiceShown, 1);
    return { rowsBefore: 2, rowsAfter: state.length, remainingNames: state.map(x => x.name), choiceShown };
  });

  await probe('offline_clear_preserves_later_purchases', async () => {
    const account = await register('audit_clear');
    await seedItem(account, 'молоко', 1, { bought: true });
    const bread = await seedItem(account, 'хлеб');
    const { context, page } = await openAccount(account);
    await context.setOffline(true);
    await page.getByRole('button', { name: 'Очистить купленное', exact: true }).click();
    await api('/api/items/' + bread.id + '/bought', account.token, 'PATCH', { list: account.username, bought: true });
    await context.setOffline(false);
    await sleep(800);
    const state = await rows(account);
    await context.close();
    assert.ok(state.some(x => x.id === bread.id));
    return { laterCollaboratorItemStillPresent: state.some(x => x.id === bread.id), remainingItems: state.length };
  });

  await probe('revoked_member_leaves_realtime_room', async () => {
    const owner = await register('audit_owner');
    const member = await register('audit_member');
    const invite = await api('/api/lists/share?list=' + owner.username, owner.token);
    await api('/api/lists/join', member.token, 'POST', { token: invite.data.token });
    const socket = io(base, { auth: { token: member.token }, transports: ['websocket'] });
    await new Promise((resolve, reject) => { socket.on('connect', resolve); socket.on('connect_error', reject); });
    let revoked = false;
    const events = [];
    socket.on('presence', x => { if (revoked) events.push({ type: 'presence', members: x }); });
    socket.on('list_updated', () => { if (revoked) events.push({ type: 'list_updated' }); });
    socket.emit('join_list', { list: owner.username });
    await sleep(100);
    await api('/api/lists/members', owner.token, 'DELETE', { list: owner.username, member: member.username });
    revoked = true;
    const ownerSocket = io(base, { auth: { token: owner.token }, transports: ['websocket'] });
    await new Promise((resolve, reject) => { ownerSocket.on('connect', resolve); ownerSocket.on('connect_error', reject); });
    ownerSocket.emit('join_list', { list: owner.username });
    await seedItem(owner, 'fixture');
    await sleep(200);
    const rest = await api('/api/items?list=' + owner.username, member.token);
    socket.disconnect(); ownerSocket.disconnect();
    assert.equal(rest.status, 403); assert.deepEqual(events, []);
    return { restAfterRevocation: rest.status, receivedEventTypesAfterRevocation: events.map(x => x.type), receivesOwnerPresence: events.some(x => x.members?.includes(owner.username)) };
  });
  await probe('collaborator_receives_item_and_catalog_changes', async () => {
    const owner = await register('extra_owner');
    const member = await register('extra_member');
    const invite = await api('/api/lists/share?list=' + owner.username, owner.token);
    await api('/api/lists/join', member.token, 'POST', { token: invite.data.token });
    const { context, page } = await openAccount(member, { list: owner.username });
    await seedItem(owner, 'синхронизация');
    await page.getByRole('checkbox', { name: 'Отметить купленным: синхронизация', exact: true }).waitFor();
    await api('/api/lists/' + owner.username, owner.token, 'PATCH', { name: 'Новое название' });
    await sleep(350);
    const visibleTitle = (await page.locator('h1').innerText()).replace(/\s*⌄$/, '');
    await context.close();
    assert.equal(visibleTitle, 'Новое название');
    return { liveItemAppeared: true, expectedTitle: 'Новое название', visibleTitle };
  });

  await probe('popup_tab_receives_other_tabs_changes', async () => {
    const account = await register('extra_tabs');
    await seedItem(account, 'молоко', 5);
    const { context, page } = await openAccount(account);
    const popupPromise = page.waitForEvent('popup');
    await page.evaluate(() => window.open('/', '_blank'));
    const popup = await popupPromise;
    await popup.waitForLoadState('networkidle');
    const clientIds = [];
    context.on('request', request => { if (request.method() === 'PATCH') clientIds.push(request.headers()['x-client-id']); });
    await page.getByRole('button', { name: 'Количество: молоко', exact: true }).click();
    await page.getByRole('button', { name: 'Ещё один: молоко', exact: true }).click();
    await sleep(400);
    const serverCount = (await rows(account))[0].count;
    const popupCount = await popup.locator('[class*="itemCount"]').first().innerText();
    await popup.getByRole('button', { name: 'Количество: молоко', exact: true }).click();
    await popup.getByRole('button', { name: 'Ещё один: молоко', exact: true }).click();
    await sleep(400);
    assert.equal(new Set(clientIds).size, 2);
    assert.equal((await rows(account))[0].count, 7);
    await context.close();
    assert.equal(serverCount, 6); assert.ok(popupCount.includes('6'));
    return { serverCount, popupCount, clientIds: clientIds.length };
  });

  await probe('rapid_toggles_keep_user_order', async () => {
    const account = await register('extra_order');
    await seedItem(account, 'молоко');
    const { context, page } = await openAccount(account);
    let held;
    let count = 0;
    const arrived = new Promise(resolve => { held = resolve; });
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    await page.route('**/api/items/*/bought', async route => {
      count++;
      if (count === 1) { held(); await gate; }
      await route.continue();
    });
    await page.getByRole('checkbox', { name: 'Отметить купленным: молоко', exact: true }).click();
    await arrived;
    await page.getByRole('button', { name: /^Куплено ·/ }).click();
    await page.getByRole('checkbox', { name: 'Вернуть в список: молоко', exact: true }).click();
    await sleep(150);
    release();
    await sleep(350);
    const serverBought = (await rows(account))[0].bought;
    const shownActive = await page.getByRole('checkbox', { name: 'Отметить купленным: молоко', exact: true }).isVisible();
    await context.close();
    assert.equal(serverBought, false); assert.equal(shownActive, true); assert.equal(count, 2);
    return { finalUserIntent: false, serverBought, shownActive, requests: count };
  });

  await probe('rejected_editor_save_preserves_draft', async () => {
    const account = await register('extra_editor');
    await seedItem(account, 'молоко', 1, { note: 'старая заметка' });
    const { context, page } = await openAccount(account);
    await page.route('**/api/items/*', route => route.request().method() === 'PATCH' ? route.fulfill({ status: 409, contentType: 'application/json', body: JSON.stringify({ error: 'temporary failure' }) }) : route.continue());
    await page.getByRole('button', { name: /^Изменить: / }).click();
    await page.getByRole('textbox', { name: 'Заметка: какой именно' }).fill('новая заметка');
    await page.getByRole('button', { name: 'Сохранить', exact: true }).click();
    await sleep(300);
    const dialogCount = await page.getByRole('dialog').count();
    const body = await page.locator('body').innerText();
    const state = (await rows(account))[0];
    const failureMessageVisible = /не удалось|ошибка|пошло не так/i.test(body);
    assert.equal(dialogCount, 1); assert.equal(await page.getByRole('textbox', { name: 'Заметка: какой именно' }).inputValue(), 'новая заметка'); assert.ok(failureMessageVisible);
    await context.close();
    return { dialogCount, savedNote: state.note, newDraftVisible: true, failureMessageVisible: /не удалось|ошибка|пошло не так/i.test(body) };
  });

  await probe('rejected_manual_add_preserves_draft', async () => {
    const account = await register('extra_draft');
    const { context, page } = await openAccount(account);
    await page.route('**/api/items', route => route.request().method() === 'POST' ? route.fulfill({ status: 409, contentType: 'application/json', body: JSON.stringify({ error: 'temporary failure' }) }) : route.continue());
    await page.getByRole('textbox', { name: 'Добавить вручную…' }).fill('длинное название покупки');
    await page.getByRole('button', { name: 'Добавить', exact: true }).click();
    await sleep(300);
    const draft = await page.getByRole('textbox', { name: 'Добавить вручную…' }).inputValue();
    const count = (await rows(account)).length;
    await context.close();
    assert.equal(draft, 'длинное название покупки'); assert.equal(count, 0);
    return { inputAfterFailure: draft, savedItems: count };
  });
  await probe('two_tabs_replay_offline_changes_once', async () => {
    const account = await register('parallel_queue');
    await seedItem(account, 'молоко');
    const { context, page } = await openAccount(account);
    const other = await context.newPage();
    await other.goto(base, { waitUntil: 'networkidle' });
    await context.setOffline(true);
    await page.getByRole('button', { name: 'Количество: молоко', exact: true }).click();
    await page.getByRole('button', { name: 'Ещё один: молоко', exact: true }).click();
    await other.getByRole('button', { name: 'Количество: молоко', exact: true }).click();
    await other.getByRole('button', { name: 'Ещё один: молоко', exact: true }).click();
    const count = await page.evaluate(() => Object.keys(localStorage).filter(key => key.startsWith('mutation_v3:')).length);
    assert.equal(count, 2);
    await context.setOffline(false);
    await sleep(1800);
    assert.equal((await rows(account))[0].count, 3);
    assert.equal(await page.evaluate(() => Object.keys(localStorage).filter(key => key.startsWith('mutation_v3:')).length), 0);
    await context.close();
    return { queued: count, finalCount: 3 };
  });

  await probe('password_change_keeps_current_browser_authenticated', async () => {
    const account = await register('password_success');
    const { context, page } = await openAccount(account);
    await page.getByRole('button', { name: 'Действия со списком', exact: true }).click();
    await page.getByRole('button', { name: 'Настройки', exact: true }).click();
    await page.getByPlaceholder('Текущий пароль', { exact: true }).fill(account.password);
    await page.getByPlaceholder('Новый пароль', { exact: true }).fill('updated-fixture-password');
    await page.getByRole('button', { name: 'Сохранить', exact: true }).click();
    await sleep(2000);
    const token = await page.evaluate(() => localStorage.getItem('token'));
    assert.ok(token);
    assert.equal((await api('/api/lists', token)).status, 200);
    assert.equal((await api('/api/lists', account.token)).status, 401);
    assert.equal(await page.getByRole('button', { name: 'Войти', exact: true }).isVisible(), false);
    await context.close();
    return { currentSessionUsable: true, oldTokenRejected: true };
  });

  await probe('push_subscription_covers_multiple_lists', async () => {
    // Synthetic endpoint on empty lists: this test sends no push messages.
    const account = await register('push_multiple');
    const second = await api('/api/lists', account.token, 'POST', { name: 'Дача' });
    const subscription = { endpoint: 'https://example.invalid/test-' + randomUUID(), keys: { p256dh: 'fixture', auth: 'fixture' } };
    for (const list of [account.username, second.data.id]) {
      assert.equal((await api('/api/push/subscribe', account.token, 'POST', { list, subscription })).status, 201);
    }
    const endpoint = encodeURIComponent(subscription.endpoint);
    let status = await api('/api/push/status?endpoint=' + endpoint, account.token);
    assert.equal(status.data.lists.length, 2);
    await api('/api/push/subscribe', account.token, 'DELETE', { endpoint: subscription.endpoint, list: account.username });
    status = await api('/api/push/status?endpoint=' + endpoint, account.token);
    assert.deepEqual(status.data.lists, [second.data.id]);
    return { subscribedLists: 2, remainingAfterDisablingOne: 1 };
  });
} finally {
  writeFileSync(path.join(artifactDir, 'browser-results.json'), JSON.stringify(results, null, 2));
  await browser?.close();
  server.kill('SIGTERM');
  await Promise.race([new Promise(resolve => server.once('exit', resolve)), sleep(6000)]);
  if (server.exitCode === null) server.kill('SIGKILL');
  writeFileSync(path.join(artifactDir, 'browser-server.log'), serverLog);
  rmSync(dataDir, { recursive: true, force: true });
  console.log(`Browser artifacts: ${artifactDir}`);
  if (results.some(result => result.probe_error)) process.exitCode = 1;
}
