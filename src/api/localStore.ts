/** IndexedDB is the source of truth. This mirror is only for synchronous render reads. */
export const LOCAL_STORE_CHANGED = 'shopping-local-changed';
export const LOCAL_STORE_FAILED = 'shopping-local-failed';
export const LOCAL_DB_NAME = 'shopping-local-v1';
type RecordValue = { key: string; value: string };
export type LocalChange = [key: string, value: string | null];
let mirror = new Map<string,string>();
let opening: Promise<IDBDatabase> | undefined;
let connection: IDBDatabase | undefined;
let channel: BroadcastChannel | undefined;
let generation = 0;
let listening = false;
const pending = new Set<Promise<unknown>>();

const ownedKey = (key: string) => /^(mutation_v3:|list_snapshot_v2:|list_catalog_v1:|undo_stack_v2:|voice_result_v1:)/.test(key) && !key.startsWith('mutation_v3:legacy:');
const legacyRecords = (): LocalChange[] => Object.keys(localStorage).filter(ownedKey).flatMap(key => {
  const value = localStorage.getItem(key);
  return value === null ? [] : [[key,value] as LocalChange];
});
export const readLocal = (key: string) => mirror.get(key) ?? localStorage.getItem(key);
export const localKeys = () => [...new Set([...mirror.keys(), ...Object.keys(localStorage).filter(ownedKey)])];
const announce = (keys: string[], remote = false) => window.dispatchEvent(new CustomEvent(LOCAL_STORE_CHANGED,{detail:{keys,remote}}));
export const storageFailed = () => window.dispatchEvent(new Event(LOCAL_STORE_FAILED));

const open = () => {
  if (opening) return opening;
  const epoch = generation;
  opening = new Promise<IDBDatabase>((resolve,reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('Local storage is unavailable')); return; }
    const request = indexedDB.open(LOCAL_DB_NAME,1);
    let expired = false;
    const timer = setTimeout(() => { expired=true; reject(new Error('Local storage did not open')); },10000);
    request.onupgradeneeded = () => request.result.createObjectStore('records',{keyPath:'key'});
    request.onerror = () => { clearTimeout(timer); reject(request.error); };
    request.onblocked = () => { clearTimeout(timer); expired=true; reject(new Error('Close another tab to update local storage')); };
    request.onsuccess = () => {
      clearTimeout(timer);
      if (expired || epoch !== generation) { request.result.close(); reject(new Error('Storage was reopened')); return; }
      connection = request.result;
      connection.onversionchange = () => { connection?.close(); connection=undefined; opening=undefined; storageFailed(); };
      resolve(connection);
    };
  }).catch(error => { if (epoch === generation) opening=undefined; throw error; });
  return opening;
};

/** The callback must be synchronous: all reads and writes share one live transaction. */
export const transactLocal = <T>(update: (records: Map<string,string>) => { result:T; changes:LocalChange[] }): Promise<T> => {
  const epoch = generation;
  const work = open().then(db => new Promise<T>((resolve,reject) => {
    const transaction = db.transaction('records','readwrite');
    const store = transaction.objectStore('records');
    const read = store.getAll();
    const imported = legacyRecords();
    let next = new Map<string,string>();
    let result: T;
    let keys: string[] = [];
    let cause: unknown;
    read.onsuccess = () => {
      try {
        next = new Map((read.result as RecordValue[]).map(record => [record.key,record.value]));
        const imports: LocalChange[] = [];
        for (const [key,value] of imported) if (!next.has(key) && value !== null) { next.set(key,value); imports.push([key,value]); }
        const updated = update(next);
        result = updated.result;
        const changes = [...imports,...updated.changes];
        keys = [...new Set(changes.map(([key])=>key))];
        for (const [key,value] of changes) {
          if (value === null) { store.delete(key); next.delete(key); }
          else { store.put({key,value}); next.set(key,value); }
        }
      } catch (error) { cause=error; transaction.abort(); }
    };
    transaction.onabort = () => reject(cause ?? transaction.error ?? new Error('Local transaction aborted'));
    transaction.onerror = () => { /* onabort reports the transaction failure. */ };
    transaction.oncomplete = () => {
      if (epoch === generation) {
        mirror=next;
        // Remove old data only after the complete migration committed. A tab
        // still running the old app may write again; import its new IDs later.
        for (const [key,value] of imported) {
          try { if (localStorage.getItem(key) === value) localStorage.removeItem(key); } catch { /* Never delete before commit, and never strand a committed promise. */ }
        }
        if (keys.length) {
          announce(keys);
          channel?.postMessage(keys);
          try { localStorage.setItem('shopping_local_ping',String(Date.now())+Math.random()); } catch { /* BroadcastChannel and focus refresh remain. */ }
        }
      }
      resolve(result);
    };
  }));
  pending.add(work);
  void work.then(()=>pending.delete(work),()=>pending.delete(work));
  return work;
};

export const writeLocal = (key: string, value: string | null) => transactLocal(() => ({result:undefined,changes:[[key,value]]}));
export const refreshLocal = async () => {
  const epoch=generation;
  const db=await open();
  await new Promise<void>((resolve,reject) => {
    const tx=db.transaction('records','readonly');
    const request=tx.objectStore('records').getAll();
    let values: RecordValue[]=[];
    request.onsuccess=()=>{ values=request.result; };
    tx.oncomplete=()=>{ if(epoch===generation) mirror=new Map(values.map(record=>[record.key,record.value])); resolve(); };
    tx.onabort=()=>reject(tx.error);
  });
};
const receive = async () => {
  try {
    const before = new Map(mirror);
    await transactLocal(()=>({result:undefined,changes:[]}));
    const changed = [...new Set([...before.keys(), ...mirror.keys()])].filter(key => before.get(key) !== mirror.get(key));
    if (changed.length) announce(changed,true);
  } catch { storageFailed(); }
};
const onStorage = (event: StorageEvent) => { if (event.key==='shopping_local_ping' || (event.key && ownedKey(event.key))) void receive(); };
export const initializeLocalStore = async () => {
  await transactLocal(()=>({result:undefined,changes:[]}));
  if (listening) return;
  listening=true;
  if (typeof BroadcastChannel !== 'undefined') { channel=new BroadcastChannel('shopping-local'); channel.onmessage=()=>void receive(); }
  window.addEventListener('storage',onStorage);
  window.addEventListener('focus',receive);
};
export const flushLocalStore = async () => { await Promise.allSettled([...pending]); };
export const closeLocalStore = () => {
  generation++;
  channel?.close(); channel=undefined;
  window.removeEventListener('storage',onStorage); window.removeEventListener('focus',receive);
  listening=false; connection?.close(); connection=undefined; opening=undefined; mirror=new Map();
};
