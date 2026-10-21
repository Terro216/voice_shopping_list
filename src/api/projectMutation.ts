import type { Item } from './items';
import type { StoredMutation } from './offlineQueue';
import type { LocalChange } from './localStore';
import { snapshotKey, type Snapshot } from './listCache';
import { quantityLimit, roundQuantity } from '../../shared/quantity.js';

/** Project the intent from the committed snapshot, inside the queue transaction. */
export const projectMutation = (records: Map<string,string>, entry: StoredMutation): LocalChange[] => {
  const url=new URL(entry.url,location.origin);
  if (!url.pathname.startsWith('/api/items')) return [];
  const body=(entry.body ?? {}) as Record<string,unknown>;
  const list=String(body.list ?? body.username ?? url.searchParams.get('list') ?? url.searchParams.get('username') ?? '');
  if (!list) return [];
  const key=snapshotKey(list,entry.account);
  const previous: Snapshot=JSON.parse(records.get(key) ?? '{"items":[],"savedAt":0}');
  let items=[...previous.items];
  const id=decodeURIComponent(url.pathname.split('/')[3] ?? '');
  const item=items.find(item=>item.id===id);
  const changes: LocalChange[]=[];
  if (entry.method==='POST' && url.pathname==='/api/items') {
    const created={...body,list_id:list,unit:body.unit ?? null,note:body.note ?? null,bought:Boolean(body.bought)} as Item;
    items=[...items.filter(item=>item.id!==created.id),created];
  } else if (url.pathname.endsWith('/count') && item && (body.expectedUnit===undefined || body.expectedUnit===(item.unit ?? null))) {
    const count=Math.max(0,Math.min(quantityLimit(item.unit),roundQuantity(item.count+Number(body.delta))));
    items=count>0?items.map(row=>row.id===id?{...row,count}:row):items.filter(row=>row.id!==id);
  } else if (url.pathname.endsWith('/move') && item) {
    const destination=String(body.destination);
    const targetKey=snapshotKey(destination,entry.account);
    const target: Snapshot=JSON.parse(records.get(targetKey) ?? '{"items":[],"savedAt":0}');
    changes.push([targetKey,JSON.stringify({...target,items:[...target.items.filter(row=>row.id!==id),{...item,list_id:destination}],savedAt:Date.now(),dirty:true})]);
    items=items.filter(row=>row.id!==id);
  } else if (url.pathname.endsWith('/restore') && entry.restoredItem) {
    items=[...items.filter(row=>row.id!==id),{...entry.restoredItem,bought:false,bought_at:null,deleted_at:null}];
  } else if (entry.method==='PATCH' && item) {
    const edit=Object.fromEntries(['name','note','count','unit','bought'].filter(key=>key in body).map(key=>[key,body[key]]));
    items=items.map(row=>row.id===id?{...row,...edit,...(body.bought===undefined?{}:{bought_at:body.bought?Date.now():null})}:row);
  } else if (entry.method==='PUT' && url.pathname.endsWith('/order')) {
    const ids=Array.isArray(body.ids)?body.ids:[];
    const ordered=ids.flatMap(id=>items.find(item=>item.id===id && !item.bought) ?? []);
    items=[...ordered,...items.filter(item=>!ordered.some(row=>row.id===item.id))];
  } else if (entry.method==='DELETE' && url.pathname.endsWith('/bought')) {
    const ids=Array.isArray(body.ids)?body.ids:items.filter(item=>item.bought).map(item=>item.id);
    items=items.filter(item=>!item.bought || !ids.includes(item.id));
  } else if (entry.method==='DELETE' && !url.pathname.endsWith('/deleted')) items=items.filter(item=>item.id!==id);
  changes.push([key,JSON.stringify({...previous,items,savedAt:Date.now(),dirty:true})]);
  return changes;
};
