import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useShoppingList } from '../hooks/useShoppingList';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSuggestions } from '../hooks/useSuggestions';
import { useWakeLock } from '../hooks/useWakeLock';
import type { ThemeChoice } from '../hooks/useTheme';
import { VoiceControls } from './VoiceControls';
import { ItemRow } from './ItemRow';
import { PushToggle } from './PushToggle';
import { ShareSheet } from './ShareSheet';
import { SettingsSheet } from './SettingsSheet';
import { parseSpeechCommand, ParsedItem } from '../utils/speechParser';
import { findBestMatch } from '../utils/matchItem';
import { cue, haptic } from '../utils/feedback';
import { LANGUAGES, useT, type Lang } from '../i18n';
import type { ListSummary } from '../api/lists';
import styles from '../App.module.css';

type Props = {
  username: string; // the list being viewed — not necessarily the viewer's own
  viewer: string; // the logged-in account
  lists: ListSummary[];
  onSelectList: (list: string) => void;
  onListsChanged: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: ThemeChoice;
  setTheme: (theme: ThemeChoice) => void;
  onLogout: () => void;
};

export const ShoppingList = ({
  username,
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
    clearBought,
    undo,
  } = useShoppingList(username, viewer);
  const [newItemName, setNewItemName] = useState('');
  const [sheet, setSheet] = useState<'none' | 'share' | 'settings'>('none');
  const { frequent, matches, refreshFrequent } = useSuggestions(username, newItemName);

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
      toast(t('undone', { label }), { icon: '↩️' });
    } else {
      toast(t('nothingToUndo'));
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
        { icon: '🗑' },
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
              { icon: '🤔' },
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
            else toast.success(message);
          }
          if (missed.length > 0) {
            cue('unrecognized');
            toast.error(t('notOnList', { items: missed.join(', ') }));
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
    if (item) toastWithUndo(t('removed', { items: item.name }));
  };

  const handleClearBought = () => {
    clearBought();
    toastWithUndo(t('boughtCleared'));
  };

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

  const activeItems = items.filter((item) => !item.bought);
  const boughtItems = items.filter((item) => item.bought);

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
        <h1 className={styles.title}>{t('listTitle')}</h1>
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
          <PushToggle list={username} />
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
        {lists.length > 1 ? (
          <label className={styles.listPicker}>
            <span>{t('activeList')}</span>
            <select value={username} onChange={(e) => onSelectList(e.target.value)}>
              {lists.map((entry) => (
                <option key={entry.name} value={entry.name}>
                  {entry.owned ? `${entry.name} (${t('myList')})` : entry.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span className={styles.activeList}>
            {t('activeList')}: <strong>{username}</strong>
          </span>
        )}
        {username !== viewer && (
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

      <div className={styles.list}>
        {items.length === 0 && <p className={styles.empty}>{t('emptyList')}</p>}
        {activeItems.map((item) => (
          <ItemRow key={item.id} item={item} {...rowProps} />
        ))}

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
      </div>

      {sheet === 'share' && (
        <ShareSheet
          list={username}
          viewer={viewer}
          onClose={() => setSheet('none')}
          onLeft={() => {
            setSheet('none');
            onSelectList(viewer);
            onListsChanged();
          }}
        />
      )}
      {sheet === 'settings' && (
        <SettingsSheet
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          onClose={() => setSheet('none')}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};
