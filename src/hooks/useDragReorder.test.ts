import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useDragReorder } from './useDragReorder';

// Rows are 50px tall and stacked from the top of the document, so row i covers
// [50i, 50i + 50) and its midpoint sits at 50i + 25.
const ROW_HEIGHT = 50;

const fakeRow = (index: number) => {
  const node = document.createElement('div');
  node.getBoundingClientRect = () =>
    ({ top: index * ROW_HEIGHT, height: ROW_HEIGHT, bottom: (index + 1) * ROW_HEIGHT }) as DOMRect;
  return node;
};

/** The bits of a React pointer event that startDrag actually reads. */
const pointerDown = (clientY: number) =>
  ({
    pointerId: 1,
    pointerType: 'touch',
    button: 0,
    clientY,
    preventDefault: () => {},
    currentTarget: { setPointerCapture: () => {} },
  }) as unknown as React.PointerEvent;

const movePointer = (clientY: number) =>
  window.dispatchEvent(
    Object.assign(new Event('pointermove', { cancelable: true }), { pointerId: 1, clientY }),
  );

const releasePointer = (clientY: number) =>
  window.dispatchEvent(Object.assign(new Event('pointerup'), { pointerId: 1, clientY }));

const setup = (ids: string[]) => {
  const onCommit = vi.fn();
  const view = renderHook(({ list }) => useDragReorder(list, onCommit), {
    initialProps: { list: ids },
  });
  act(() => {
    ids.forEach((id, i) => view.result.current.registerRow(id, fakeRow(i)));
  });
  return { onCommit, view };
};

/** Drags the row at `from` until its centre reaches `toCentre` and lets go. */
const drag = (view: ReturnType<typeof setup>['view'], id: string, from: number, toCentre: number) => {
  const grabbedAt = from * ROW_HEIGHT + ROW_HEIGHT / 2;
  act(() => view.result.current.startDrag(id, pointerDown(grabbedAt)));
  act(() => {
    movePointer(toCentre);
  });
  act(() => {
    releasePointer(toCentre);
  });
};

beforeEach(() => {
  window.scrollTo(0, 0);
});

describe('useDragReorder', () => {
  it('moves a row down to where it was dropped', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    // Past the midpoint of row c (125) → lands after it.
    drag(view, 'a', 0, 140);
    expect(onCommit).toHaveBeenCalledWith(['b', 'c', 'a']);
  });

  it('moves a row up', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    drag(view, 'c', 2, 10);
    expect(onCommit).toHaveBeenCalledWith(['c', 'a', 'b']);
  });

  it('commits nothing when the row is put back where it came from', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    drag(view, 'b', 1, 60);
    expect(onCommit).not.toHaveBeenCalled();
  });

  it('commits nothing for a drag too small to cross a neighbour', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    // Ten pixels is a twitch, not an intention.
    drag(view, 'a', 0, 35);
    expect(onCommit).not.toHaveBeenCalled();
  });

  it('marks where the row would land while it is in the air', () => {
    const { view } = setup(['a', 'b', 'c']);
    act(() => view.result.current.startDrag('a', pointerDown(25)));
    expect(view.result.current.dragId).toBe('a');

    act(() => {
      movePointer(140);
    });
    expect(view.result.current.dropIndex).toBe(3);

    // Back over its own slot there is nothing to mark.
    act(() => {
      movePointer(25);
    });
    expect(view.result.current.dropIndex).toBeNull();

    act(() => {
      releasePointer(25);
    });
    expect(view.result.current.dragId).toBeNull();
  });

  it('abandons the drag on Escape without reordering', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    act(() => view.result.current.startDrag('a', pointerDown(25)));
    act(() => {
      movePointer(140);
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(onCommit).not.toHaveBeenCalled();
    expect(view.result.current.dragId).toBeNull();

    // The pointer coming up afterwards must not resurrect the abandoned drag.
    act(() => {
      releasePointer(140);
    });
    expect(onCommit).not.toHaveBeenCalled();
  });

  it('ignores a right-click', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    const rightClick = { ...pointerDown(25), pointerType: 'mouse', button: 2 } as React.PointerEvent;
    act(() => view.result.current.startDrag('a', rightClick));
    expect(view.result.current.dragId).toBeNull();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it('reorders with the arrow keys for anyone not using a touchscreen', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    act(() => view.result.current.moveByKeyboard('c', -1));
    expect(onCommit).toHaveBeenCalledWith(['a', 'c', 'b']);

    onCommit.mockClear();
    act(() => view.result.current.moveByKeyboard('a', -1));
    expect(onCommit).not.toHaveBeenCalled(); // already at the top
  });

  it('drags against the order it is currently given, not the one at mount', () => {
    const { onCommit, view } = setup(['a', 'b', 'c']);
    act(() => {
      view.rerender({ list: ['c', 'b', 'a'] });
      ['c', 'b', 'a'].forEach((id, i) => view.result.current.registerRow(id, fakeRow(i)));
    });
    drag(view, 'c', 0, 140);
    expect(onCommit).toHaveBeenCalledWith(['b', 'a', 'c']);
  });
});
