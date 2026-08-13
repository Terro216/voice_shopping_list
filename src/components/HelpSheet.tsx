import { useT, type TranslationKey } from '../i18n';
import { Sheet } from './Sheet';
import styles from '../App.module.css';

type Props = {
  onClose: () => void;
};

const SECTIONS: { title: TranslationKey; body: TranslationKey }[] = [
  { title: 'helpVoiceTitle', body: 'helpVoiceText' },
  { title: 'helpCommandsTitle', body: 'helpCommandsText' },
  { title: 'helpGesturesTitle', body: 'helpGesturesText' },
  { title: 'helpListsTitle', body: 'helpListsText' },
  { title: 'helpShareTitle', body: 'helpShareText' },
  { title: 'helpOfflineTitle', body: 'helpOfflineText' },
];

/**
 * What the app can do, in the order somebody meeting it for the first time
 * needs it. Opened automatically once, on the first visit, because nothing else
 * on screen explains that you can simply talk to it.
 */
export const HelpSheet = ({ onClose }: Props) => {
  const { t } = useT();

  return (
    <Sheet title={t('help')} onClose={onClose}>
      <p className={styles.sheetSubtitle}>{t('helpIntro')}</p>

      {SECTIONS.map((section) => (
        <section key={section.title} className={styles.helpSection}>
          <h3 className={styles.helpTitle}>{t(section.title)}</h3>
          <p className={styles.helpText}>{t(section.body)}</p>
        </section>
      ))}

      <p className={styles.sheetHint}>{t('helpFooter')}</p>
      <div className={styles.sheetActions}>
        <button type="button" onClick={onClose}>
          {t('close')}
        </button>
      </div>
    </Sheet>
  );
};
