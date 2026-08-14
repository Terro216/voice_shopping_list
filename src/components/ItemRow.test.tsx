import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemRow } from './ItemRow';
import type { Item } from '../api/items';

// jsdom has no pointer capture, and the row asks for it once a swipe commits.
beforeAll(() => {
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
});

const item: Item = {
  id: 'i1',
  name: 'молоко',
  note: null,
  count: 1,
  list_id: 'u',
  bought: false,
  bought_at: null,
};

const setup = () => {
  const handlers = {
    onToggleBought: vi.fn(),
    onIncrement: vi.fn(),
    onDecrement: vi.fn(),
    onEdit: vi.fn(),
    onRemove: vi.fn(),
  };
  const { container } = render(<ItemRow item={item} {...handlers} />);
  // container > .item > .itemSurface — the moving surface is the row's only
  // pointer target, and CSS-module class names are hashed away here.
  const surface = container.firstElementChild!.firstElementChild as HTMLElement;
  return { handlers, surface };
};

/** jsdom reports a zero-width row, so the commit distance is the 72px floor. */
const swipe = (surface: HTMLElement, dx: number, dy = 0) => {
  fireEvent.pointerDown(surface, { pointerId: 1, clientX: 0, clientY: 0, button: 0 });
  fireEvent.pointerMove(surface, { pointerId: 1, clientX: dx / 2, clientY: dy / 2 });
  fireEvent.pointerMove(surface, { pointerId: 1, clientX: dx, clientY: dy });
  fireEvent.pointerUp(surface, { pointerId: 1, clientX: dx, clientY: dy });
};

describe('ItemRow gestures', () => {
  it('checks the item off when swiped far enough to the right', () => {
    const { handlers, surface } = setup();
    swipe(surface, 120);
    expect(handlers.onToggleBought).toHaveBeenCalledWith('i1');
    expect(handlers.onRemove).not.toHaveBeenCalled();
  });

  it('deletes when swiped far enough to the left', () => {
    const { handlers, surface } = setup();
    swipe(surface, -120);
    expect(handlers.onRemove).toHaveBeenCalledWith('i1');
    expect(handlers.onToggleBought).not.toHaveBeenCalled();
  });

  it('does nothing for a short swipe — a nudge is not a decision', () => {
    const { handlers, surface } = setup();
    swipe(surface, 40);
    expect(handlers.onToggleBought).not.toHaveBeenCalled();
    expect(handlers.onRemove).not.toHaveBeenCalled();
  });

  it('ignores a mostly vertical drag, so scrolling never triggers it', () => {
    const { handlers, surface } = setup();
    swipe(surface, 100, 400);
    expect(handlers.onToggleBought).not.toHaveBeenCalled();
    expect(handlers.onRemove).not.toHaveBeenCalled();
  });

  it('leaves the buttons alone: a swipe started on "+" is not a swipe', () => {
    const { handlers } = setup();
    const plus = screen.getByLabelText(/Ещё один|One more/);
    fireEvent.pointerDown(plus, { pointerId: 2, clientX: 0, clientY: 0, button: 0 });
    fireEvent.pointerMove(plus, { pointerId: 2, clientX: 150, clientY: 0 });
    fireEvent.pointerUp(plus, { pointerId: 2, clientX: 150, clientY: 0 });
    expect(handlers.onToggleBought).not.toHaveBeenCalled();
    expect(handlers.onRemove).not.toHaveBeenCalled();
  });

  it('draws the drag grip instead of relying on a font glyph', () => {
    const handlers = {
      onToggleBought: vi.fn(),
      onIncrement: vi.fn(),
      onDecrement: vi.fn(),
      onEdit: vi.fn(),
      onRemove: vi.fn(),
      onDragStart: vi.fn(),
    };
    render(<ItemRow item={item} {...handlers} />);

    // It was the braille character ⠿, which plenty of Android font stacks have
    // no glyph for: the button existed and did nothing visible.
    const grip = screen.getByLabelText(/Переместить|Move/);
    expect(grip.querySelector('svg')).toBeTruthy();
    expect(grip.textContent).toBe('');

    fireEvent.pointerDown(grip, { pointerId: 3, clientY: 0, button: 0 });
    expect(handlers.onDragStart).toHaveBeenCalled();
  });

  it('has no grip where reordering makes no sense', () => {
    const { handlers } = setup(); // rendered without onDragStart
    expect(screen.queryByLabelText(/Переместить|Move/)).toBeNull();
    expect(handlers.onRemove).not.toHaveBeenCalled();
  });

  it('keeps a note when focus leaves the editor', () => {
    const { handlers } = setup();
    fireEvent.click(screen.getByLabelText(/Изменить|^Edit$/));

    const note = screen.getByLabelText(/Заметка|Note:/);
    fireEvent.change(note, { target: { value: 'тот, в красной пачке' } });

    // Tapping the page rather than "Сохранить" is how people leave a form they
    // consider finished; it used to discard the note without a word.
    fireEvent.blur(note, { relatedTarget: null });

    expect(handlers.onEdit).toHaveBeenCalledWith('i1', {
      name: 'молоко',
      note: 'тот, в красной пачке',
    });
    expect(screen.queryByLabelText(/Заметка|Note:/)).toBeNull();
  });

  it('does not save while focus is still moving inside the editor', () => {
    const { handlers } = setup();
    fireEvent.click(screen.getByLabelText(/Изменить|^Edit$/));

    const name = screen.getByLabelText(/Название позиции|Item name/);
    const note = screen.getByLabelText(/Заметка|Note:/);
    fireEvent.blur(name, { relatedTarget: note });

    expect(handlers.onEdit).not.toHaveBeenCalled();
    expect(note).toBeTruthy();
  });

  it('still checks off on a plain tap', () => {
    const { handlers } = setup();
    fireEvent.click(screen.getByLabelText(/Отметить купленным|Mark as bought/));
    expect(handlers.onToggleBought).toHaveBeenCalledWith('i1');
  });
});
