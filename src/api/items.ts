export type Item = {
  id: string;
  name: string;
  count: number;
  username: string;
};

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

type QueuedRequest = {
  url: string;
  options: RequestInit;
};

const addToQueue = (url: string, options: RequestInit) => {
  const queue = JSON.parse(localStorage.getItem('offline_queue') || '[]');
  queue.push({ url, options });
  localStorage.setItem('offline_queue', JSON.stringify(queue));
};

export const syncOfflineQueue = async () => {
  const queue: QueuedRequest[] = JSON.parse(localStorage.getItem('offline_queue') || '[]');
  if (queue.length === 0) return;

  const failed: QueuedRequest[] = [];
  
  for (const req of queue) {
    try {
      await fetch(req.url, req.options);
    } catch (e) {
      failed.push(req);
    }
  }
  
  localStorage.setItem('offline_queue', JSON.stringify(failed));
};

// Auto-sync when coming online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    syncOfflineQueue().catch(console.error);
  });
}

const safeFetch = async (url: string, options: RequestInit) => {
  if (!navigator.onLine && options.method !== 'GET') {
    addToQueue(url, options);
    return; // Resolve silently if offline
  }

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Request failed');
    return res;
  } catch (e) {
    if (options.method !== 'GET') {
      addToQueue(url, options);
    } else {
      throw e;
    }
  }
};

export const fetchItems = async (username: string): Promise<Item[]> => {
  const res = await safeFetch(`/api/items?username=${encodeURIComponent(username)}`, { method: 'GET' });
  if (!res) throw new Error('Failed to fetch items');
  return res.json();
};

export const createItem = async (item: Item): Promise<void> => {
  await safeFetch('/api/items', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(item),
  });
};

export const incrementItemReq = async (id: string, username: string): Promise<void> => {
  await safeFetch(`/api/items/${id}/increment`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ username }),
  });
};

export const decrementItemReq = async (id: string, username: string): Promise<void> => {
  await safeFetch(`/api/items/${id}/decrement`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ username }),
  });
};

export const deleteItemReq = async (id: string, username: string): Promise<void> => {
  await safeFetch(`/api/items/${id}?username=${encodeURIComponent(username)}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
};
