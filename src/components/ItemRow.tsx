import { useRef, useState } from 'react';
import { Item, ItemEdit } from '../api/items';
import { haptic } from '../utils/feedback';
import { useT } from '../i18n';
import styles from '../App.module.css';

type Props = {
  item: Item;
  onToggleBought: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onEdit: (id: string, edit: ItemEdit) => void;
  onRemove: (id: string) => void;
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
  onDragStart,
  onMoveByKeyboard,
  isDragging = false,
  dragOffset = 0,
  registerRow,
}: Props) => {
  const { t } = useT();
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(item.name);
  const [noteDraft, setNoteDraft] = useState(item.note ?? '');
  const [swipe, setSwipe] = useState(0);
  const [settling, setSettling] = useState(false);

  const gesture = useRef({ id: -1, x0: 0, y0: 0, axis: null as Axis, width: 1, armed: false });

  const editorRef = useRef<HTMLFormElement>(null);

  const openEditor = () => {
    setNameDraft(item.name);
    setNoteDraft(item.note ?? '');
    setEditing(true);
  };

  const save = () => {
    onEdit(item.id, { name: nameDraft, note: noteDraft });
    setEditing(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    save();
  };

  /**
   * Tapping away from the editor keeps the edit. Typing a note and then
   * touching anything else is how people leave a form they consider finished —
   * treating that as "discard" threw the note away without a word. Escape is
   * the way out for anyone who wants one.
   */
  const onEditorBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const goingTo = e.relatedTarget as Node | null;
    if (goingTo && editorRef.current?.contains(goingTo)) return; // moved between fields
    save();
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
    if ((e.target as HTMLElement).closest('button, input, [data-no-swipe]')) return;

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
              {item.note && <span className={styles.itemNote}>{item.note}</span>}
            </span>
            {item.count > 1 && <span className={styles.itemCount}>×{item.count}</span>}
          </button>

          <div className={styles.itemControls}>
            {!item.bought && (
              <>
                <button
                  className={styles.stepButton}
                  onClick={() => onDecrement(item.id)}
                  aria-label={t('oneLess', { name: item.name })}
                >
                  −
                </button>
                <button
                  className={styles.stepButton}
                  onClick={() => onIncrement(item.id)}
                  aria-label={t('oneMore', { name: item.name })}
                >
                  +
                </button>
              </>
            )}
            {/* Delete lives behind this menu rather than next to "−": a mis-tap
                while walking used to wipe an item instead of decrementing it. */}
            <button
              className={styles.stepButton}
              onClick={() => (editing ? setEditing(false) : openEditor())}
              aria-label={t('edit')}
              aria-expanded={editing}
            >
              ⋯
            </button>
          </div>
        </div>

        {editing && (
          <form
            ref={editorRef}
            className={styles.itemEditor}
            onSubmit={submit}
            onBlur={onEditorBlur}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.stopPropagation();
                setEditing(false);
              }
            }}
          >
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              aria-label={t('renamePlaceholder')}
              placeholder={t('renamePlaceholder')}
              autoFocus
            />
            <input
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              aria-label={t('notePlaceholder')}
              placeholder={t('notePlaceholder')}
            />
            <div className={styles.itemEditorActions}>
              <button type="submit">{t('save')}</button>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => onRemove(item.id)}
                aria-label={t('removeItem', { name: item.name })}
              >
                🗑
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
