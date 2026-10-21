import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import App from './App';

// The socket is a live connection; in a test it would only add noise.
vi.mock('socket.io-client', () => ({
  io: () => ({ on: () => {}, emit: () => {}, disconnect: () => {} }),
}));

type Handler = (url: string, init?: RequestInit) => unknown;

const json = (data: unknown) => ({
  ok: true,
  status: 200,
  headers: new Headers(),
  json: async () => data,
});

const lists = [{ id: 'ann', name: 'ann', owner: 'ann', owned: true, members: [] }];

const items = [
  { id: 'a', name: 'молоко', note: null, count: 2, list_id: 'ann', bought: false, bought_at: null },
  { id: 'b', name: 'хлеб', note: null, count: 1, list_id: 'ann', bought: true, bought_at: 5 },
];

const routes: Record<string, Handler> = {
  '/api/lists': () => lists,
  '/api/items': () => items,
  '/api/items/sync': () => ({version:0,items}),
  '/api/items/suggestions': () => [],
  '/api/items/deleted': () => [
    { id: 'c', name: 'кефир', note: null, count: 1, list_id: 'ann', bought: false, deleted_at: 9 },
  ],
};

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  // react-hot-toast asks the browser about reduced motion on mount.
  vi.stubGlobal(
    'matchMedia',
    () => ({ matches: false, addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {} }),
  );
  localStorage.clear();
  localStorage.setItem('username', 'ann');
  localStorage.setItem('token', 'token');
  // The first visit shows an introduction; this suite is about the list.
  localStorage.setItem('help_seen_v1', '1');

  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string) => {
      const path = new URL(input, 'http://localhost').pathname;
      const handler = routes[path];
      return json(handler ? handler(input) : { success: true });
    }),
  );
});

afterEach(() => {
  window.history.replaceState({}, '', '/');
  vi.unstubAllGlobals();
});

describe('guest invitation', () => {
  const invite = 'a'.repeat(24);
  const preview = { name: 'На выходные', items: items.map((item) => ({ ...item, note: 'В красной пачке' })) };

  beforeEach(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.history.replaceState({}, '', `/?join=${invite}`);
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      const path = new URL(String(input), 'http://localhost').pathname;
      if (path === '/api/guest/list') return json(preview) as Response;
      if (path === '/api/auth/register' || path === '/api/auth/login') {
        return json({ username: 'ann', token: 'new-token' }) as Response;
      }
      if (path === '/api/lists/join') return json({ list: 'weekend', name: preview.name }) as Response;
      return json(routes[path]?.(String(input), init) ?? { success: true }) as Response;
    });
  });

  it('opens an invite without logging in or granting editing access', async () => {
    render(<App />);
    await screen.findByRole('heading', { name: preview.name });
    expect(screen.getByText('Гостевой режим · Только просмотр')).toBeTruthy();
    expect(screen.getByText('Зарегистрируйтесь, чтобы разблокировать весь функционал')).toBeTruthy();
    expect(screen.getByText('×2')).toBeTruthy();
    expect(screen.getAllByText('В красной пачке')).toHaveLength(2);
    const rows = screen.getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(within(row).queryByRole('button')).toBeNull();
      fireEvent.click(row);
      fireEvent.touchStart(row, { touches: [{ clientX: 200, clientY: 20 }] });
      fireEvent.touchEnd(row, { changedTouches: [{ clientX: 0, clientY: 20 }] });
    }
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByText('Удалённое')).toBeNull();
    expect(vi.mocked(fetch).mock.calls.every(([url, init]) =>
      String(url) === `/api/guest/list?token=${invite}` && init?.method === 'GET',
    )).toBe(true);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it.each([
    ['Зарегистрироваться', 'Регистрация', '/api/auth/register', 'new-password'],
    ['Войти', 'Войти', '/api/auth/login', 'current-password'],
  ])('continues from %s into the same shared list', async (cta, submit, endpoint, autocomplete) => {
    render(<App />);
    await screen.findByText('молоко');
    fireEvent.click(screen.getByRole('button', { name: cta }));
    expect(screen.getByLabelText('Пароль').getAttribute('autocomplete')).toBe(autocomplete);
    fireEvent.change(screen.getByLabelText('Имя пользователя'), { target: { value: 'ann' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: submit }).closest('form')!);
    await waitFor(() => expect(window.location.search).toBe('?list=weekend'));
    expect(vi.mocked(fetch).mock.calls.some(([url]) => url === endpoint)).toBe(true);
    const join = vi.mocked(fetch).mock.calls.find(([url]) => url === '/api/lists/join');
    expect(JSON.parse(join![1]!.body as string)).toEqual({ token: invite });
    expect(join![1]!.headers).toMatchObject({ Authorization: 'Bearer new-token' });
    expect(screen.queryByText('Гостевой режим · Только просмотр')).toBeNull();
    expect(await screen.findByPlaceholderText('Добавить вручную…')).toBeTruthy();
  });

  it('can return from registration to the preview without losing the invite', async () => {
    render(<App />);
    await screen.findByText('молоко');
    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));
    fireEvent.click(screen.getByRole('button', { name: '← Вернуться к просмотру списка' }));
    expect(await screen.findByText('молоко')).toBeTruthy();
    expect(window.location.search).toBe(`?join=${invite}`);
    expect(vi.mocked(fetch).mock.calls.some(([url]) => url === '/api/lists/join')).toBe(false);
  });

  it('preserves the invitation when a stored session expires during joining', async () => {
    localStorage.setItem('username', 'ann');
    localStorage.setItem('token', 'expired');
    const respond = vi.mocked(fetch).getMockImplementation()!;
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      if (String(input) === '/api/lists/join') {
        return { ...json({ error: 'Invalid token' }), ok: false, status: 401 } as Response;
      }
      return respond(input, init);
    });
    render(<App />);
    expect(await screen.findByText('Гостевой режим · Только просмотр')).toBeTruthy();
    expect(await screen.findByText('молоко')).toBeTruthy();
    expect(window.location.search).toBe(`?join=${invite}`);
    expect(localStorage.getItem('token')).toBeNull();
  });
});

describe('App', () => {
  it('renders the stored session straight into the list', async () => {
    render(<App />);
    expect(await screen.findByText('молоко')).toBeTruthy();
    expect(screen.getByText('×2')).toBeTruthy();
    // Bought items keep their own section.
    expect(screen.getByText('хлеб')).toBeTruthy();
  });

  it('offers the guide as a button labelled in words, not a lone icon', async () => {
    render(<App />);
    await screen.findByText('молоко');

    // It used to be a bare "?" sixth in a row of header icons, which on a phone
    // was pushed off the edge of the screen entirely.
    fireEvent.click(screen.getByRole('button', { name: 'Действия со списком' }));
    const guide = screen.getByRole('button', { name: /Как пользоваться/ });
    expect(guide.textContent).toContain('Как пользоваться');

    fireEvent.click(guide);
    const sheet = await screen.findByRole('dialog', { name: 'Как пользоваться' });
    expect(sheet).toBeTruthy();

    // The guide has to describe what the app actually does now, so the things
    // most recently changed are the ones worth asserting.
    expect(sheet.textContent).toContain('дальше');
    expect(sheet.textContent).toContain('молоко 4 хлеб 2');
    expect(sheet.textContent).toContain('Изменить порядок');
    expect(sheet.textContent).toContain('Escape');
    expect(sheet.textContent).not.toContain('⠿');
  });

  it('offers a short introduction without hiding the first list', async () => {
    localStorage.removeItem('help_seen_v1');
    render(<App />);
    expect(await screen.findByRole('note')).toBeTruthy();
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Понятно' }));
    expect(screen.queryByRole('note')).toBeNull();
  });

  it('shows the deleted drawer only once it is opened', async () => {
    render(<App />);
    await screen.findByText('молоко');
    expect(screen.queryByText('кефир')).toBeNull();

    // jsdom does not open a <details> from a summary click, so drive the state
    // change the browser would have made.
    const drawer = document.querySelector('details')!;
    drawer.open = true;
    fireEvent(drawer, new Event('toggle'));

    expect(await screen.findByText('кефир')).toBeTruthy();
  });

  it('lets a new list be created from the lists panel', async () => {
    render(<App />);
    await screen.findByText('молоко');

    fireEvent.click(screen.getByRole('button', { name: /^Выбрать список:/ }));
    const dialog = await screen.findByRole('dialog', { name: 'Мои списки' });
    expect(dialog).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Название нового списка'), {
      target: { value: 'Дача' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Создать' }));

    await waitFor(() => {
      const calls = (fetch as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls;
      const created = calls.find(
        ([url, init]) => url === '/api/lists' && init?.method === 'POST',
      );
      expect(created?.[1]?.body).toBe(JSON.stringify({ name: 'Дача' }));
    });
  });
});
