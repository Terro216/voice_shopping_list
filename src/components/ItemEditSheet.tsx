import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { Item, ItemEdit } from '../api/items';
import { useNoteDictation } from '../hooks/useNoteDictation';
import { useWakeLock } from '../hooks/useWakeLock';
import { LANGUAGES, useT } from '../i18n';
import { Sheet } from './Sheet';
import { UNITS, convertQuantity, isValidQuantity, type Unit } from '../../shared/quantity.js';
import { unitLabel } from '../utils/quantity';
import styles from '../App.module.css';

type Props = {
  item: Item;
  focusNote: boolean;
  onEdit: (id: string, edit: ItemEdit, expected?: Item) => Promise<boolean | undefined>;
  onRemove: (id: string) => void;
  onClose: () => void;
};

const MAX_LENGTH = 200;
const normalize = (text: string) => text.trim().replace(/\s+/g, ' ');

export const ItemEditSheet = ({ item, focusNote, onEdit, onRemove, onClose }: Props) => {
  const { lang, t } = useT();
  const originalItem = useRef({ ...item });
  const [saveError, setSaveError] = useState(false);
  const original = useRef({ name: item.name, note: item.note ?? '', count: String(item.count), unit: item.unit ?? null });
  const draft = useRef({ ...original.current });
  const [name, setName] = useState(draft.current.name);
  const [note, setNote] = useState(draft.current.note);
  const [count, setCount] = useState(draft.current.count);
  const [unit, setUnit] = useState<Unit | null>(draft.current.unit);
  const [invalidQuantity, setInvalidQuantity] = useState(false);
  const [saving, setSaving] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const closed = useRef(false);
  const savingRef = useRef(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const noteInput = useRef<HTMLTextAreaElement>(null);
  const countInput = useRef<HTMLInputElement>(null);
  const nameId = useId();
  const noteId = useId();
  const hintId = useId();
  const countId = useId();
  const unitId = useId();

  const changeUnit = (next: Unit | null) => {
    const converted = convertQuantity(Number(draft.current.count.replace(',', '.')), draft.current.unit, next);
    if (converted !== null && converted > 0) {
      draft.current.count = String(converted);
      setCount(String(converted));
    }
    draft.current.unit = next;
    setUnit(next);
    setInvalidQuantity(false);
  };

  const changeNote = (value: string) => {
    draft.current.note = value;
    setNote(value);
  };
  const speechLang = LANGUAGES.find((option) => option.lang === lang)?.speech ?? 'ru-RU';
  const { status, isSupported, error, start, stop, cancel } = useNoteDictation(changeNote, speechLang);
  const recording = status !== 'idle';
  useWakeLock(recording);

  useEffect(() => {
    closed.current = false;
    return () => { closed.current = true; };
  }, []);

  const discard = useCallback(() => {
    closed.current = true;
    cancel();
    onClose();
  }, [cancel, onClose]);

  const save = useCallback(async () => {
    if (savingRef.current || closed.current) return;
    savingRef.current = true;
    setSaving(true);
    setSaveError(false);
    try {
      await stop();
      if (closed.current) return;
      const nextName = normalize(draft.current.name);
      const nextNote = normalize(draft.current.note);
      if (!nextName || nextName.length > MAX_LENGTH) {
        setInvalidName(true);
        nameInput.current?.focus();
        return;
      }
      if (nextNote.length > MAX_LENGTH) {
        noteInput.current?.focus();
        return;
      }
      const nextCount = Number(draft.current.count.replace(',', '.'));
      const nextUnit = draft.current.unit;
      if (!isValidQuantity(nextCount, nextUnit)) {
        setInvalidQuantity(true);
        countInput.current?.focus();
        return;
      }
      // Editing only the note must not overwrite a collaborator's new name.
      const edit: ItemEdit = {};
      if (nextName !== normalize(original.current.name)) edit.name = nextName;
      if (nextNote !== normalize(original.current.note)) edit.note = nextNote;
      if (nextCount !== Number(original.current.count) || nextUnit !== original.current.unit) {
        edit.count = nextCount;
        edit.unit = nextUnit;
      }
      if (Object.keys(edit).length && !await onEdit(item.id, edit, originalItem.current)) {
        setSaveError(true);
        return;
      }
      closed.current = true;
      onClose();
    } catch {
      if (!closed.current) setSaveError(true);
    } finally {
      savingRef.current = false;
      if (!closed.current) setSaving(false);
    }
  }, [item.id, onEdit, onClose, stop]);

  const tooLong = normalize(note).length > MAX_LENGTH;
  const speechError = error === 'not-allowed' || error === 'service-not-allowed'
    ? 'micDenied'
    : error === 'no-speech' ? 'noteNoSpeech' : 'noteVoiceFailed';

  return (
    <Sheet title={t('editItemTitle')} onClose={save} onEscape={discard} initialFocusRef={focusNote ? noteInput : nameInput}>
      <form className={styles.itemEditor} onSubmit={(event) => { event.preventDefault(); void save(); }}>
        <label className={styles.editorField} htmlFor={nameId}>
          {t('renamePlaceholder')}
          <input id={nameId} ref={nameInput} value={name} maxLength={MAX_LENGTH} aria-invalid={invalidName}
            onChange={(event) => { draft.current.name = event.target.value; setName(event.target.value); setInvalidName(false); }} />
        </label>
        {invalidName && <p className={styles.error} role="alert">{t('itemNameRequired')}</p>}
        <div className={styles.quantityFields}>
          <label className={styles.editorField} htmlFor={countId}>
            {t('quantityLabel')}
            <input id={countId} ref={countInput} value={count} inputMode="decimal" aria-invalid={invalidQuantity}
              onChange={(event) => { draft.current.count = event.target.value; setCount(event.target.value); setInvalidQuantity(false); }} />
          </label>
          <label className={styles.editorField} htmlFor={unitId}>
            {t('unitLabel')}
            <select id={unitId} aria-label={t('unitLabel')} value={unit ?? ''} onChange={(event) => changeUnit((event.target.value || null) as Unit | null)}>
              <option value="">{t('unitNone')}</option>
              {UNITS.map((value) => <option key={value} value={value}>{unitLabel(value, lang)}</option>)}
            </select>
          </label>
        </div>
        {invalidQuantity && <p className={styles.error} role="alert">{t('invalidQuantity')}</p>}
        <label className={styles.editorField} htmlFor={noteId}>
          {t('notePlaceholder')}
          <textarea id={noteId} ref={noteInput} value={note} rows={4} maxLength={MAX_LENGTH}
            placeholder={t('noteExample')} readOnly={recording || saving} aria-describedby={hintId} aria-invalid={tooLong}
            onChange={(event) => changeNote(event.target.value)} />
        </label>
        <div className={styles.noteTools}>
          {isSupported ? (
            <button type="button" className={`${styles.micButton} ${recording ? styles.active : ''}`}
              disabled={status === 'stopping' || saving}
              onClick={() => { if (recording) void stop(); else start(draft.current.note); }}>
              {status === 'stopping' ? t('noteFinishing') : recording ? t('noteStopVoice') : t('noteDictate')}
            </button>
          ) : <span className={styles.sheetHint}>{t('noteVoiceUnsupported')}</span>}
          <button type="button" disabled={!note || recording || saving} onClick={() => { changeNote(''); noteInput.current?.focus(); }}>
            {t('clearNote')}
          </button>
          <span className={styles.noteCount}>{normalize(note).length}/{MAX_LENGTH}</span>
        </div>
        <p id={hintId} className={styles.sheetHint}>{t(recording ? 'noteListeningHint' : 'noteDictationHint')}</p>
        {tooLong && <p className={styles.error} role="alert">{t('noteTooLong')}</p>}
        {error && <p className={styles.error} role="alert">{t(speechError)}</p>}
        <p className={styles.sheetHint}>{t('editorCloseHint')}</p>
        {saveError && <p className={styles.error} role="alert">{t('saveFailed')}</p>}
        <div className={styles.itemEditorActions}>
          <button type="submit" disabled={saving || tooLong}>{saving ? t('saving') : t('save')}</button>
          <button type="button" onClick={discard}>{t('cancel')}</button>
          <button type="button" className={styles.removeButton} disabled={saving}
            onClick={() => { discard(); onRemove(item.id); }} aria-label={t('removeItem', { name: item.name })}>
            🗑
          </button>
        </div>
      </form>
    </Sheet>
  );
};
