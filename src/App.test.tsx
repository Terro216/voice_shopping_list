import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
  { id: 'a', name: 'молоко', note: null, count: 2, username: 'ann', bought: false, bought_at: null },
  { id: 'b', name: 'хлеб', note: null, count: 1, username: 'ann', bought: true, bought_at: 5 },
];

const routes: Record<string, Handler> = {
  '/api/lists': () => lists,
  '/api/items': () => items,
  '/api/items/suggestions': () => [],
  '/api/items/deleted': () => [
    { id: 'c', name: 'кефир', note: null, count: 1, username: 'ann', bought: false, deleted_at: 9 },
  ],
};

beforeEach(() => {
  // react-hot-toast asks the browser about reduced motion on mount.
  vi.stubGlobal(
    'matchMedia',
    () => ({ matches: false, addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {} }),
  );
  localStorage.clear();
  localStorage.setItem('username', 'ann');
  localStorage.setItem('token', 'token');
  // The first visit opens the instructions; this suite is about the list.
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
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('renders the stored session straight into the list', async () => {
    render(<App />);
    expect(await screen.findByText('молоко')).toBeTruthy();
    expect(screen.getByText('×2')).toBeTruthy();
    // Bought items keep their own section.
    expect(screen.getByText('хлеб')).toBeTruthy();
  });

  it('names the list from the catalog and offers the help button', async () => {
    render(<App />);
    await screen.findByText('молоко');
    expect(screen.getByRole('button', { name: 'Как пользоваться' })).toBeTruthy();
  });

  it('opens the instructions on the very first visit', async () => {
    localStorage.removeItem('help_seen_v1');
    render(<App />);
    expect(await screen.findByRole('dialog', { name: 'Как пользоваться' })).toBeTruthy();
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

    fireEvent.click(screen.getByRole('button', { name: /Списки/ }));
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
