import { request } from './client';

type AuthResponse = {
  token: string;
  username: string;
};

export const register = (username: string, password: string): Promise<AuthResponse> =>
  request<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: { username, password },
    auth: false,
  });

export const login = (username: string, password: string): Promise<AuthResponse> =>
  request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: { username, password },
    auth: false,
  });
