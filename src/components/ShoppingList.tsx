import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useShoppingList } from '../hooks/useShoppingList';
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
import { parseSpeechCommand, ParsedItem } from '../utils/speechParser';
import { takeMicIntent, takeSharedText } from '../launchIntent';
import { findBestMatch } from '../utils/matchItem';
import { cue, haptic } from '../utils/feedback';
import { LANGUAGES, useT, type Lang } from '../i18n';
import type { ListSummary } from '../api/lists';
import styles from '../App.module.css';

type Props = {
  list: string; // the list being viewed — not necessarily the viewer's own
  viewer: string; // the logged-in account
  lists: ListSummary[];
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
    accessDenied,
    addItem,
    removeItem,
    editItem,
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
  const [sheet, setSheet] = useState<'none' | 'share' | 'settings' | 'import' | 'lists' | 'help'>(
    'none',
  );
  const [importText, setImportText] = useState('');
  const { frequent, matches, refreshFrequent } = useSuggestions(list, newItemName);

  const currentList = lists.find((entry) => entry.id === list);
  // Until the catalog arrives there is no name to show. The account's own list
  // is named after them so that reads fine; any other id is a random token and
  // a neutral word beats showing it.
  const listName = currentList?.name ?? (list === viewer ? viewer : t('activeList'));

  const addAndRefresh = useCallback(
    async (name: string, count = 1) => {
      await addItem(name, count);
      refreshFrequent();
    },
    [addItem, refreshFrequent],
  );

  const performUndo = useCallback(async () => {
    const label = await undo();
    if (label) {
      toast(t('undone', { label }), { icon: '↩️', id: ITEM_TOAST });
    } else {
      toast(t('nothingToUndo'), { id: ITEM_TOAST });
    }
  }, [undo, t]);

  /** Toast that offers to take the action back — the store-aisle safety net. */
  const toastWithUndo = useCallback(
    (message: string) => {
      toast(
        (instance) => (
          <span className={styles.toastWithAction}>
            {message}
            <button
              type="button"
              onClick={() => {
                toast.dismiss(instance.id);
                void performUndo();
              }}
            >
              {t('returnAction')}
            </button>
          </span>
        ),
        { icon: '🗑', id: ITEM_TOAST },
      );
    },
    [performUndo, t],
  );

  const handleSpeech = useCallback(
    async (text: string) => {
      const command = parseSpeechCommand(text);

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
          cue('added');
          toast.success(
            t('recognized', {
              items: command.items
                .map((p: ParsedItem) => (p.count > 1 ? `${p.name} ×${p.count}` : p.name))
                .join(', '),
            }),
            { id: SPEECH_TOAST },
          );
          // Sequential: two mentions of the same item in one utterance must see
          // each other, otherwise they race into two rows instead of one ×2.
          for (const parsed of command.items) {
            await addAndRefresh(parsed.name, parsed.count);
          }
          break;
        }
        case 'check':
        case 'remove': {
          const found: string[] = [];
          const missed: string[] = [];
          for (const query of command.queries) {
            const item = findBestMatch(items, query);
            if (!item) {
              missed.push(query);
              continue;
            }
            found.push(item.name);
            if (command.type === 'check') {
              await setBought(item.id, true);
            } else {
              await removeItem(item.id);
            }
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
          await clearBought();
          toastWithUndo(t('boughtCleared'));
          break;
        case 'undo':
          await performUndo();
          break;
      }
    },
    [items, addAndRefresh, setBought, removeItem, clearBought, performUndo, toastWithUndo, t],
  );

  const onSpeechError = useCallback(
    (error: string) => {
      if (error !== 'audio-capture') toast.error(t('micDenied'));
    },
    [t],
  );

  const speechLang = LANGUAGES.find((option) => option.lang === lang)?.speech ?? 'ru-RU';
  const { isListening, toggleListening, interimText, isSupported } = useSpeechRecognition(
    handleSpeech,
    speechLang,
    onSpeechError,
  );

  // Keep the phone awake while dictating in the store.
  useWakeLock(isListening);

  const openImport = (text = '') => {
    setImportText(text);
    setSheet('import');
  };

  const handleImport = useCallback(
    async (parsed: ParsedItem[]) => {
      setSheet('none');
      for (const item of parsed) {
        await addAndRefresh(item.name, item.count);
      }
      if (parsed.length > 0) {
        cue('added');
        toast.success(t('imported', { count: parsed.length }), { id: ITEM_TOAST });
      }
    },
    [addAndRefresh, t],
  );

  // Text shared into the app from another one lands in the import screen.
  useEffect(() => {
    const shared = takeSharedText();
    if (shared) openImport(shared);
  }, []);

  // Nothing on screen says "you can just talk to it", so the first visit gets
  // the instructions once. Afterwards they live behind the ❓ button.
  useEffect(() => {
    if (localStorage.getItem(HELP_SEEN_KEY)) return;
    localStorage.setItem(HELP_SEEN_KEY, '1');
    setSheet((current) => (current === 'none' ? 'help' : current));
  }, []);

  // Opened from the home-screen "mic" shortcut: start listening right away
  // instead of making them find the button. takeMicIntent answers once, so a
  // re-run of this effect cannot toggle the mic back off.
  useEffect(() => {
    if (isSupported && takeMicIntent()) toggleListening();
  }, [isSupported, toggleListening]);

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addAndRefresh(newItemName);
    setNewItemName('');
  };

  const addSuggestion = (name: string) => {
    addAndRefresh(name);
    setNewItemName('');
  };

  const handleRemove = (id: string) => {
    const item = items.find((candidate) => candidate.id === id);
    removeItem(id);
    if (item) {
      cue('removed');
      toastWithUndo(t('removed', { items: item.name }));
    }
  };

  const handleClearBought = () => {
    clearBought();
    toastWithUndo(t('boughtCleared'));
  };

  const handleRestore = (id: string) => {
    const item = deletedItems.find((candidate) => candidate.id === id);
    restoreDeleted(id);
    if (item) toast.success(t('restored', { name: item.name }), { id: ITEM_TOAST });
  };

  const handlePurge = () => {
    purgeDeleted();
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
    onIncrement: (id: string) => changeCount(id, +1),
    onDecrement: (id: string) => changeCount(id, -1),
    onEdit: editItem,
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

      {(isOffline || pendingCount > 0) && (
        <p className={styles.offlineBar} role="status">
          {isOffline && <span>📴 {t('offline')}</span>}
          {pendingCount > 0 && <span>⏳ {t('offlineChanges', { count: pendingCount })}</span>}
        </p>
      )}

      <VoiceControls
        isSupported={isSupported}
        isListening={isListening}
        toggleListening={toggleListening}
        lang={lang}
        setLang={setLang}
        interimText={interimText}
      />

      <form className={styles.form} onSubmit={handleManualAdd}>
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={t('addPlaceholder')}
          aria-label={t('addPlaceholder')}
        />
        <button type="submit">{t('add')}</button>
      </form>

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
        {items.length === 0 && <p className={styles.empty}>{t('emptyList')}</p>}

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

        {activeItems.length > 1 && <p className={styles.reorderHint}>{t('reorderHint')}</p>}

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
          onVisibilityChange={watchDeleted}
          onRestore={handleRestore}
          onPurge={handlePurge}
        />
      </div>

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
          activeList={list}
          viewer={viewer}
          onSelectList={onSelectList}
          onListsChanged={onListsChanged}
          onClose={() => setSheet('none')}
        />
      )}
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
