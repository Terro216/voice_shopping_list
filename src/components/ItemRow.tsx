import React from 'react';
import { Item } from '../api/items';
import styles from '../App.module.css';

type Props = {
  item: Item;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export const ItemRow: React.FC<Props> = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className={styles.item}>
      <span>{item.name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '1rem' }}>x{item.count}</span>
        <button onClick={() => onIncrement(item.id)}>+</button>
        <button onClick={() => onDecrement(item.id)}>-</button>
        <button 
          onClick={() => onRemove(item.id)} 
          style={{ marginLeft: '0.5rem', color: 'red', cursor: 'pointer' }}
        >
          🗑
        </button>
      </div>
    </div>
  );
};
