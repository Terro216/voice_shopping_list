import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import type { Item, ItemEdit } from '../api/items';
import type { ListSummary } from '../api/lists';
import { useT, type Lang } from '../i18n';
import { parseSpeechUtterance, type SpeechCommand } from '../utils/speechParser';
import { conversationMatches, correctionEdit, destinationMatches, itemFingerprint } from '../utils/conversation';
import { formatQuantity } from '../utils/quantity';
import { isValidQuantity } from '../../shared/quantity.js';
import { cue } from '../utils/feedback';

type Options = {
  list: string;
  lang: Lang;
  lists: ListSummary[];
  getItems: () => Item[];
  editItem: (id: string, edit: ItemEdit, expected: Item) => Promise<boolean | undefined>;
  moveItem: (id: string, destination: string, expected: Item) => Promise<boolean>;
  executeBasic: (command: SpeechCommand, text: string, targets?: (Item | undefined)[]) => Promise<Item | undefined>;
};

export type VoiceChoice = { title: string; options: { id: string; label: string }[] };
const CONTEXT_MS = 120_000;

export const useConversation = (options: Options) => {
  const { t } = useT();
  const latest = useRef({ ...options, t });
  useEffect(() => { latest.current = { ...options, t }; });
  const [choice, setChoice] = useState<VoiceChoice | null>(null);
  const [contextName, setContextName] = useState<string | null>(null);
  const context = useRef<{ item: Item; until: number } | null>(null);
  const contextTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resolver = useRef<((id: string | null) => void) | null>(null);
  const queue = useRef(Promise.resolve());
  const generation = useRef(0);

  const clearContext = useCallback(() => {
    clearTimeout(contextTimer.current);
    context.current = null;
    setContextName(null);
  }, []);

  const choose = useCallback((id: string | null) => {
    const resolve = resolver.current;
    resolver.current = null;
    setChoice(null);
    resolve?.(id);
  }, []);

  useEffect(() => {
    const epoch = ++generation.current;
    clearContext();
    choose(null);
    return () => {
      generation.current = epoch + 1;
      clearTimeout(contextTimer.current);
      context.current = null;
      resolver.current?.(null);
      resolver.current = null;
    };
  }, [options.list, options.lang, clearContext, choose]);

  const remember = (item: Item) => {
    clearTimeout(contextTimer.current);
    context.current = { item: { ...item }, until: Date.now() + CONTEXT_MS };
    setContextName(item.name);
    contextTimer.current = setTimeout(clearContext, CONTEXT_MS);
  };

  const ask = (value: VoiceChoice) => new Promise<string | null>((resolve) => {
    resolver.current = resolve;
    setChoice(value);
  });

  const process = async (text: string, epoch: number) => {
    const valid = () => generation.current === epoch;
    for (const command of parseSpeechUtterance(text)) {
      if (!valid()) return;
      const ops = latest.current;
      const fail = (message: string) => {
        clearContext();
        cue('unrecognized');
        toast.error(message, { id: 'speech' });
      };
      if (command.type === 'unrecognized') {
        fail(ops.t('voiceCorrectionHelp'));
        return;
      }
      if (command.type !== 'correct' && command.type !== 'move') {
        clearContext();
        const targets: (Item | undefined)[] = [];
        if (command.type === 'check' || command.type === 'remove') {
          for (const query of command.queries) {
            const matches = conversationMatches(ops.getItems().filter(item => command.type !== 'check' || !item.bought), query);
            let selected = matches[0];
            if (matches.length > 1) {
              const id = await ask({ title: ops.t('voiceChooseItem'), options: matches.map(item => ({
                id: item.id, label: `${item.name} · ${formatQuantity(item, ops.lang)}${item.note ? ` · ${item.note}` : ''}`,
              })) });
              if (!valid() || !id) return;
              selected = matches.find(item => item.id === id)!;
            }
            targets.push(selected);
          }
          if (targets.some(item => item && !ops.getItems().some(current => itemFingerprint(current) === itemFingerprint(item)))) {
            fail(ops.t('voiceItemChanged')); return;
          }
        }
        const item = await ops.executeBasic(command, text, targets);
        if (!valid()) return;
        if (item) remember(item);
        // Do not let a following "no, three" repair a failed add.
        if (command.type === 'add' && !item) return;
        continue;
      }

      let candidates: Item[];
      let needsChoice = false;
      if (command.query !== null) {
        candidates = conversationMatches(ops.getItems(), command.query);
      } else if (context.current && context.current.until > Date.now()) {
        const previous = context.current.item;
        const current = ops.getItems().find((item) => item.id === previous.id);
        if (!current || itemFingerprint(current) !== itemFingerprint(previous)) {
          fail(ops.t('voiceItemChanged'));
          return;
        }
        candidates = [current];
      } else {
        candidates = ops.getItems();
        needsChoice = true;
      }
      if (!candidates.length) {
        fail(command.query ? ops.t('notOnList', { items: command.query }) : ops.t('voiceNoContext'));
        return;
      }

      let selected = candidates[0];
      if (needsChoice || candidates.length > 1) {
        const id = await ask({
          title: ops.t('voiceChooseItem'),
          options: candidates.map((item) => ({
            id: item.id,
            label: `${item.name} · ${formatQuantity(item, ops.lang)}${item.note ? ` · ${item.note}` : ''}${item.bought ? ` · ${ops.t('bought')}` : ''}`,
          })),
        });
        if (!valid()) return;
        if (!id) { clearContext(); return; }
        selected = candidates.find((item) => item.id === id)!;
      }
      if (!selected) return;

      if (command.type === 'move') {
        const destinations = destinationMatches(latest.current.lists, command.destination);
        if (!destinations.length) { fail(ops.t('voiceListMissing', { name: command.destination })); return; }
        let destination = destinations[0];
        if (destinations.length > 1) {
          const id = await ask({ title: ops.t('voiceChooseList'), options: destinations.map((entry) => ({ id: entry.id, label: `${entry.name} · ${entry.owner}` })) });
          if (!valid()) return;
          if (!id) { clearContext(); return; }
          destination = destinations.find((entry) => entry.id === id)!;
        }
        if (!destination || destination.id === ops.list) { fail(ops.t('voiceSameList')); return; }
        const ok = await latest.current.moveItem(selected.id, destination.id, selected);
        if (!valid()) return;
        clearContext();
        if (!ok) { fail(ops.t('voiceChangeFailed')); return; }
        cue('added');
        toast.success(ops.t('voiceMoved', { name: selected.name, list: destination.name }), { id: 'speech' });
        continue;
      }

      const edit = correctionEdit(selected, command.change);
      if (!edit || (edit.name !== undefined && (!edit.name.trim() || edit.name.length > 200))) {
        fail(ops.t('voiceCorrectionHelp'));
        return;
      }
      if (edit.count !== undefined && !isValidQuantity(edit.count, edit.unit)) {
        fail(ops.t('invalidQuantity'));
        return;
      }
      const ok = await latest.current.editItem(selected.id, edit, selected);
      if (!valid()) return;
      if (!ok) { fail(ops.t('voiceChangeFailed')); return; }
      const updated = latest.current.getItems().find((item) => item.id === selected.id);
      if (updated) remember(updated);
      cue('added');
      toast.success(ops.t('voiceCorrected', { name: updated?.name ?? selected.name, quantity: formatQuantity(updated ?? selected, ops.lang) }), { id: 'speech' });
    }
  };
  const processRef = useRef(process);
  useEffect(() => { processRef.current = process; });

  const handleSpeech = useCallback((text: string) => {
    // The microphone pauses while a choice is visible; ignore late finals too.
    if (resolver.current) return;
    const epoch = generation.current;
    queue.current = queue.current.then(() => processRef.current(text, epoch)).catch(() => {
      if (epoch !== generation.current) return;
      clearContext();
      toast.error(latest.current.t('voiceChangeFailed'), { id: 'speech' });
    });
    return queue.current;
  }, [clearContext]);

  return { handleSpeech, choice, choose, contextName, clearContext };
};
