import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useShoppingList } from '../hooks/useShoppingList';
import { useConversation } from '../hooks/useConversation';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSuggestions } from '../hooks/useSuggestions';
import { useWakeLock } from '../hooks/useWakeLock';
import { useDragReorder } from '../hooks/useDragReorder';
import type { ThemeChoice } from '../hooks/useTheme';
import { VoiceControls } from './VoiceControls';
import { ItemRow } from './ItemRow';
import { PushToggle } from './PushToggle';
import { ShareSheet } from './ShareSheet';
import { SettingsSheet } from './SettingsSheet';
import { ImportSheet } from './ImportSheet';
import { ListsSheet } from './ListsSheet';
import { HelpSheet } from './HelpSheet';
import { DeletedDrawer } from './DeletedDrawer';
import { Sheet } from './Sheet';
import { type SpeechCommand, ParsedItem, parseBulkText } from '../utils/speechParser';
import { takeMicIntent, takeSharedText } from '../launchIntent';
import { legacyMutations } from '../api/offlineQueue';
import { SyncSheet } from './SyncSheet';
import { cue, haptic } from '../utils/feedback';
import { LANGUAGES, useT, type Lang } from '../i18n';
import type { ListSummary } from '../api/lists';
import styles from '../App.module.css';
import type { Item } from '../api/items';
import { isValidQuantity, quantityStep } from '../../shared/quantity.js';
import { formatQuantity } from '../utils/quantity';

type Props = {
  list: string; // the list being viewed — not necessarily the viewer's own
  viewer: string; // the logged-in account
  lists: ListSummary[];
  catalogLoading?: boolean;
  catalogError?: boolean;
  onSelectList: (list: string) => void;
  onListsChanged: () => Promise<void> | void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: ThemeChoice;
  setTheme: (theme: ThemeChoice) => void;
  onLogout: () => void;
};

// Toast ids for the messages that can arrive in bursts. Reusing an id replaces
// the toast instead of stacking another one on top — dictating a long list used
// to bury the screen under them.
const SPEECH_TOAST = 'speech';
const ITEM_TOAST = 'item-action';

const HELP_SEEN_KEY = 'help_seen_v1';

export const ShoppingList = ({
  list,
  viewer,
  lists,
  catalogLoading,
  catalogError,
  onSelectList,
  onListsChanged,
  lang,
  setLang,
  theme,
  setTheme,
  onLogout,
}: Props) => {
  const { t } = useT();
  const {
    items,
    deletedItems,
    otherViewers,
    isOffline,
    pendingCount,
    accessDenied, loading, loadError, deletedError, deletedLoading, failedCount, retrySync, retryDeleted, lastUndoId,
    addItem,
    removeItem,
    editItem,
    moveItem,
    getItems,
    changeCount,
    setBought,
    toggleBought,
    reorder,
    clearBought,
    watchDeleted,
    restoreDeleted,
    purgeDeleted,
    undo,
  } = useShoppingList(list, viewer);
  const [newItemName, setNewItemName] = useState('');
  const [sheet, setSheet] = useState<'none' | 'share' | 'settings' | 'import' | 'lists' | 'help' | 'sync'>(
    'none',
  );
  const [showIntro, setShowIntro] = useState(() => !localStorage.getItem(HELP_SEEN_KEY));
  const [adding, setAdding] = useState(false);
  const [importText, setImportText] = useState('');
  const { frequent, matches, refreshFrequent } = useSuggestions(list, newItemName);

  const currentList = lists.find((entry) => entry.id === list);
  // Until the catalog arrives there is no name to show. The account's own list
  // is named after them so that reads fine; any other id is a random token and
  // a neutral word beats showing it.
  const listName = currentList?.name ?? (list === viewer ? viewer : t('activeList'));

  const addAndRefresh = useCallback(
    async (name: string, count = 1, details: Pick<Item, 'unit' | 'note'> = {}) => {
      const item = await addItem(name, count, details);
      refreshFrequent();
      return item;
    },
    [addItem, refreshFrequent],
  );

  const performUndo = useCallback(async (actionId?: string) => {
    try {
      const label = await undo(actionId);
      if (label) {
        toast(t('undone', { label }), { icon: '↩️', id: ITEM_TOAST });
      } else {
        toast(t('nothingToUndo'), { id: ITEM_TOAST });
      }
    } catch {
      toast.error(t('voiceChangeFailed'), { id: ITEM_TOAST });
    }
  }, [undo, t]);

  /** Toast that offers to take the action back — the store-aisle safety net. */
  const toastWithUndo = useCallback(
    (message: string, actionId = lastUndoId()) => {
      if (!actionId) return;
      toast(
        (instance) => (
          <span className={styles.toastWithAction}>
            {message}
            <button
              type="button"
              onClick={() => {
                toast.dismiss(instance.id);
                void performUndo(actionId);
              }}
            >
              {t('returnAction')}
            </button>
          </span>
        ),
        { icon: '🗑', id: ITEM_TOAST },
      );
    },
    [performUndo, t, lastUndoId],
  );

  const executeBasic = useCallback(
    async (command: SpeechCommand, text: string, targets?: (Item | undefined)[]) => {
      switch (command.type) {
        case 'add': {
          if (command.items.length === 0) {
            // Saying something and getting no reaction at all reads as a broken
            // mic; show what was heard and offer to take it literally.
            const spoken = text.trim();
            cue('unrecognized');
            toast(
              (instance) => (
                <span className={styles.toastWithAction}>
                  {t('notUnderstood', { text: spoken })}
                  <button
                    type="button"
                    onClick={() => {
                      toast.dismiss(instance.id);
                      void addAndRefresh(spoken);
                    }}
                  >
                    {t('addAsIs')}
                  </button>
                </span>
              ),
              { icon: '🤔', id: SPEECH_TOAST },
            );
            return;
          }
          if (command.items.some((parsed) => !isValidQuantity(parsed.count, parsed.unit))) {
            cue('unrecognized');
            toast.error(t('invalidQuantity'), { id: SPEECH_TOAST });
            return;
          }
          if (command.items.some((parsed) => (parsed.note?.length ?? 0) > 200)) {
            cue('unrecognized');
            toast.error(t('noteTooLong'), { id: SPEECH_TOAST });
            return;
          }
          // Sequential: a correction following this add must know the actual
          // row id, including when dictation merged into an existing row.
          let lastItem: Item | undefined;
          for (const parsed of command.items) {
            lastItem = await addAndRefresh(parsed.name, parsed.count, parsed);
            if (!lastItem) return;
          }
          cue('added');
          toast.success(
            t('recognized', {
              items: command.items
                .map((p: ParsedItem) => `${p.name}${p.unit || p.count !== 1 ? ` ${formatQuantity(p, lang)}` : ''}${p.note ? ` — ${p.note}` : ''}`)
                .join(', '),
            }),
            { id: SPEECH_TOAST },
          );
          return lastItem;
        }
        case 'check':
        case 'remove': {
          const found: string[] = [];
          const missed: string[] = [];
          for (const [index, query] of command.queries.entries()) {
            const item = targets?.[index];
            if (!item) {
              missed.push(query);
              continue;
            }
            if (command.type === 'check') {
              if (!await setBought(item.id, true)) continue;
            } else {
              if (!await removeItem(item.id)) continue;
            }
            found.push(item.name);
          }
          if (found.length > 0) {
            cue(command.type === 'check' ? 'checked' : 'removed');
            const message =
              command.type === 'check'
                ? t('checkedOff', { items: found.join(', ') })
                : t('removed', { items: found.join(', ') });
            if (command.type === 'remove') toastWithUndo(message);
            else toast.success(message, { id: SPEECH_TOAST });
          }
          if (missed.length > 0) {
            cue('unrecognized');
            toast.error(t('notOnList', { items: missed.join(', ') }), { id: SPEECH_TOAST });
          }
          break;
        }
        case 'clearBought':
          cue('removed');
          { const id = await clearBought(); if (id) toastWithUndo(t('boughtCleared'), id); }
          break;
        case 'undo':
          await performUndo();
          break;
      }
    },
    [addAndRefresh, setBought, removeItem, clearBought, performUndo, toastWithUndo, t, lang],
  );

  const { handleSpeech, choice, choose, contextName } = useConversation({
    list, lang, lists, getItems, editItem, moveItem, executeBasic,
  });

  const onSpeechError = useCallback(
    (error: string) => {
      toast.error(t(error === 'not-allowed' || error === 'service-not-allowed' ? 'micDenied' : error === 'audio-capture' ? 'micUnavailable' : 'voiceNetworkFailed'), { id: SPEECH_TOAST });
    },
    [t],
  );

  const speechLang = LANGUAGES.find((option) => option.lang === lang)?.speech ?? 'ru-RU';
  const { isStarting, isListening, toggleListening, stopListening, interimText, isSupported, flushNow } =
    useSpeechRecognition(handleSpeech, speechLang, onSpeechError);

  // Keep the phone awake while dictating in the store.
  useWakeLock(isListening);

  useEffect(() => {
    if (choice) stopListening(true);
  }, [choice, stopListening]);

  const openImport = (text = '') => {
    setImportText(text);
    setSheet('import');
  };

  const handleImport = useCallback(
    async (parsed: ParsedItem[]) => {
      let added = 0;
      for (const item of parsed) {
        if (!await addAndRefresh(item.name, item.count, item)) break;
        added++;
      }
      if (added > 0) {
        cue('added');
        toast.success(t('imported', { count: added }), { id: ITEM_TOAST });
      }
      return parsed.slice(added);
    },
    [addAndRefresh, t],
  );

  // Text shared into the app from another one lands in the import screen.
  useEffect(() => {
    const shared = takeSharedText();
    if (shared) openImport(shared);
  }, []);

  // Opened from the home-screen "mic" shortcut: start listening right away
  // instead of making them find the button. takeMicIntent answers once, so a
  // re-run of this effect cannot toggle the mic back off.
  useEffect(() => {
    if (isSupported && takeMicIntent()) toggleListening();
  }, [isSupported, toggleListening]);

  const manualItems = useMemo(() => parseBulkText(newItemName), [newItemName]);
  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adding || !newItemName.trim()) return;
    if (manualItems.length !== 1) { openImport(newItemName); return; }
    const draft = newItemName;
    setAdding(true);
    try {
      const parsed = manualItems[0];
      const item = await addAndRefresh(parsed.name, parsed.count, parsed);
      if (item) setNewItemName(current => current === draft ? '' : current);
    } finally { setAdding(false); }
  };

  const addSuggestion = async (name: string) => {
    if (await addAndRefresh(name)) setNewItemName('');
  };

  const handleRemove = async (id: string) => {
    const item = items.find(candidate => candidate.id === id);
    const actionId = await removeItem(id);
    if (item && actionId) { cue('removed'); toastWithUndo(t('removed', { items: item.name }), actionId); }
    else toast.error(t('voiceChangeFailed'));
  };

  const handleClearBought = async () => {
    const actionId = await clearBought();
    if (actionId) toastWithUndo(t('boughtCleared'), actionId);
  };

  const handleRestore = async (id: string) => {
    const item = deletedItems.find((candidate) => candidate.id === id);
    if (!await restoreDeleted(id)) { toast.error(t('voiceChangeFailed')); return; }
    if (item) toast.success(t('restored', { name: item.name }), { id: ITEM_TOAST });
  };

  const handlePurge = async () => {
    if (!await purgeDeleted()) { toast.error(t('voiceChangeFailed')); return; }
    toast(t('purged'), { icon: '🗑', id: ITEM_TOAST });
  };

  const activeItems = useMemo(() => items.filter((item) => !item.bought), [items]);
  const boughtItems = items.filter((item) => item.bought);
  const activeIds = useMemo(() => activeItems.map((item) => item.id), [activeItems]);

  const { dragId, dragOffset, dropIndex, registerRow, startDrag, moveByKeyboard } = useDragReorder(
    activeIds,
    reorder,
  );

  if (accessDenied) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{t('noAccess')}</p>
        <button type="button" onClick={() => onSelectList(viewer)}>
          {t('backToMyList')}
        </button>
      </div>
    );
  }

  const itemNames = new Set(items.map((item) => item.name.toLowerCase()));
  const frequentChips = frequent.filter((s) => !itemNames.has(s.name.toLowerCase())).slice(0, 6);
  const typeaheadChips = matches.filter((s) => !itemNames.has(s.name.toLowerCase())).slice(0, 5);

  const rowProps = {
    onToggleBought: (id: string) => {
      // A tap already gives visual feedback, so this stays on the quiet
      // channel — a beep per tap would be noise in a shop.
      haptic('checked');
      toggleBought(id);
    },
    onIncrement: (id: string) => changeCount(id, quantityStep(items.find((item) => item.id === id)?.unit)),
    onDecrement: (id: string) => changeCount(id, -quantityStep(items.find((item) => item.id === id)?.unit)),
    onEdit: editItem,
    onEditorOpen: () => stopListening(true),
    onRemove: handleRemove,
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{listName}</h1>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => void performUndo()}
            title={t('undo')}
            aria-label={t('undo')}
          >
            ↩️
          </button>
          <PushToggle list={list} listName={listName} />
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => openImport()}
            title={t('import')}
            aria-label={t('import')}
          >
            📋
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setSheet('share')}
            title={t('shareTitle')}
            aria-label={t('shareTitle')}
          >
            🔗
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setSheet('settings')}
            title={t('settings')}
            aria-label={t('settings')}
          >
            ⚙️
          </button>
        </div>
      </header>

      <div className={styles.listBar}>
        <button type="button" className={styles.listPickerButton} onClick={() => setSheet('lists')}>
          📚 {t('lists')}
          {lists.length > 1 && ` (${lists.length})`}
        </button>
        {/* Spelled out rather than hidden behind a "?" among five other icons:
            the whole point of this one is that somebody meeting the app for the
            first time can find it. */}
        <button type="button" className={styles.listPickerButton} onClick={() => setSheet('help')}>
          ❓ {t('help')}
        </button>
        {currentList && !currentList.owned && (
          <span className={styles.activeList}>
            {t('sharedByOwner', { owner: currentList.owner })}
          </span>
        )}
        {list !== viewer && (
          <button type="button" className={styles.linkButton} onClick={() => onSelectList(viewer)}>
            {t('backToMyList')}
          </button>
        )}
        {otherViewers.length > 0 && (
          <span className={styles.presence}>
            👀 {t('viewing')}: {otherViewers.join(', ')}
          </span>
        )}
      </div>

      {(isOffline || pendingCount > 0 || failedCount > 0 || loadError || legacyMutations().length > 0) && (
        <p className={styles.offlineBar} role="status">
          {isOffline && <span>📴 {t('offline')}</span>}
          {pendingCount > 0 && <span>⏳ {t('offlineChanges', { count: pendingCount })}</span>}
          {failedCount > 0 && <span>{t('syncConflicts', { count: failedCount })}</span>}
          {loadError && <span>{t('loadFailed')}</span>}
          <button onClick={() => void retrySync()}>{t('retry')}</button>
          <button onClick={() => setSheet('sync')}>{t('syncDetails')}</button>
        </p>
      )}

      {showIntro && <div className={styles.manualPreview} role="note">
        <p>{t('quickIntro')}</p>
        <button onClick={() => { localStorage.setItem(HELP_SEEN_KEY, '1'); setShowIntro(false); }}>{t('gotIt')}</button>
      </div>}
      <VoiceControls
        isSupported={isSupported}
        isListening={isListening}
        isStarting={isStarting}
        toggleListening={toggleListening}
        lang={lang}
        setLang={setLang}
        interimText={interimText}
        flushNow={flushNow}
      />

      {contextName && <p className={styles.voiceContext} role="status">{t('voiceContext', { name: contextName })}</p>}

      <form className={styles.form} onSubmit={handleManualAdd}>
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={t('addPlaceholder')}
          aria-label={t('addPlaceholder')}
        />
        <button type="submit" disabled={adding || !newItemName.trim()}>{adding ? t('saving') : t('add')}</button>
      </form>

      {newItemName.trim() && <p className={styles.manualPreview}>{t('willAdd')}: {manualItems.map(item => `${item.name} · ${formatQuantity(item, lang)}${item.note ? ` · ${item.note}` : ''}`).join(', ')}</p>}

      {typeaheadChips.length > 0 && (
        <div className={styles.suggestions}>
          {typeaheadChips.map((s) => (
            <button key={s.name} className={styles.chip} onClick={() => addSuggestion(s.name)}>
              {s.name}
            </button>
          ))}
        </div>
      )}

      {newItemName.trim().length < 2 && frequentChips.length > 0 && (
        <div className={styles.suggestions}>
          <span className={styles.chipLabel}>{t('frequent')}</span>
          {frequentChips.map((s) => (
            <button key={s.name} className={styles.chip} onClick={() => addSuggestion(s.name)}>
              + {s.name}
            </button>
          ))}
        </div>
      )}

      <div className={`${styles.list} ${dragId ? styles.listDragging : ''}`}>
        {loading && <p role="status">{t('loading')}</p>}
        {items.length === 0 && !loading && !loadError && <p className={styles.empty}>{t('emptyList')}</p>}

        {activeItems.map((item, index) => (
          <div key={item.id} className={styles.itemSlot}>
            {dropIndex === index && <div className={styles.dropLine} aria-hidden="true" />}
            <ItemRow
              item={item}
              {...rowProps}
              onDragStart={startDrag}
              onMoveByKeyboard={moveByKeyboard}
              isDragging={dragId === item.id}
              dragOffset={dragId === item.id ? dragOffset : 0}
              registerRow={registerRow}
            />
          </div>
        ))}
        {dropIndex === activeItems.length && <div className={styles.dropLine} aria-hidden="true" />}

        {boughtItems.length > 0 && (
          <>
            <div className={styles.boughtHeader}>
              <span>
                {t('bought')} ({boughtItems.length})
              </span>
              <button className={styles.clearBoughtButton} onClick={handleClearBought}>
                {t('clearBought')}
              </button>
            </div>
            {boughtItems.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </>
        )}

        <DeletedDrawer
          items={deletedItems}
          loading={deletedLoading}
          error={deletedError}
          onRetry={() => void retryDeleted()}
          onVisibilityChange={watchDeleted}
          onRestore={handleRestore}
          onPurge={handlePurge}
        />
      </div>

      {choice && (
        <Sheet title={choice.title} onClose={() => choose(null)}>
          <p className={styles.sheetSubtitle}>{t('voiceChoiceHint')}</p>
          <div className={styles.voiceChoices}>
            {choice.options.map((option) => (
              <button type="button" key={option.id} onClick={() => choose(option.id)}>{option.label}</button>
            ))}
          </div>
          <div className={styles.sheetActions}><button type="button" onClick={() => choose(null)}>{t('cancel')}</button></div>
        </Sheet>
      )}
      {sheet === 'share' && (
        <ShareSheet
          list={list}
          listName={listName}
          owned={currentList?.owned ?? list === viewer}
          onClose={() => setSheet('none')}
          onLeft={() => {
            setSheet('none');
            onSelectList(viewer);
            onListsChanged();
          }}
        />
      )}
      {sheet === 'import' && (
        <ImportSheet
          initialText={importText}
          onAdd={handleImport}
          onClose={() => setSheet('none')}
        />
      )}
      {sheet === 'lists' && (
        <ListsSheet
          lists={lists}
          loading={catalogLoading}
          error={catalogError}
          activeList={list}
          viewer={viewer}
          onSelectList={onSelectList}
          onListsChanged={onListsChanged}
          onClose={() => setSheet('none')}
        />
      )}
      {sheet === 'sync' && <SyncSheet onClose={() => setSheet('none')} onRetry={retrySync} />}
      {sheet === 'help' && <HelpSheet onClose={() => setSheet('none')} />}
      {sheet === 'settings' && (
        <SettingsSheet
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          onOpenHelp={() => setSheet('help')}
          onClose={() => setSheet('none')}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};
