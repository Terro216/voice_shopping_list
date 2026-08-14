import { useEffect, useState } from 'react';
import type { Item } from '../api/items';
import { useT } from '../i18n';
import styles from '../App.module.css';

type Props = {
  items: Item[];
  /** Told whenever the drawer opens or closes; open means "keep this fresh". */
  onVisibilityChange: (visible: boolean) => void;
  onRestore: (id: string) => void;
  onPurge: () => void;
};

/**
 * Everything removed from this list, folded away at the bottom. Deleting is the
 * one action people take by accident and notice much later — long after the
 * undo toast is gone — so the removed rows stay reachable instead of vanishing.
 * Collapsed by default: it is a safety net, not part of the shopping.
 */
export const DeletedDrawer = ({ items, onVisibilityChange, onRestore, onPurge }: Props) => {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  // The contents are only worth fetching, and keeping fresh, while somebody is
  // actually looking at them.
  useEffect(() => {
    onVisibilityChange(open);
    return () => onVisibilityChange(false);
  }, [open, onVisibilityChange]);

  return (
    <details
      className={styles.deletedDrawer}
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary className={styles.deletedSummary}>
        🗑 {t('deletedTitle')}
        {items.length > 0 && ` (${items.length})`}
      </summary>

      <p className={styles.sheetHint}>{t('deletedHint')}</p>

      {items.length === 0 ? (
        <p className={styles.deletedEmpty}>{t('deletedEmpty')}</p>
      ) : (
        <>
          <ul className={styles.deletedList}>
            {items.map((item) => (
              <li key={item.id}>
                <span className={styles.deletedName}>
                  {item.name}
                  {item.count > 1 && <span className={styles.itemCount}> ×{item.count}</span>}
                </span>
                <button type="button" onClick={() => onRestore(item.id)}>
                  {t('restore')}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.sheetActions}>
            <button type="button" className={styles.clearBoughtButton} onClick={onPurge}>
              {t('purgeDeleted')}
            </button>
          </div>
        </>
      )}
    </details>
  );
};
