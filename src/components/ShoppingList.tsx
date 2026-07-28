import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useShoppingList } from '../hooks/useShoppingList';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSuggestions } from '../hooks/useSuggestions';
import { useWakeLock } from '../hooks/useWakeLock';
import { VoiceControls } from './VoiceControls';
import { ItemRow } from './ItemRow';
import { PushToggle } from './PushToggle';
import { parseSpeechCommand, ParsedItem } from '../utils/speechParser';
import { findBestMatch } from '../utils/matchItem';
import styles from '../App.module.css';

type Props = {
  username: string; // the list being viewed — not necessarily the viewer's own
  viewer: string; // the logged-in account
  onLogout: () => void;
};

export const ShoppingList = ({ username, viewer, onLogout }: Props) => {
  const {
    items,
    otherViewers,
    addItem,
    removeItem,
    changeCount,
    setBought,
    toggleBought,
    clearBought,
    undo,
  } = useShoppingList(username, viewer);
  const [newItemName, setNewItemName] = useState('');
  const [language, setLanguage] = useState('ru-RU');
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
      toast(`Undone: ${label}`, { icon: '↩️' });
    } else {
      toast('Nothing to undo');
    }
  }, [undo]);

  const handleSpeech = useCallback(
    (text: string) => {
      const command = parseSpeechCommand(text);

      switch (command.type) {
        case 'add': {
          if (command.items.length === 0) return;
          toast.success(
            `Recognized: ${command.items
              .map((p: ParsedItem) => (p.count > 1 ? `${p.name} ×${p.count}` : p.name))
              .join(', ')}`,
          );
          command.items.forEach((p) => addAndRefresh(p.name, p.count));
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
              setBought(item.id, true);
            } else {
              removeItem(item.id);
            }
          }
          if (found.length > 0) {
            toast.success(
              `${command.type === 'check' ? 'Checked off' : 'Removed'}: ${found.join(', ')}`,
            );
          }
          if (missed.length > 0) {
            toast.error(`Not on the list: ${missed.join(', ')}`);
          }
          break;
        }
        case 'clearBought':
          clearBought();
          toast.success('Bought items cleared');
          break;
        case 'undo':
          performUndo();
          break;
      }
    },
    [items, addAndRefresh, setBought, removeItem, clearBought, performUndo],
  );

  const { isListening, toggleListening, interimText, isSupported } = useSpeechRecognition(
    handleSpeech,
    language,
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

  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('list', username);
    try {
      await navigator.clipboard.writeText(url.toString());
      toast.success('Share link copied to clipboard!');
    } catch {
      toast.error('Could not access clipboard — copy the URL manually');
    }
  };

  const activeItems = items.filter((item) => !item.bought);
  const boughtItems = items.filter((item) => item.bought);

  const itemNames = new Set(items.map((item) => item.name.toLowerCase()));
  const frequentChips = frequent.filter((s) => !itemNames.has(s.name.toLowerCase())).slice(0, 6);
  const typeaheadChips = matches.filter((s) => !itemNames.has(s.name.toLowerCase())).slice(0, 5);

  const rowProps = {
    onToggleBought: toggleBought,
    onIncrement: (id: string) => changeCount(id, +1),
    onDecrement: (id: string) => changeCount(id, -1),
    onRemove: removeItem,
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Shopping List</h1>
        <div className={styles.headerActions}>
          <PushToggle list={username} />
          <button onClick={copyShareLink}>🔗 Share</button>
          <button
            onClick={() => {
              onLogout();
              toast('Logged out', { icon: '👋' });
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <p className={styles.activeList}>
        Active list: <strong>{username}</strong>
        {otherViewers.length > 0 && (
          <span className={styles.presence}> 👀 {otherViewers.join(', ')}</span>
        )}
      </p>

      <VoiceControls
        isSupported={isSupported}
        isListening={isListening}
        toggleListening={toggleListening}
        language={language}
        setLanguage={setLanguage}
        interimText={interimText}
      />

      <form className={styles.form} onSubmit={handleManualAdd}>
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Type new item manually..."
          aria-label="New item name"
        />
        <button type="submit">Add</button>
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
          <span className={styles.chipLabel}>Frequent:</span>
          {frequentChips.map((s) => (
            <button key={s.name} className={styles.chip} onClick={() => addSuggestion(s.name)}>
              + {s.name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.list}>
        {items.length === 0 && (
          <p className={styles.empty}>The list is empty — dictate or type something to buy.</p>
        )}
        {activeItems.map((item) => (
          <ItemRow key={item.id} item={item} {...rowProps} />
        ))}

        {boughtItems.length > 0 && (
          <>
            <div className={styles.boughtHeader}>
              <span>Bought ({boughtItems.length})</span>
              <button className={styles.clearBoughtButton} onClick={() => clearBought()}>
                Clear bought
              </button>
            </div>
            {boughtItems.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
