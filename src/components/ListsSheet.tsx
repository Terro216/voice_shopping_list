import { useState } from 'react';
import toast from 'react-hot-toast';
import { ApiError } from '../api/client';
import { createList, dropList, renameList, type ListSummary } from '../api/lists';
import { useT } from '../i18n';
import { Sheet } from './Sheet';
import styles from '../App.module.css';

type Props = {
  lists: ListSummary[];
  activeList: string;
  viewer: string;
  onSelectList: (list: string) => void;
  onListsChanged: () => Promise<void> | void;
  onClose: () => void;
};

/**
 * Creating, naming and switching lists. A list a person only joined is shown
 * here too, but the only thing they can do with it is leave — renaming and
 * deleting belong to whoever owns it.
 */
export const ListsSheet = ({
  lists,
  activeList,
  viewer,
  onSelectList,
  onListsChanged,
  onClose,
}: Props) => {
  const { t } = useT();
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState('');

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setBusy(true);
    try {
      const list = await createList(trimmed);
      setName('');
      // Wait for the catalog before opening it: a list id is a random token,
      // and opening one the catalog has never heard of shows that token as the
      // title until the refresh lands.
      await onListsChanged();
      onSelectList(list.id);
      toast.success(t('listCreated', { name: list.name }));
      onClose();
    } catch (err) {
      // The cap is the one server refusal a person can actually act on, so it
      // gets said in their language rather than relayed in the server's.
      if (err instanceof ApiError && err.status === 409) toast.error(t('listLimitReached'));
      else toast.error(err instanceof Error ? err.message : t('somethingWrong'));
    } finally {
      setBusy(false);
    }
  };

  const submitRename = async (e: React.FormEvent, list: ListSummary) => {
    e.preventDefault();
    const trimmed = renameDraft.trim();
    if (!trimmed || trimmed === list.name) {
      setRenaming(null);
      return;
    }
    try {
      await renameList(list.id, trimmed);
      setRenaming(null);
      onListsChanged();
      toast.success(t('listRenamed', { name: trimmed }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('somethingWrong'));
    }
  };

  /** Owned lists are deleted outright; a joined one is only left. */
  const remove = async (list: ListSummary) => {
    if (list.owned && !window.confirm(t('deleteListConfirm', { name: list.name }))) return;
    try {
      await dropList(list.id);
      if (list.id === activeList) onSelectList(viewer);
      onListsChanged();
      toast.success(
        list.owned ? t('listDeleted', { name: list.name }) : t('leftList', { list: list.name }),
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('somethingWrong'));
    }
  };

  return (
    <Sheet title={t('listsTitle')} onClose={onClose}>
      <p className={styles.sheetHint}>{t('listsHint')}</p>

      <ul className={styles.listCatalog}>
        {lists.map((list) => (
          <li key={list.id} className={list.id === activeList ? styles.listCatalogActive : undefined}>
            {renaming === list.id ? (
              <form className={styles.sheetForm} onSubmit={(e) => submitRename(e, list)}>
                <input
                  value={renameDraft}
                  onChange={(e) => setRenameDraft(e.target.value)}
                  aria-label={t('newListPlaceholder')}
                  maxLength={60}
                  autoFocus
                />
                <button type="submit">{t('save')}</button>
                <button type="button" onClick={() => setRenaming(null)}>
                  {t('cancel')}
                </button>
              </form>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.listCatalogName}
                  onClick={() => {
                    onSelectList(list.id);
                    onClose();
                  }}
                  aria-current={list.id === activeList}
                >
                  <span>{list.name}</span>
                  {!list.owned && (
                    <span className={styles.listCatalogOwner}>
                      {t('sharedByOwner', { owner: list.owner })}
                    </span>
                  )}
                </button>
                <div className={styles.listCatalogActions}>
                  {list.owned && (
                    <button
                      type="button"
                      onClick={() => {
                        setRenaming(list.id);
                        setRenameDraft(list.name);
                      }}
                    >
                      {t('renameListAction')}
                    </button>
                  )}
                  {list.id === viewer ? (
                    <span className={styles.sheetHint}>{t('mainListNote')}</span>
                  ) : (
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => remove(list)}
                    >
                      {list.owned ? t('deleteListAction') : t('leaveList')}
                    </button>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <form className={styles.sheetForm} onSubmit={create}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('newListPlaceholder')}
          aria-label={t('newListPlaceholder')}
          maxLength={60}
        />
        <button type="submit" disabled={busy || !name.trim()}>
          {t('createList')}
        </button>
      </form>
    </Sheet>
  );
};
