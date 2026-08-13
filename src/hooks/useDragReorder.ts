import { useCallback, useEffect, useRef, useState } from 'react';
import { haptic } from '../utils/feedback';

/**
 * Dragging rows into the order the shop is walked in.
 *
 * Two deliberate choices keep this from firing by accident, which matters more
 * here than anywhere else in the app — the list is operated one-handed, while
 * moving, and a phantom drag silently reshuffles what somebody is reading:
 *
 * - a drag only ever starts from the grip, never from the row itself, so
 *   flicking through a long list can never pick a row up;
 * - the rows that are not being dragged do not move. A drop line marks where
 *   the row will land, so nothing shifts under the finger mid-gesture.
 *
 * Geometry is measured once, at drag start, in page coordinates — that way the
 * edge auto-scroll below cannot invalidate it.
 */

// How close to the edge of the viewport the finger has to get before the page
// starts following it, and how fast it then moves.
const AUTOSCROLL_MARGIN_PX = 72;
const AUTOSCROLL_SPEED_PX = 12;

type Band = { id: string; top: number; height: number };

export const useDragReorder = (ids: string[], onCommit: (ids: string[]) => void) => {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const rows = useRef(new Map<string, HTMLElement>());
  const drag = useRef<{
    id: string;
    pointerId: number;
    startPageY: number;
    pageY: number;
    from: number;
    bands: Band[];
  } | null>(null);
  const autoScroll = useRef<number | undefined>(undefined);

  const idsRef = useRef(ids);
  idsRef.current = ids;

  const registerRow = useCallback((id: string, node: HTMLElement | null) => {
    if (node) rows.current.set(id, node);
    else rows.current.delete(id);
  }, []);

  // Kept outside React state so `finish` reads the value the last move computed
  // rather than one render behind.
  const targetIndexRef = useRef<number | null>(null);

  // Listeners are attached the instant the drag starts rather than from an
  // effect: a quick tap on the grip can deliver pointerup before React has
  // committed the render, and a drag nobody ends leaves a row stuck in the air.
  const listenersRef = useRef<(() => void) | null>(null);

  const finish = useCallback((commit: boolean) => {
    const state = drag.current;
    drag.current = null;
    listenersRef.current?.();
    listenersRef.current = null;
    if (autoScroll.current !== undefined) {
      cancelAnimationFrame(autoScroll.current);
      autoScroll.current = undefined;
    }
    setDragId(null);
    setDragOffset(0);
    setDropIndex(null);
    if (!state) return;

    const target = targetIndexRef.current;
    if (commit && target !== null && target !== state.from) {
      const next = idsRef.current.filter((id) => id !== state.id);
      // `target` counts positions in the original list; removing the dragged row
      // shifts everything after it up by one.
      next.splice(target > state.from ? target - 1 : target, 0, state.id);
      haptic('checked');
      onCommit(next);
    }
  }, [onCommit]);

  /** Where the dragged row would land, as an insertion point in the current list. */
  const computeTarget = (state: NonNullable<typeof drag.current>) => {
    const dragged = state.bands[state.from];
    const center = dragged.top + dragged.height / 2 + (state.pageY - state.startPageY);

    let index = state.bands.length;
    for (let i = 0; i < state.bands.length; i++) {
      const band = state.bands[i];
      if (center < band.top + band.height / 2) {
        index = i;
        break;
      }
    }
    return index;
  };

  const applyMove = useCallback((pageY: number) => {
    const state = drag.current;
    if (!state) return;
    state.pageY = pageY;
    setDragOffset(pageY - state.startPageY);

    const target = computeTarget(state);
    targetIndexRef.current = target;
    setDropIndex(target === state.from || target === state.from + 1 ? null : target);
  }, []);

  const startDrag = useCallback(
    (id: string, event: React.PointerEvent) => {
      if (drag.current) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      const from = idsRef.current.indexOf(id);
      if (from < 0) return;

      const bands = idsRef.current.map((rowId) => {
        const rect = rows.current.get(rowId)?.getBoundingClientRect();
        return {
          id: rowId,
          top: (rect?.top ?? 0) + window.scrollY,
          height: rect?.height ?? 0,
        };
      });

      event.preventDefault();
      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);

      const pageY = event.clientY + window.scrollY;
      drag.current = { id, pointerId: event.pointerId, startPageY: pageY, pageY, from, bands };
      targetIndexRef.current = from;
      haptic('checked');
      setDragId(id);
      setDragOffset(0);
      setDropIndex(null);

      // Pointer handling lives on the window: the finger routinely leaves the
      // grip it started on, and letting go outside the list must still settle.
      const onMove = (e: PointerEvent) => {
        if (drag.current?.pointerId !== e.pointerId) return;
        e.preventDefault();
        applyMove(e.clientY + window.scrollY);

        // Follow the finger when it reaches the edge, so a long list can be
        // crossed without letting go.
        const fromTop = e.clientY;
        const fromBottom = window.innerHeight - e.clientY;
        const step =
          fromTop < AUTOSCROLL_MARGIN_PX
            ? -AUTOSCROLL_SPEED_PX
            : fromBottom < AUTOSCROLL_MARGIN_PX
              ? AUTOSCROLL_SPEED_PX
              : 0;

        if (autoScroll.current !== undefined) {
          cancelAnimationFrame(autoScroll.current);
          autoScroll.current = undefined;
        }
        if (step !== 0) {
          const tick = () => {
            if (!drag.current) return;
            const before = window.scrollY;
            window.scrollBy(0, step);
            // Scrolling moves the finger in page coordinates even though it has
            // not moved on the glass.
            if (window.scrollY !== before) {
              applyMove(drag.current.pageY + (window.scrollY - before));
            }
            autoScroll.current = requestAnimationFrame(tick);
          };
          autoScroll.current = requestAnimationFrame(tick);
        }
      };

      const onUp = (e: PointerEvent) => {
        if (drag.current?.pointerId !== e.pointerId) return;
        finish(true);
      };
      const onCancel = (e: PointerEvent) => {
        if (drag.current?.pointerId !== e.pointerId) return;
        finish(false);
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') finish(false);
      };

      window.addEventListener('pointermove', onMove, { passive: false });
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onCancel);
      window.addEventListener('keydown', onKeyDown);
      listenersRef.current = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onCancel);
        window.removeEventListener('keydown', onKeyDown);
      };
    },
    [applyMove, finish],
  );

  // A drag interrupted by the list disappearing (switching lists, logging out)
  // must not leave listeners behind.
  useEffect(() => () => listenersRef.current?.(), []);

  /** Same reordering with the keyboard, for anyone not using a touchscreen. */
  const moveByKeyboard = useCallback(
    (id: string, direction: -1 | 1) => {
      const current = idsRef.current;
      const from = current.indexOf(id);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= current.length) return;
      const next = [...current];
      next.splice(to, 0, next.splice(from, 1)[0]);
      onCommit(next);
      // The grip moved with the row; keep it focused so arrows keep working.
      requestAnimationFrame(() =>
        rows.current.get(id)?.querySelector<HTMLElement>('[data-no-swipe]')?.focus(),
      );
    },
    [onCommit],
  );

  return { dragId, dragOffset, dropIndex, registerRow, startDrag, moveByKeyboard };
};
