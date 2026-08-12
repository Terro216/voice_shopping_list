import { useMemo, useState } from 'react';
import { parseBulkText, ParsedItem } from '../utils/speechParser';
import { useT } from '../i18n';
import { Sheet } from './Sheet';
import styles from '../App.module.css';

type Props = {
  initialText: string;
  onAdd: (items: ParsedItem[]) => void;
  onClose: () => void;
};

/**
 * Turns a pasted or shared block of text into list entries. Everything is
 * parsed live and shown before anything is added, because text from a chat
 * carries stray lines that nobody wants on their shopping list.
 */
export const ImportSheet = ({ initialText, onAdd, onClose }: Props) => {
  const { t } = useT();
  const [text, setText] = useState(initialText);
  const [skipped, setSkipped] = useState<Set<string>>(new Set());

  const parsed = useMemo(() => parseBulkText(text), [text]);
  const chosen = parsed.filter((item) => !skipped.has(item.name));

  const toggle = (name: string) =>
    setSkipped((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <Sheet title={t('importTitle')} onClose={onClose}>
      <p className={styles.sheetHint}>{t('importHint')}</p>
      <textarea
        className={styles.importArea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('importPlaceholder')}
        aria-label={t('importPlaceholder')}
        rows={6}
        autoFocus
      />

      {parsed.length === 0 ? (
        <p className={styles.sheetHint}>{t('importNothing')}</p>
      ) : (
        <ul className={styles.importList}>
          {parsed.map((item) => (
            <li key={item.name}>
              <label>
                <input
                  type="checkbox"
                  className={styles.toggle}
                  checked={!skipped.has(item.name)}
                  onChange={() => toggle(item.name)}
                />
                <span>{item.name}</span>
              </label>
              {item.count > 1 && <span className={styles.itemCount}>×{item.count}</span>}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.sheetActions}>
        <button type="button" onClick={() => onAdd(chosen)} disabled={chosen.length === 0}>
          {t('importAdd', { count: chosen.length })}
        </button>
        <button type="button" onClick={onClose}>
          {t('cancel')}
        </button>
      </div>
    </Sheet>
  );
};
