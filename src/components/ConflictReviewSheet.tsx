import { useEffect, useState } from 'react';
import { fetchItems, fetchDeletedItems, generateItemId, itemExpectation, type Item } from '../api/items';
import { replaceRejectedMutation, type StoredMutation, type QueuedMutation } from '../api/offlineQueue';
import { sessionKey } from '../api/client';
import { readCatalog } from '../api/catalogCache';
import { UNITS, isValidQuantity, type Unit } from '../../shared/quantity.js';
import { formatQuantity } from '../utils/quantity';
import { Sheet } from './Sheet';
import { useT } from '../i18n';
import styles from '../App.module.css';

export const ConflictReviewSheet = ({entry,onClose,onSaved}:{entry:StoredMutation;onClose:()=>void;onSaved:()=>void}) => {
  const {t,lang}=useT();
  const body=(entry.body ?? {}) as Record<string,unknown>;
  const url=new URL(entry.url,location.origin);
  const list=String(body.list ?? body.username ?? url.searchParams.get('list') ?? '');
  const id=decodeURIComponent(url.pathname.split('/')[3] ?? '');
  const create=entry.method==='POST' && url.pathname==='/api/items';
  const move=url.pathname.endsWith('/move');
  const restore=url.pathname.endsWith('/restore');
  const bulk=['bought','deleted','order'].includes(id);
  const editable=create || (entry.method==='PATCH' && !url.pathname.endsWith('/bought'));
  const [current,setCurrent]=useState<Item[] | null>(null);
  const [error,setError]=useState('');
  const [attempt,setAttempt]=useState(0);
  const [busy,setBusy]=useState(false);
  const [name,setName]=useState('');
  const [note,setNote]=useState('');
  const [count,setCount]=useState('1');
  const [unit,setUnit]=useState<Unit | null>(null);
  const [destination,setDestination]=useState(String(body.destination ?? ''));
  const [reviewSession]=useState(sessionKey);
  useEffect(()=>{
    let active=true;
    setError(''); setCurrent(null);
    const load=restore || id==='deleted'?fetchDeletedItems:fetchItems;
    void load(list).then(rows=>{
      if(!active || sessionKey()!==reviewSession) return;
      const item=rows.find(row=>row.id===id);
      setCurrent(rows);
      setName(String(body.name ?? item?.name ?? ''));
      setNote(String((body.note===undefined?item?.note:body.note) ?? ''));
      setUnit((body.unit===undefined?item?.unit:body.unit) as Unit | null ?? null);
      setCount(String(body.count ?? (body.delta===undefined?item?.count ?? 1:(item?.count ?? 0)+Number(body.delta))));
    }).catch(()=>{if(active)setError(t('conflictLoadFailed'));});
    return ()=>{active=false;};
    // The entry is a fixed review draft. Retry explicitly replaces the baseline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[entry.id,attempt,reviewSession,t]);
  const item=current?.find(row=>row.id===id);
  const requestedIds=Array.isArray(body.ids)?body.ids as string[]:[];
  const selected=current?.filter(row=>requestedIds.includes(row.id) && (id!=='bought' || row.bought)) ?? [];
  const available=current!==null && (create || (bulk?selected.length>0:Boolean(item)));
  const description=(row:Item)=>[row.name,formatQuantity(row,lang),row.note,row.bought?t('bought'):''].filter(Boolean).join(' · ');
  const intended=[typeof body.name==='string'?body.name:item?.name,body.count!==undefined?`${t('quantityLabel')}: ${body.count}`:'',body.delta!==undefined?`${t('quantityLabel')}: ${Number(body.delta)>0?'+':''}${body.delta}`:'',typeof body.unit==='string'?body.unit:'',body.note===null || body.note===''?t('conflictClearNote'):typeof body.note==='string'?body.note:'',body.bought!==undefined?t(body.bought?'bought':'conflictReturn'):'',entry.method==='DELETE'?t('deleteListAction'):'',move?`${t('conflictMove')}: ${readCatalog().find(row=>row.id===body.destination)?.name ?? t('itemUnavailable')}`:'',restore?t('restore'):''].filter(Boolean).join(' · ');
  const submit=async()=>{
    if(!available || busy || sessionKey()!==reviewSession) return;
    setError('');
    const quantity=Number(count.replace(',','.'));
    if(editable && (!name.trim() || name.trim().length>200)) {setError(t('itemNameRequired'));return;}
    if(editable && !isValidQuantity(quantity,unit)) {setError(t('invalidQuantity'));return;}
    if(editable && note.trim().length>200) {setError(t('noteTooLong'));return;}
    let mutation:QueuedMutation;
    if(create) mutation={url:'/api/items',method:'POST',body:{id:generateItemId(),list,name:name.trim(),note:note.trim()||null,count:quantity,unit,bought:Boolean(body.bought)}};
    else if(editable && item) mutation={url:`/api/items/${encodeURIComponent(id)}`,method:'PATCH',body:{list,name:name.trim(),note:note.trim()||null,count:quantity,unit,expected:itemExpectation(item)}};
    else if(bulk) mutation={url:entry.url,method:entry.method,body:{...body,ids:requestedIds.filter(id=>selected.some(row=>row.id===id))}};
    else if(restore && item) mutation={url:entry.url,method:entry.method,body:{list},restoredItem:item};
    else if(item) mutation={url:entry.url,method:entry.method,body:{...body,...(move?{destination}:{}),expected:itemExpectation(item)}};
    else return;
    setBusy(true);
    try {await replaceRejectedMutation(entry.id,mutation);onSaved();}
    catch {setError(t('saveFailed'));}
    finally {setBusy(false);}
  };
  return <Sheet title={t('reviewChange')} onClose={()=>{if(!busy)onClose();}}>
    <p className={styles.sheetHint}>{t('conflictReviewHint')}</p>
    {current===null && !error && <p role="status">{t('loading')}</p>}
    <div className={styles.conflictComparison}>
      <section><h3>{t('conflictCurrent')}</h3>{current!==null && (bulk?<ul>{selected.map(row=><li key={row.id}>{description(row)}</li>)}</ul>:<p>{item?description(item):t(create?'conflictNewItem':'itemUnavailable')}</p>)}</section>
      <section><h3>{t('conflictIntended')}</h3><p>{intended || t('edit')}</p>{bulk && <p>{t('conflictSelected',{count:selected.length})}</p>}</section>
    </div>
    {available && editable && <div className={styles.conflictFields}>
      <label>{t('conflictName')}<input value={name} maxLength={200} onChange={event=>setName(event.target.value)} /></label>
      <label>{t('quantityLabel')}<input inputMode="decimal" value={count} onChange={event=>setCount(event.target.value)} /></label>
      <label>{t('unitLabel')}<select value={unit ?? ''} onChange={event=>setUnit(event.target.value as Unit || null)}><option value="">{t('unitNone')}</option>{UNITS.map(value=><option key={value} value={value}>{formatQuantity({count:1,unit:value},lang)}</option>)}</select></label>
      <label>{t('notePlaceholder')}<textarea value={note} maxLength={200} onChange={event=>setNote(event.target.value)} /></label>
    </div>}
    {available && move && <label>{t('conflictMove')}<select value={destination} onChange={event=>setDestination(event.target.value)}>{readCatalog().filter(row=>row.id!==list).map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>}
    {current!==null && !available && <p>{t('conflictUnavailable')}</p>}
    {error && <p role="alert">{error}</p>}
    {current===null && error && <button onClick={()=>setAttempt(value=>value+1)}>{t('retry')}</button>}
    <div className={styles.conflictActions}><button disabled={!available || busy || (move && !destination)} onClick={()=>void submit()}>{t('conflictApply')}</button><button disabled={busy} onClick={onClose}>{t('cancel')}</button></div>
  </Sheet>;
};
