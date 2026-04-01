import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { Item, fetchItems, createItem, incrementItemReq, decrementItemReq, deleteItemReq, syncOfflineQueue } from '../api/items';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { VoiceControls } from './VoiceControls';
import { ItemRow } from './ItemRow';
import { parseSpeechText } from '../utils/speechParser';
import styles from '../App.module.css';

type Props = {
  username: string; // The list we are viewing
  onLogout: () => void;
};

export const ShoppingList: React.FC<Props> = ({ username, onLogout }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [language, setLanguage] = useState('ru-RU');

  const loadItems = useCallback(async (isBackgroundSync = false) => {
    try {
      const data = await fetchItems(username);
      setItems(prev => {
        if (isBackgroundSync && prev.length !== data.length) {
          toast('List was updated by someone else', { icon: '🔄' });
        }
        return data;
      });
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  }, [username]);

  useEffect(() => {
    loadItems();
    
    // WebSockets Real-time Sync
    const socket = io();
    socket.emit('join_list', username);
    
    socket.on('list_updated', () => {
      loadItems(true);
    });

    const handleOnline = () => {
      toast.success('Back online! Syncing data...');
      syncOfflineQueue().then(() => loadItems());
    };
    
    const handleOffline = () => {
      toast.error('Offline mode. Changes will be saved locally.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      socket.disconnect();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadItems, username]);

  const performAddItem = async (name: string) => {
    if (!name.trim() || !username) return;

    const id = Date.now().toString() + Math.random().toString(36).substring(2);
    const newItem = { id, name: name.trim(), count: 1, username };

    setItems(prev => [...prev, newItem]);

    try {
      await createItem(newItem);
    } catch (err) {
      toast.error('Failed to save item immediately');
      loadItems(); // Rollback on error if not handled by offline queue
    }
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    performAddItem(newItemName);
    setNewItemName('');
  };

  const parseAndAddSpeechText = useCallback((text: string) => {
    const validItems = parseSpeechText(text);
    if (validItems.length > 0) {
      toast.success(`Recognized: ${validItems.join(', ')}`);
    }
    validItems.forEach(item => {
      performAddItem(item);
    });
  }, [username]);

  const { isListening, toggleListening, interimText, isSupported } = useSpeechRecognition(parseAndAddSpeechText, language);

  const handleRemove = async (id: string) => {
    const previousItems = [...items];
    setItems(items.filter(item => item.id !== id));
    try {
      await deleteItemReq(id, username);
    } catch (err) {
      setItems(previousItems);
    }
  };

  const handleIncrement = async (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, count: item.count + 1 } : item));
    try {
      await incrementItemReq(id, username);
    } catch (err) {
      loadItems();
    }
  };

  const handleDecrement = async (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item)
                 .filter(item => item.count > 0));
    try {
      await decrementItemReq(id, username);
    } catch (err) {
      loadItems();
    }
  };

  const copyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('list', username);
    navigator.clipboard.writeText(url.toString());
    toast.success('Share link copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className={styles.title} style={{ marginBottom: 0 }}>Shopping List</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={copyShareLink}>
            🔗 Share List
          </button>
          <button onClick={() => {
            onLogout();
            toast('Logged out', { icon: '👋' });
          }} style={{ height: 'fit-content' }}>Logout</button>
        </div>
      </div>
      
      <p style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>Active List: <strong>{username}</strong></p>

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
        />
        <button type="submit">Add</button>
      </form>
      
      <div style={{ width: '100%' }}>
        {items.map(item => (
          <ItemRow 
            key={item.id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};
