import { describe,it,expect,vi } from 'vitest';
import { IDBObjectStore } from 'fake-indexeddb';
import { closeLocalStore, initializeLocalStore, readLocal, refreshLocal, writeLocal } from './localStore';
import { enqueueMutation, readMutations, replaceRejectedMutation, syncOfflineQueue } from './offlineQueue';
import { readSnapshot, snapshotKey, writeSnapshot, clearSnapshots } from './listCache';
import { getAccountId } from './client';

const row={id:'milk',list_id:'ann',name:'Milk',count:1,bought:false};
const login=()=>{localStorage.setItem('username','ann');localStorage.setItem('token',`x.${btoa(JSON.stringify({sub:'ann-id'}))}.x`);};

describe('transactional local persistence',()=>{
  it('migrates all account records only after a successful commit and preserves unowned queues',async()=>{
    login();
    const records=[['mutation_v3:ann-id:old',JSON.stringify({id:'old',account:'ann-id',createdAt:1,url:'/api/items',method:'POST',body:{...row,list:'ann'}})],['list_snapshot_v2:ann-id:ann',JSON.stringify({items:[row],savedAt:1})],['list_catalog_v1:ann-id','[{"id":"ann","name":"Home"}]'],['undo_stack_v2:ann-id:ann','[]'],['voice_result_v1:ann-id:ann','{"phrase":"milk"}']];
    records.forEach(([key,value])=>localStorage.setItem(key,value));
    localStorage.setItem('offline_queue_v2','[]');
    closeLocalStore();
    await initializeLocalStore();
    for(const [key,value] of records) {expect(readLocal(key)).toBe(value);expect(localStorage.getItem(key)).toBeNull();}
    expect(localStorage.getItem('offline_queue_v2')).toBe('[]');
    closeLocalStore();await initializeLocalStore();expect(readMutations()).toHaveLength(1);
  });
  it('retains the complete old copy after a migration abort',async()=>{
    login();const key=snapshotKey('ann');const value=JSON.stringify({items:[row],savedAt:1});localStorage.setItem(key,value);
    closeLocalStore();
    const put=vi.spyOn(IDBObjectStore.prototype,'put').mockImplementation(()=>{throw new DOMException('Full','QuotaExceededError');});
    await expect(initializeLocalStore()).rejects.toThrow('Full');
    expect(localStorage.getItem(key)).toBe(value);
    put.mockRestore();await initializeLocalStore();expect(readSnapshot('ann')?.items).toEqual([row]);
  });
  it('commits neither the queue nor its projected snapshot when the second write fails',async()=>{
    login();await writeSnapshot('ann',[row]);
    const original=IDBObjectStore.prototype.put;let writes=0;
    const put=vi.spyOn(IDBObjectStore.prototype,'put').mockImplementation(function(this:IDBObjectStore,...args:Parameters<IDBObjectStore['put']>){if(++writes===2)throw new DOMException('Full','QuotaExceededError');return original.apply(this,args);});
    await expect(enqueueMutation({url:'/api/items/milk/count',method:'PATCH',body:{list:'ann',delta:1}})).rejects.toThrow('Full');
    put.mockRestore();await refreshLocal();expect(readMutations()).toHaveLength(0);expect(readSnapshot('ann')?.items[0].count).toBe(1);
  });
  it('serializes concurrent local changes against the persisted snapshot and retains confirmation time',async()=>{
    login();await writeSnapshot('ann',[row],{version:3,confirmedAt:100,dirty:false});
    await Promise.all(Array.from({length:20},()=>enqueueMutation({url:'/api/items/milk/count',method:'PATCH',body:{list:'ann',delta:1}})));
    expect(readSnapshot('ann')).toMatchObject({items:[{count:21}],version:3,confirmedAt:100,dirty:true});
    expect(readMutations()).toHaveLength(20);
    expect(await writeSnapshot('ann',[row],{version:4,confirmedAt:200,dirty:false})).toBe(false);
  });
  it('repairs a damaged snapshot and clears only captured items still bought',async()=>{
    login();await writeLocal(snapshotKey('ann'),'{broken');
    await writeSnapshot('ann',[row,{...row,id:'bread',bought:true},{...row,id:'eggs',bought:true}],{version:1,confirmedAt:100});
    await enqueueMutation({url:'/api/items/bought?list=ann',method:'DELETE',body:{ids:['milk','bread']}});
    expect(readSnapshot('ann')?.items.map(item=>item.id)).toEqual(['milk','eggs']);
  });
  it('uses a new ID for a reviewed intent and retains it if the server rejects it again',async()=>{
    login();await writeSnapshot('ann',[row]);
    const original=await enqueueMutation({url:'/api/items/milk',method:'PATCH',body:{list:'ann',name:'Old draft'}});
    vi.stubGlobal('fetch',vi.fn(async()=>new Response('{"error":"Conflict"}',{status:409,headers:{'content-type':'application/json'}})));
    await syncOfflineQueue();
    const replacement=await replaceRejectedMutation(original.id,{url:'/api/items/milk',method:'PATCH',body:{list:'ann',name:'Reviewed draft'}});
    expect(replacement.id).not.toBe(original.id);expect(readMutations()).toMatchObject([{id:replacement.id,failure:{status:409},body:{name:'Reviewed draft'}}]);
    expect(vi.mocked(fetch).mock.calls.map(call=>(call[1]?.headers as Record<string,string>)['X-Mutation-Id'])).toEqual([original.id,replacement.id]);
  });
  it('rejects an account switch while a local write is waiting',async()=>{
    login();const pending=enqueueMutation({url:'/api/items',method:'POST',body:{...row,list:'ann'}});
    localStorage.setItem('session_generation','changed');
    await expect(pending).rejects.toThrow('Session changed');expect(readMutations()).toHaveLength(0);
  });
  it('keeps another account records when one account signs out',async()=>{
    login();await writeLocal(`list_snapshot_v2:other:ann`,JSON.stringify({items:[row]}));
    await writeSnapshot('ann',[row]);await clearSnapshots();
    expect(getAccountId()).toBe('ann-id');expect(readSnapshot('ann')).toBeNull();expect(readLocal('list_snapshot_v2:other:ann')).not.toBeNull();
  });
});
