import { Item } from '../api/items';
import styles from '../App.module.css';

type Props = {
  item: Item;
  onToggleBought: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export const ItemRow = ({ item, onToggleBought, onIncrement, onDecrement, onRemove }: Props) => (
  <div className={`${styles.item} ${item.bought ? styles.itemBought : ''}`}>
    <button
      type="button"
      className={styles.itemMain}
      onClick={() => onToggleBought(item.id)}
      aria-label={item.bought ? `Return ${item.name} to the list` : `Mark ${item.name} as bought`}
    >
      <span className={styles.checkbox} aria-hidden="true">
        {item.bought ? '✓' : ''}
      </span>
      <span className={styles.itemName}>{item.name}</span>
      {item.count > 1 && <span className={styles.itemCount}>×{item.count}</span>}
    </button>
    <div className={styles.itemControls}>
      {!item.bought && (
        <>
          <button onClick={() => onIncrement(item.id)} aria-label={`One more ${item.name}`}>
            +
          </button>
          <button onClick={() => onDecrement(item.id)} aria-label={`One less ${item.name}`}>
            −
          </button>
        </>
      )}
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
