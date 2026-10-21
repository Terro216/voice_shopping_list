import { useCallback, useRef, useState } from 'react';
import { readLocal, writeLocal, storageFailed } from '../api/localStore';
import { getAccountId } from '../api/client';
import { readUndoStack, type UndoEntry, type UndoGroup } from '../api/undoStack';

type Result = { undoable: boolean; text: string; groupId: string; messages: string[]; warnings: string[]; status: 'processing' | 'done' | 'partial' | 'failed' | 'interrupted' | 'undone' };
export const useVoiceFeedback = (list: string, begin: (label: string) => UndoGroup, finish: (group: UndoGroup) => UndoEntry | undefined) => {
  const key = `voice_result_v1:${getAccountId()}:${list}`;
  const group = useRef<UndoGroup | undefined>(undefined);
  const messages = useRef<string[]>([]);
  const warnings = useRef<string[]>([]);
  const [result, setResult] = useState<Result | null>(() => {
    try {
      const value = JSON.parse(readLocal(key) ?? 'null') as Result | null;
      if (!value || typeof value.text !== 'string' || !Array.isArray(value.messages) || !Array.isArray(value.warnings)) return null;
      if (value.status === 'processing') {
        const entry = readUndoStack(list).find(entry => entry.id === value.groupId);
        value.messages = entry?.action.kind === 'group' ? entry.action.entries.map(entry => entry.summary ?? entry.label) : [];
        value.status = 'interrupted';
        value.undoable = value.messages.length > 0;
      }
      return value;
    } catch { return null; }
  });
  const save = useCallback((value: Result) => {
    setResult(value);
    void writeLocal(key,JSON.stringify(value)).catch(storageFailed);
  }, [key]);
  const start = useCallback((text: string) => {
    group.current = begin(text);
    messages.current = []; warnings.current = [];
    save({ text, groupId: group.current.id, messages: [], warnings: [], status:'processing', undoable:false });
  }, [begin, save]);
  const report = useCallback((message: string, error = false) => {
    (error ? warnings : messages).current.push(message);
  }, []);
  const complete = useCallback(() => {
    const current = group.current;
    if (!current) return;
    const entry = finish(current);
    const applied = entry?.action.kind === 'group' ? entry.action.entries.map(entry => entry.summary ?? entry.label) : [];
    save({ undoable:applied.length > 0, text:current.label, groupId:current.id, messages:[...new Set([...applied, ...messages.current])], warnings:[...new Set(warnings.current)],
      status: warnings.current.length ? (applied.length ? 'partial' : 'failed') : 'done' });
    group.current = undefined;
  }, [finish, save]);
  const markUndone = useCallback((id?: string) => {
    setResult(previous => {
      if (!previous || previous.groupId !== id) return previous;
      const value: Result = {...previous,status:'undone',undoable:false};
      void writeLocal(key,JSON.stringify(value)).catch(storageFailed);
      return value;
    });
  }, [key]);
  return {group,result,start,report,complete,markUndone};
};
