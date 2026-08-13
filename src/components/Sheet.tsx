import { useEffect, useRef } from 'react';
import { useT } from '../i18n';
import styles from '../App.module.css';

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Modal panel used by the share, settings, help and list screens. */
export const Sheet = ({ title, onClose, children }: Props) => {
  const { t } = useT();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    // Whatever opened the sheet gets the focus back when it closes, so a
    // keyboard or screen-reader user is not dumped at the top of the page.
    const opener = document.activeElement as HTMLElement | null;
    panel?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      // Keep Tab inside the panel: a modal whose focus wanders behind it lets
      // people type into a list they cannot see.
      const targets = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (node) => node.offsetParent !== null || node === document.activeElement,
      );
      if (targets.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }

      const first = targets[0];
      const last = targets[targets.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panel || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div className={styles.sheetBackdrop} onClick={onClose}>
      <div
        ref={panelRef}
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>{title}</h2>
          <button type="button" className={styles.iconButton} onClick={onClose} aria-label={t('close')}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
