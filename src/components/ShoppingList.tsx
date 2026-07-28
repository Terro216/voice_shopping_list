import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useShoppingList } from '../hooks/useShoppingList';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { VoiceControls } from './VoiceControls';
import { ItemRow } from './ItemRow';
import { parseSpeechText } from '../utils/speechParser';
import styles from '../App.module.css';

type Props = {
  username: string; // the list being viewed — not necessarily the viewer's own
  onLogout: () => void;
};

export const ShoppingList = ({ username, onLogout }: Props) => {
  const { items, addItem, removeItem, changeCount } = useShoppingList(username);
  const [newItemName, setNewItemName] = useState('');
  const [language, setLanguage] = useState('ru-RU');

  const handleSpeech = useCallback(
    (text: string) => {
      const parsed = parseSpeechText(text);
      if (parsed.length === 0) return;
      toast.success(
        `Recognized: ${parsed.map((p) => (p.count > 1 ? `${p.name} ×${p.count}` : p.name)).join(', ')}`,
      );
      parsed.forEach((p) => addItem(p.name, p.count));
    },
    [addItem],
  );

  const { isListening, toggleListening, interimText, isSupported } = useSpeechRecognition(
    handleSpeech,
    language,
  );

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(newItemName);
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Shopping List</h1>
        <div className={styles.headerActions}>
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

      <div className={styles.list}>
        {items.length === 0 && (
          <p className={styles.empty}>The list is empty — dictate or type something to buy.</p>
        )}
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onIncrement={(id) => changeCount(id, +1)}
            onDecrement={(id) => changeCount(id, -1)}
            onRemove={removeItem}
          />
        ))}
      </div>
    </div>
  );
};
