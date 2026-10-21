import { useEffect, useState, type ReactNode } from 'react';
import { initializeLocalStore, LOCAL_STORE_FAILED } from '../api/localStore';
import { translator } from '../i18n';
import styles from '../App.module.css';

export const StorageGate = ({children}:{children:ReactNode}) => {
  const [ready,setReady]=useState(false);
  const [error,setError]=useState(false);
  const [attempt,setAttempt]=useState(0);
  const t=translator(localStorage.getItem('lang')==='en'?'en':'ru');
  useEffect(()=>{
    let active=true;
    setError(false);
    void initializeLocalStore().then(()=>{if(active)setReady(true);},()=>{if(active)setError(true);});
    const failed=()=>setError(true);
    window.addEventListener(LOCAL_STORE_FAILED,failed);
    return ()=>{active=false;window.removeEventListener(LOCAL_STORE_FAILED,failed);};
  },[attempt]);
  if (!ready) return <div className={styles.container} role="status"><p>{t(error?'storageUnavailable':'loading')}</p>
    {error && <button onClick={()=>setAttempt(value=>value+1)}>{t('retry')}</button>}</div>;
  return <>{error && <div className={styles.storageWarning} role="alert">{t('storageWriteFailed')}
    <button onClick={()=>setAttempt(value=>value+1)}>{t('retry')}</button></div>}{children}</>;
};
