import { beforeEach, afterEach, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { closeLocalStore, flushLocalStore, initializeLocalStore } from '../api/localStore';
import { cleanup } from '@testing-library/react';

beforeEach(async () => {
  closeLocalStore();
  localStorage.clear();
  vi.stubGlobal('indexedDB',new IDBFactory());
  vi.stubGlobal('BroadcastChannel',undefined);
  await initializeLocalStore();
});
afterEach(async () => {
  cleanup();
  await flushLocalStore();
  closeLocalStore();
});
