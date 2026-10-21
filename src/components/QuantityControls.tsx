import { useRef, useState } from 'react';
import type { Item, ItemEdit } from '../api/items';
import { isValidQuantity, quantityStep } from '../../shared/quantity.js';
import { useT } from '../i18n';
import styles from '../App.module.css';

type Props = {
  item: Item;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onEdit: (id: string, edit: ItemEdit, expected?: Item) => Promise<boolean | undefined>;
  onClose: () => void;
};

export const QuantityControls = ({ item, onIncrement, onDecrement, onEdit, onClose }: Props) => {
  const { t } = useT();
  const [draft, setDraft] = useState<string | null>(null);
  const original = useRef(item);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return <form className={styles.quantityControls} aria-label={t('quantityFor', { name: item.name })}
    onSubmit={async event => {
      event.preventDefault();
      if (busy) return;
      const count = Number((draft ?? String(item.count)).replace(',', '.'));
      if (!isValidQuantity(count, item.unit)) { setError(t('invalidQuantity')); return; }
      setBusy(true);
      try {
        if (await onEdit(item.id, { count }, original.current)) onClose();
        else setError(t('saveFailed'));
      } catch { setError(t('saveFailed')); }
      finally { setBusy(false); }
    }}>
    <div className={styles.quantitySteps}>
      <button type="button" disabled={busy} onClick={() => { setDraft(null); setError(''); onDecrement(item.id); }}
        aria-label={t(item.count <= quantityStep(item.unit) ? 'removeItem' : item.unit ? 'decreaseQuantity' : 'oneLess', { name: item.name })}>−</button>
      <input inputMode="decimal" aria-label={t('quantityLabel')} value={draft ?? String(item.count)} disabled={busy}
        onChange={event => { if (draft === null) original.current = item; setDraft(event.target.value); setError(''); }} />
      <button type="button" disabled={busy} onClick={() => { setDraft(null); setError(''); onIncrement(item.id); }}
        aria-label={t(item.unit ? 'increaseQuantity' : 'oneMore', { name: item.name })}>+</button>
    </div>
    {draft !== null && <button type="submit" disabled={busy}>{t(busy ? 'saving' : 'save')}</button>}
    <button type="button" onClick={onClose}>{t('done')}</button>
    {error && <p className={styles.error} role="alert">{error}</p>}
  </form>;
};
