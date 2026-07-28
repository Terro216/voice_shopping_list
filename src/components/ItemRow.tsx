import { Item } from '../api/items';
import styles from '../App.module.css';

type Props = {
  item: Item;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export const ItemRow = ({ item, onIncrement, onDecrement, onRemove }: Props) => (
  <div className={styles.item}>
    <span className={styles.itemName}>{item.name}</span>
    <div className={styles.itemControls}>
      <span className={styles.itemCount}>×{item.count}</span>
      <button onClick={() => onIncrement(item.id)} aria-label={`One more ${item.name}`}>
        +
      </button>
      <button onClick={() => onDecrement(item.id)} aria-label={`One less ${item.name}`}>
        −
      </button>
      <button
        className={styles.removeButton}
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        🗑
      </button>
    </div>
  </div>
);
