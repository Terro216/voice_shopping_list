export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Fired when the server rejects our stored token; App listens and logs out.
export const AUTH_EXPIRED_EVENT = 'auth-expired';

export const getToken = () => localStorage.getItem('token');

export const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

type RequestOptions = {
  method?: string;
  body?: unknown;
  /** Attach the stored token (and treat a 401 as an expired session). */
  auth?: boolean;
};

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, auth = true } = options;

  const res = await fetch(url, {
    method,
    headers: auth ? authHeaders() : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (auth && res.status === 401 && getToken()) {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    const message =
      data && typeof data.error === 'string' ? data.error : `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }

  return data as T;
};
