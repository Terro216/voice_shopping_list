import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GuestList } from './GuestList';
import { LangProvider, translator, type Lang } from '../i18n';

const respond = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json' },
});
const list = { name: 'Покупки', items: [{ id: 'milk', name: 'Молоко', count: 2, bought: false }] };
const settle = () => act(async () => { await vi.advanceTimersByTimeAsync(0); });
const mount = (lang: Lang = 'ru') => render(
  <LangProvider value={{ lang, t: translator(lang) }}>
    <GuestList token={'a'.repeat(24)} lang={lang} setLang={() => {}} onAuthenticate={() => {}} />
  </LangProvider>,
);

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => respond(list)));
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('guest updates', () => {
  it('refreshes items and clears the preview when the link is revoked', async () => {
    mount();
    await settle();
    expect(screen.getByText('Молоко')).toBeTruthy();
    vi.mocked(fetch).mockResolvedValueOnce(respond({ ...list, items: [{ ...list.items[0], count: 3 }] }));
    await act(async () => { await vi.advanceTimersByTimeAsync(15000); });
    expect(screen.getByText('×3')).toBeTruthy();
    vi.mocked(fetch).mockResolvedValueOnce(respond({ error: 'revoked' }, 404));
    await act(async () => { await vi.advanceTimersByTimeAsync(15000); });
    expect(screen.queryByText('Молоко')).toBeNull();
    expect(screen.getByRole('alert').textContent).toContain('Попросите владельца');
    await act(async () => { await vi.advanceTimersByTimeAsync(60000); });
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('pauses polling in the background and refreshes on returning', async () => {
    mount();
    await settle();
    const visibility = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    fireEvent(document, new Event('visibilitychange'));
    await act(async () => { await vi.advanceTimersByTimeAsync(60000); });
    expect(fetch).toHaveBeenCalledTimes(1);
    visibility.mockReturnValue('visible');
    fireEvent(document, new Event('visibilitychange'));
    await settle();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('shows a retry after a network failure and can recover', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new TypeError('offline'));
    mount();
    await settle();
    expect(screen.getByRole('alert').textContent).toContain('подключение');
    fireEvent.click(screen.getByRole('button', { name: 'Попробовать снова' }));
    await settle();
    expect(screen.getByText('Молоко')).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('does not cache guest reads or send a stored account token and aborts on exit', async () => {
    localStorage.setItem('token', 'unrelated-session');
    const view = mount();
    await settle();
    const options = vi.mocked(fetch).mock.calls[0][1]!;
    expect(options.cache).toBe('no-store');
    expect(options.headers).not.toHaveProperty('Authorization');
    view.unmount();
    expect(options.signal?.aborted).toBe(true);
    await act(async () => { await vi.advanceTimersByTimeAsync(30000); });
    expect(fetch).toHaveBeenCalledTimes(1);
    localStorage.removeItem('token');
  });

  it('offers no editing instructions for an empty list in English', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(respond({ name: 'Weekend', items: [] }));
    mount('en');
    await settle();
    expect(screen.getByText('There are no items in this list yet.')).toBeTruthy();
    expect(screen.getByText('Register to unlock all features')).toBeTruthy();
    expect(screen.queryByRole('list')).toBeNull();
  });
});
