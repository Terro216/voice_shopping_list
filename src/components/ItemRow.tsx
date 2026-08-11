import { useState } from 'react';
import { Item } from '../api/items';
import { useT } from '../i18n';
import styles from '../App.module.css';

type Props = {
  item: Item;
  onToggleBought: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
};

export const ItemRow = ({
  item,
  onToggleBought,
  onIncrement,
  onDecrement,
  onRename,
  onRemove,
}: Props) => {
  const { t } = useT();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.name);

  const openEditor = () => {
    setDraft(item.name);
    setEditing(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onRename(item.id, draft);
    setEditing(false);
  };

  return (
    <div className={`${styles.item} ${item.bought ? styles.itemBought : ''}`}>
      <div className={styles.itemRow}>
        <button
          type="button"
          className={styles.itemMain}
          onClick={() => onToggleBought(item.id)}
          aria-label={item.bought ? t('returnToList', { name: item.name }) : t('markBought', { name: item.name })}
        >
          <span className={styles.checkbox} aria-hidden="true">
            {item.bought ? '✓' : ''}
          </span>
          <span className={styles.itemName}>{item.name}</span>
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
            aria-label={t('rename')}
            aria-expanded={editing}
          >
            ⋯
          </button>
        </div>
      </div>

      {editing && (
        <form className={styles.itemEditor} onSubmit={submit}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label={t('renamePlaceholder')}
            placeholder={t('renamePlaceholder')}
            autoFocus
          />
          <button type="submit">{t('save')}</button>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => onRemove(item.id)}
            aria-label={t('removeItem', { name: item.name })}
          >
            🗑
          </button>
        </form>
      )}
    </div>
  );
};
