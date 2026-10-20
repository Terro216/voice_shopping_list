export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly code?: string,
    readonly retryAfterMs?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** The response is unknown; the server may already have committed the request. */
export class NetworkError extends Error {
  constructor(readonly cause?: unknown) {
    super('Network request failed');
    this.name = 'NetworkError';
  }
}

// Fired when the server rejects our stored token; App listens and logs out.
export const AUTH_EXPIRED_EVENT = 'auth-expired';

/**
 * Fired on any 429. The limit is per account and generous, so hitting it means
 * something is wrong (a stuck retry loop, a second device gone haywire) and the
 * app has to say so instead of failing silently wherever the call happened to
 * be made — which is what it used to do outside the few screens that checked.
 */
export const RATE_LIMITED_EVENT = 'rate-limited';

export const notifyRateLimited = () => window.dispatchEvent(new Event(RATE_LIMITED_EVENT));

export const getToken = () => localStorage.getItem('token');
export const SESSION_CHANGED_EVENT = 'session-changed';
export const CATALOG_CHANGED_EVENT = 'catalog-changed';

export const getAccountId = () => {
  try {
    const payload = JSON.parse(atob((getToken() ?? '').split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (typeof payload.sub === 'string') return payload.sub as string;
  } catch { /* A pre-upgrade token has no immutable subject. */ }
  return `legacy:${localStorage.getItem('username') ?? 'anonymous'}`;
};

export const sessionKey = () => `${getAccountId()}:${localStorage.getItem('session_generation') ?? ''}`;
export const announceSessionChange = () => window.dispatchEvent(new Event(SESSION_CHANGED_EVENT));

/**
 * Identifies this page instance. sessionStorage cannot provide this identity:
 * a window opened by another tab inherits a copy of that storage.
 */
export const CLIENT_ID = (() => {
  const id =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return id;
})();

export const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'X-Client-Id': CLIENT_ID,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * The server hands back a refreshed token as the session nears its expiry;
 * storing it here is what keeps a daily user from being logged out mid-trip.
 */
export const adoptRenewedToken = (res: Response, sentToken = getToken()) => {
  const renewed = res.headers.get('X-Renewed-Token');
  if (renewed && getToken() === sentToken) localStorage.setItem('token', renewed);
};

export const notifyAuthExpired = () => {
  if (getToken()) window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};

type RequestOptions = {
  method?: string;
  body?: unknown;
  /** Attach the stored token (and treat a 401 as an expired session). */
  auth?: boolean;
  cache?: RequestCache;
  signal?: AbortSignal;
  mutationId?: string;
  timeoutMs?: number;
};

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, auth = true } = options;
  const token = getToken();
  const session = sessionKey();
  const controller = new AbortController();
  const abort = () => controller.abort();
  options.signal?.addEventListener('abort', abort, { once: true });
  if (options.signal?.aborted) controller.abort();
  const timeout = setTimeout(abort, options.timeoutMs ?? 15_000);

  let res: Response;
  let data;
  try {
    res = await fetch(url, {
      method,
      headers: { ...(auth ? authHeaders() : { 'Content-Type': 'application/json' }),
        ...(options.mutationId ? { 'X-Mutation-Id': options.mutationId } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: options.cache,
      signal: options.signal && AbortSignal.any ? AbortSignal.any([options.signal, controller.signal]) : controller.signal,
    });
    data = await res.json().catch((error) => {
      if (controller.signal.aborted || options.signal?.aborted) throw error;
      return null;
    });
  } catch (err) {
    throw new NetworkError(err);
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener('abort', abort);
  }

  if (auth && sessionKey() !== session) throw new NetworkError('Session changed');
  if (auth) adoptRenewedToken(res, token);

  if (!res.ok) {
    if (auth && res.status === 401 && getToken() === token) notifyAuthExpired();
    if (res.status === 429) notifyRateLimited();
    const message =
      data && typeof data.error === 'string' ? data.error : `Request failed (${res.status})`;
    const retryAfter = res.headers.get('Retry-After');
    const retryAfterMs = retryAfter ? (/^\d+$/.test(retryAfter) ? Number(retryAfter) * 1000 : Math.max(0, Date.parse(retryAfter) - Date.now())) : undefined;
    throw new ApiError(res.status, message, data?.code, retryAfterMs);
  }

  return data as T;
};
