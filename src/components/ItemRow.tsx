import { useCallback, useRef, useState } from 'react';
import { Item, ItemEdit } from '../api/items';
import { haptic } from '../utils/feedback';
import { useT } from '../i18n';
import styles from '../App.module.css';
import { QuantityControls } from './QuantityControls';
import { formatQuantity } from '../utils/quantity';
import { ItemEditSheet } from './ItemEditSheet';

type Props = {
  item: Item;
  onToggleBought: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onEdit: (id: string, edit: ItemEdit, expected?: Item) => Promise<boolean | undefined>;
  onRemove: (id: string) => void;
  onEditorOpen?: () => void;
  /** Present only where reordering makes sense (the active part of the list). */
  onDragStart?: (id: string, event: React.PointerEvent) => void;
  onMoveByKeyboard?: (id: string, direction: -1 | 1) => void;
  isDragging?: boolean;
  dragOffset?: number;
  registerRow?: (id: string, node: HTMLDivElement | null) => void;
};

// A swipe has to travel this far before it counts. Deliberately generous: this
// list is used while walking, and an accidental flick that deletes something is
// far worse than a swipe that needs repeating.
const SWIPE_COMMIT_RATIO = 0.28;
const SWIPE_COMMIT_MIN_PX = 72;
// Below this the gesture is not treated as horizontal at all, so a normal
// vertical scroll started on a row never nudges it sideways.
const AXIS_LOCK_PX = 12;
const AXIS_BIAS = 1.4;

type Axis = 'x' | 'y' | null;

/**
 * Drawn rather than typed. The grip used to be the braille character ⠿, which
 * a good number of Android font stacks have no glyph for — the button was there
 * and did its job, but on those phones it was simply invisible, so nobody could
 * discover that rows could be dragged at all.
 */
const GripIcon = () => (
  <svg
    className={styles.gripIcon}
    viewBox="0 0 10 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    {[3, 8, 13].map((y) => (
      <g key={y}>
        <circle cx="3" cy={y} r="1.35" />
        <circle cx="7" cy={y} r="1.35" />
      </g>
    ))}
  </svg>
);

export const ItemRow = ({
  item,
  onToggleBought,
  onIncrement,
  onDecrement,
  onEdit,
  onRemove,
  onEditorOpen,
  onDragStart,
  onMoveByKeyboard,
  isDragging = false,
  dragOffset = 0,
  registerRow,
}: Props) => {
  const { t, lang } = useT();
  const [editing, setEditing] = useState(false);
  const [quantityOpen, setQuantityOpen] = useState(false);
  const [focusNote, setFocusNote] = useState(false);
  const [swipe, setSwipe] = useState(0);
  const [settling, setSettling] = useState(false);

  const suppressClickUntil = useRef(0);
  const gesture = useRef({ id: -1, x0: 0, y0: 0, axis: null as Axis, width: 1, armed: false });

  const closeEditor = useCallback(() => setEditing(false), []);
  const openEditor = (note = false) => {
    onEditorOpen?.();
    setQuantityOpen(false);
    setFocusNote(note);
    setEditing(true);
  };

  const commitThreshold = () =>
    Math.max(SWIPE_COMMIT_MIN_PX, gesture.current.width * SWIPE_COMMIT_RATIO);

  const endSwipe = () => {
    gesture.current.axis = null;
    gesture.current.id = -1;
    setSettling(true);
    setSwipe(0);
    window.setTimeout(() => setSettling(false), 180);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (editing || isDragging) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Buttons, inputs and the drag grip own their own gestures.
    if ((e.target as HTMLElement).closest('button:not([data-swipe-main]), input, [data-no-swipe]')) return;

    gesture.current = {
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      axis: null,
      width: e.currentTarget.getBoundingClientRect().width || 1,
      armed: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (g.id !== e.pointerId) return;

    const dx = e.clientX - g.x0;
    const dy = e.clientY - g.y0;

    if (g.axis === null) {
      // Whichever axis clearly wins first owns the gesture; a vertical one is
      // handed straight back to the page so scrolling still feels native.
      if (Math.abs(dx) > AXIS_LOCK_PX && Math.abs(dx) > Math.abs(dy) * AXIS_BIAS) {
        g.axis = 'x';
        e.currentTarget.setPointerCapture(e.pointerId);
      } else if (Math.abs(dy) > AXIS_LOCK_PX) {
        g.axis = 'y';
        g.id = -1;
        return;
      } else {
        return;
      }
    }
    if (g.axis !== 'x') return;

    setSwipe(dx);

    // A tick of feedback the moment the swipe becomes committing, so it is
    // possible to feel where the line is without watching the screen.
    const past = Math.abs(dx) >= commitThreshold();
    if (past !== g.armed) {
      g.armed = past;
      if (past) haptic('checked');
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (g.id !== e.pointerId) return;
    const dx = e.clientX - g.x0;
    const committed = g.axis === 'x' && Math.abs(dx) >= commitThreshold();

    if (g.axis === 'x') suppressClickUntil.current = Date.now() + 400;
    endSwipe();
    if (!committed) return;
    if (dx > 0) onToggleBought(item.id);
    else onRemove(item.id);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gesture.current.id === e.pointerId) endSwipe();
  };

  const swipingRight = swipe > 0;
  const revealed = Math.min(1, Math.abs(swipe) / Math.max(commitThreshold(), 1));

  const rowStyle = isDragging
    ? { transform: `translateY(${dragOffset}px)` }
    : swipe !== 0
      ? { transform: `translateX(${swipe}px)` }
      : undefined;

  return (
    <>
    <div
      className={`${styles.item} ${item.bought ? styles.itemBought : ''} ${
        isDragging ? styles.itemDragging : ''
      }`}
      ref={(node) => registerRow?.(item.id, node)}
    >
      {/* What the swipe is about to do, revealed under the row as it moves. */}
      {swipe !== 0 && (
        <div
          className={`${styles.swipeHint} ${swipingRight ? styles.swipeCheck : styles.swipeDelete}`}
          style={{ opacity: 0.35 + revealed * 0.65 }}
          aria-hidden="true"
        >
          <span>{swipingRight ? (item.bought ? '↩' : '✓') : '🗑'}</span>
        </div>
      )}

      <div
        className={`${styles.itemSurface} ${settling ? styles.itemSettling : ''}`}
        style={rowStyle}
        onClickCapture={(event) => { if (Date.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); } }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div className={styles.itemRow}>
          {onDragStart && (
            <button
              type="button"
              className={styles.dragHandle}
              data-no-swipe=""
              aria-label={t('dragHandle', { name: item.name })}
              onPointerDown={(e) => onDragStart(item.id, e)}
              onKeyDown={(e) => {
                // Reordering without a pointer: focus the grip, use the arrows.
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  onMoveByKeyboard?.(item.id, e.key === 'ArrowUp' ? -1 : 1);
                }
              }}
            >
              <GripIcon />
            </button>
          )}

          <button
            type="button"
            className={styles.itemMain}
            data-swipe-main=""
            role="checkbox"
            aria-checked={item.bought}
            onClick={() => onToggleBought(item.id)}
            aria-label={
              item.bought ? t('returnToList', { name: item.name }) : t('markBought', { name: item.name })
            }
          >
            <span className={styles.checkbox} aria-hidden="true">
              {item.bought ? '✓' : ''}
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemName}>{item.name}</span>
            </span>
          </button>

          <div className={styles.itemControls}>
            <button type="button" className={styles.itemCount} aria-label={t('quantityFor', { name: item.name })}
              aria-expanded={quantityOpen} aria-controls={`quantity-${item.id}`}
              onClick={() => { onEditorOpen?.(); setQuantityOpen(!quantityOpen); }}>
              {formatQuantity(item, lang)}
            </button>
            {/* Delete lives behind this menu rather than next to "−": a mis-tap
                while walking used to wipe an item instead of decrementing it. */}
            <button
              className={styles.stepButton}
              onClick={() => openEditor()}
              aria-label={t('editItemNamed', { name: item.name })}
              aria-expanded={editing}
            >
              ⋯
            </button>
          </div>
        </div>

        {quantityOpen && <div id={`quantity-${item.id}`} data-no-swipe="">
          <QuantityControls item={item} onIncrement={onIncrement} onDecrement={onDecrement} onEdit={onEdit} onClose={() => setQuantityOpen(false)} />
        </div>}
        {item.note && <button type="button" className={styles.noteLink}
          onClick={() => openEditor(true)}
          aria-label={t(item.note ? 'editNoteFor' : 'addNoteFor', { name: item.name })}>
          <span aria-hidden="true">{item.note ? '✎' : '+'}</span> {item.note}
        </button>}
      </div>
    </div>
    {editing && (
      <ItemEditSheet item={item} focusNote={focusNote} onEdit={onEdit} onRemove={onRemove} onClose={closeEditor} />
    )}
    </>
  );
};
