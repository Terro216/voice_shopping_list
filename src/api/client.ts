export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Thrown when the request never reached the server (offline, DNS, timeout). */
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

/**
 * Identifies this browser tab. The server echoes it back on `list_updated` so
 * the tab that made a change can skip refetching its own echo — otherwise every
 * tap round-trips into a full list reload and can briefly flash the old value.
 */
export const CLIENT_ID = (() => {
  const stored = sessionStorage.getItem('client_id');
  if (stored) return stored;
  const id =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem('client_id', id);
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
export const adoptRenewedToken = (res: Response) => {
  const renewed = res.headers.get('X-Renewed-Token');
  if (renewed) localStorage.setItem('token', renewed);
};

export const notifyAuthExpired = () => {
  if (getToken()) window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};

type RequestOptions = {
  method?: string;
  body?: unknown;
  /** Attach the stored token (and treat a 401 as an expired session). */
  auth?: boolean;
};

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, auth = true } = options;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: auth ? authHeaders() : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (err) {
    throw new NetworkError(err);
  }

  if (auth) adoptRenewedToken(res);

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (auth && res.status === 401) notifyAuthExpired();
    if (res.status === 429) notifyRateLimited();
    const message =
      data && typeof data.error === 'string' ? data.error : `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }

  return data as T;
};
