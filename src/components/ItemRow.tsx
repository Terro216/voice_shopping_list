import { useState } from 'react';
import { Item, ItemEdit } from '../api/items';
import { useT } from '../i18n';
import styles from '../App.module.css';

type Props = {
  item: Item;
  onToggleBought: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onEdit: (id: string, edit: ItemEdit) => void;
  onRemove: (id: string) => void;
};

export const ItemRow = ({
  item,
  onToggleBought,
  onIncrement,
  onDecrement,
  onEdit,
  onRemove,
}: Props) => {
  const { t } = useT();
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(item.name);
  const [noteDraft, setNoteDraft] = useState(item.note ?? '');

  const openEditor = () => {
    setNameDraft(item.name);
    setNoteDraft(item.note ?? '');
    setEditing(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(item.id, { name: nameDraft, note: noteDraft });
    setEditing(false);
  };

  return (
    <div className={`${styles.item} ${item.bought ? styles.itemBought : ''}`}>
      <div className={styles.itemRow}>
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
        <form className={styles.itemEditor} onSubmit={submit}>
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
  );
};
