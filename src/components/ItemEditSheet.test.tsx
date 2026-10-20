import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ItemEditSheet } from './ItemEditSheet';
import type { Item } from '../api/items';

vi.mock('../utils/feedback', () => ({ cue: vi.fn() }));

class FakeRecognition {
  static last: FakeRecognition;
  continuous = false;
  interimResults = false;
  lang = '';
  onresult: ((event: unknown) => void) | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  onend: (() => void) | null = null;
  start = vi.fn();
  stop = vi.fn();
  abort = vi.fn();
  constructor() { FakeRecognition.last = this; }
  say(text: string, final = false) {
    this.onresult?.({ resultIndex: 0, results: [{ isFinal: final, 0: { transcript: text } }] });
  }
}

const item: Item = { id: 'milk', list_id: 'weekend', name: 'Молоко', count: 2, note: 'Безлактозное.', bought: false };
const field = () => screen.getByRole('textbox', { name: 'Заметка: какой именно' }) as HTMLTextAreaElement;
const settle = () => act(async () => { await vi.advanceTimersByTimeAsync(0); });
const setup = (value = item) => {
  const callbacks = { onEdit: vi.fn().mockResolvedValue(true), onRemove: vi.fn(), onClose: vi.fn() };
  const view = render(<ItemEditSheet item={value} focusNote {...callbacks} />);
  return { ...callbacks, ...view };
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('SpeechRecognition', FakeRecognition);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('note editing and dictation', () => {
  it('appends and revises speech as plain text without repeating growing results', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: '🎤 Надиктовать' }));
    const engine = FakeRecognition.last;
    expect(engine.lang).toBe('ru-RU');
    act(() => engine.say('удали'));
    act(() => engine.say('удали хлеб дальше', true));
    expect(field().value).toBe('Безлактозное. удали хлеб дальше');
    expect(field().readOnly).toBe(true);
    act(() => engine.onend?.());
    expect(field().readOnly).toBe(false);
    fireEvent.change(field(), { target: { value: 'Безлактозное. В красной пачке.' } });
    expect(field().value).toBe('Безлактозное. В красной пачке.');
  });

  it('waits for the final result after stop before saving only the note', async () => {
    const { onEdit, onClose } = setup();
    fireEvent.click(screen.getByRole('button', { name: '🎤 Надиктовать' }));
    const engine = FakeRecognition.last;
    act(() => engine.say('в красной'));
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(engine.stop).toHaveBeenCalledOnce();
    expect(onEdit).not.toHaveBeenCalled();
    act(() => { engine.say('в красной пачке', true); engine.onend?.(); });
    await settle();
    expect(onEdit).toHaveBeenCalledExactlyOnceWith('milk', { note: 'Безлактозное. в красной пачке' }, expect.objectContaining({ id: 'milk' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('cancels while waiting for the engine without saving or accepting late results', async () => {
    const { onEdit, onClose } = setup();
    fireEvent.click(screen.getByRole('button', { name: '🎤 Надиктовать' }));
    const engine = FakeRecognition.last;
    const lateResult = engine.onresult!;
    act(() => engine.say('в красной'));
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    fireEvent.click(screen.getByRole('button', { name: 'Отмена' }));
    act(() => lateResult({ resultIndex: 0, results: [{ isFinal: true, 0: { transcript: 'лишнее' } }] }));
    await settle();
    expect(engine.abort).toHaveBeenCalledOnce();
    expect(onEdit).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledOnce();
    expect(field().value).not.toContain('лишнее');
  });

  it('does not truncate overlong speech and requires shortening before saving', async () => {
    const { onEdit } = setup({ ...item, note: null });
    fireEvent.click(screen.getByRole('button', { name: '🎤 Надиктовать' }));
    act(() => { FakeRecognition.last.say('я'.repeat(201), true); FakeRecognition.last.onend?.(); });
    expect(field().value).toHaveLength(201);
    expect(screen.getByRole('alert').textContent).toContain('200');
    expect((screen.getByRole('button', { name: 'Сохранить' }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    await settle();
    expect(onEdit).not.toHaveBeenCalled();
    fireEvent.change(field(), { target: { value: 'Короткая заметка' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    await settle();
    expect(onEdit).toHaveBeenCalledExactlyOnceWith('milk', { note: 'Короткая заметка' }, expect.objectContaining({ id: 'milk' }));
  });

  it('clears a note and leaves unrelated item fields untouched', async () => {
    const { onEdit } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Очистить заметку' }));
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    await settle();
    expect(onEdit).toHaveBeenCalledExactlyOnceWith('milk', { note: '' }, expect.objectContaining({ id: 'milk' }));
  });

  it('allows typing when voice input is unavailable', async () => {
    vi.stubGlobal('SpeechRecognition', undefined);
    vi.stubGlobal('webkitSpeechRecognition', undefined);
    const { onEdit } = setup();
    expect(screen.queryByRole('button', { name: '🎤 Надиктовать' })).toBeNull();
    fireEvent.change(field(), { target: { value: 'Ручная заметка' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    await settle();
    expect(onEdit).toHaveBeenCalledExactlyOnceWith('milk', { note: 'Ручная заметка' }, expect.objectContaining({ id: 'milk' }));
  });

  it('keeps the draft on microphone denial and offers typing', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: '🎤 Надиктовать' }));
    act(() => FakeRecognition.last.onerror?.({ error: 'not-allowed' }));
    expect(screen.getByRole('alert').textContent).toContain('Нет доступа к микрофону');
    expect(field().value).toBe(item.note);
    expect(field().readOnly).toBe(false);
  });

  it('discards on Escape and aborts the microphone on unmount', () => {
    const { onEdit, onClose, unmount } = setup();
    fireEvent.click(screen.getByRole('button', { name: '🎤 Надиктовать' }));
    const engine = FakeRecognition.last;
    fireEvent.keyDown(document, { key: 'Escape' });
    unmount();
    expect(onEdit).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledOnce();
    expect(engine.abort).toHaveBeenCalledOnce();
  });

  it('releases a stalled microphone after a bounded stop wait', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: '🎤 Надиктовать' }));
    const engine = FakeRecognition.last;
    act(() => engine.say('В красной пачке'));
    fireEvent.click(screen.getByRole('button', { name: '⏹ Завершить диктовку' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(3000); });
    expect(engine.abort).toHaveBeenCalledOnce();
    expect(field().readOnly).toBe(false);
    expect(field().value).toContain('В красной пачке');
  });
});


describe('quantity editor', () => {
  it('converts compatible units and saves decimal commas', async () => {
    const { onEdit } = setup({ ...item, count: 500, unit: 'g' });
    fireEvent.change(screen.getByLabelText('Единица'), { target: { value: 'kg' } });
    expect((screen.getByLabelText('Количество') as HTMLInputElement).value).toBe('0.5');
    fireEvent.change(screen.getByLabelText('Количество'), { target: { value: '1,25' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    await settle();
    expect(onEdit).toHaveBeenCalledExactlyOnceWith('milk', { count: 1.25, unit: 'kg' }, expect.objectContaining({ id: 'milk' }));
  });

  it('requires whole pieces and preserves the invalid draft', async () => {
    const { onEdit, onClose } = setup({ ...item, count: 1.5, unit: 'kg' });
    fireEvent.change(screen.getByLabelText('Единица'), { target: { value: 'pcs' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    await settle();
    expect(screen.getByRole('alert').textContent).toContain('целое число');
    expect(onEdit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(screen.getByLabelText('Количество'));
  });
});

describe('saving failures', () => {
  it('keeps the draft visible and permits a retry after a rejected save', async () => {
    const { onEdit, onClose } = setup();
    onEdit.mockResolvedValueOnce(false);
    fireEvent.change(field(), { target: { value: 'Новый черновик' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    await settle();
    expect(field().value).toBe('Новый черновик');
    expect(screen.getByRole('alert').textContent).toContain('Черновик');
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    await settle();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
