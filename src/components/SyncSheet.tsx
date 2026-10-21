import { useEffect, useState } from 'react';
import { discardLegacyMutations, discardMutation, legacyMutations, QUEUE_CHANGED_EVENT, readMutations, type QueuedMutation, type StoredMutation } from '../api/offlineQueue';
import { readSnapshot } from '../api/listCache';
import { readCatalog } from '../api/catalogCache';
import { ConflictReviewSheet } from './ConflictReviewSheet';
import { LOCAL_STORE_CHANGED, storageFailed } from '../api/localStore';
import { Sheet } from './Sheet';
import { useT } from '../i18n';
import styles from '../App.module.css';

export const SyncSheet = ({ onClose, onRetry, lastSyncedAt }: { lastSyncedAt?:number; onClose: () => void; onRetry: () => Promise<void> }) => {
  const { t, lang } = useT();
  const [review,setReview]=useState<StoredMutation | null>(null);
  const [entries, setEntries] = useState(readMutations);
  const [legacy, setLegacy] = useState(legacyMutations);
  const [busy, setBusy] = useState(false);
  const [showLegacy, setShowLegacy] = useState(false);
  useEffect(() => {
    const refresh = () => { setEntries(readMutations()); setLegacy(legacyMutations()); };
    window.addEventListener(LOCAL_STORE_CHANGED, refresh);
    window.addEventListener(QUEUE_CHANGED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener(LOCAL_STORE_CHANGED, refresh); window.removeEventListener(QUEUE_CHANGED_EVENT, refresh); window.removeEventListener('storage', refresh); };
  }, []);
  const describe = (entry: QueuedMutation) => {
    const body = (entry.body ?? {}) as Record<string, unknown>;
    const url = new URL(entry.url, location.origin);
    const list = String(body.list ?? body.username ?? url.searchParams.get('list') ?? '');
    const id = decodeURIComponent(url.pathname.split('/')[3] ?? '');
    const name = String(body.name ?? readSnapshot(list)?.items.find(item => item.id === id)?.name ?? t('itemUnavailable'));
    const action = entry.method === 'DELETE' ? t('deleteListAction') : entry.method === 'POST' ? t('add') : t('edit');
    const label = readCatalog().find(entry => entry.id === list)?.name;
    const details = [body.count !== undefined ? `${t('quantityLabel')}: ${body.count} ${body.unit ?? ''}` : '', body.delta !== undefined ? `${t('quantityLabel')}: ${Number(body.delta) > 0 ? '+' : ''}${body.delta}` : '', typeof body.note === 'string' ? body.note : ''].filter(Boolean).join(' · ');
    return `${label ? `${label}: ` : ''}${action} — ${name}${details ? ` · ${details}` : ''}`;
  };
  if (review) return <ConflictReviewSheet entry={review} onClose={()=>setReview(null)} onSaved={()=>{setReview(null);setEntries(readMutations());void onRetry().catch(storageFailed);}} />;
  return <Sheet title={t('syncDetails')} onClose={onClose}>
    <p>{lastSyncedAt ? `${t('syncConfirmed')} ${new Date(lastSyncedAt).toLocaleString(lang==='ru'?'ru-RU':'en-GB')}` : t('syncNotConfirmed')}</p>
    <p className={styles.sheetHint}>{t('syncHint')}</p>
    {entries.length === 0 && <p>{t('syncEmpty')}</p>}
    <ul className={styles.syncDetails}>
      {entries.map(entry => <li key={entry.id}>
        <p>{describe(entry)}</p>
        <p>{entry.failure ? t(entry.failure.status === 409 ? 'syncConflictHint' : 'syncRejectedHint') : t('syncPending')}</p>
        {entry.failure && <button onClick={()=>setReview(entry)}>{t('reviewChange')}</button>}
        {entry.failure && <button onClick={() => { if (window.confirm(t('discardChangeConfirm'))) void discardMutation(entry.id).catch(storageFailed); }}>{t('dismissChange')}</button>}
      </li>)}
    </ul>
    <button disabled={busy} onClick={async () => { setBusy(true); try { await onRetry(); } catch { storageFailed(); } finally { setBusy(false); } }}>{t('retry')}</button>
    {legacy.length > 0 && <div>
      <p>{t('legacyQueueHint', { count: legacy.length })}</p>
      <button onClick={() => setShowLegacy(!showLegacy)}>{t('showOldChanges')}</button>
      {showLegacy && <><ul>{legacy.map((entry, index) => <li key={index}>{describe(entry)}</li>)}</ul>
        <button onClick={() => { if (window.confirm(t('discardChangeConfirm'))) discardLegacyMutations(); }}>{t('dismissChange')}</button></>}
    </div>}
  </Sheet>;
};
