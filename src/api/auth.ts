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

export const changePassword = (
  currentPassword: string,
  newPassword: string,
): Promise<AuthResponse> =>
  request<AuthResponse>('/api/auth/password', {
    method: 'POST',
    body: { currentPassword, newPassword },
  });

export const deleteAccount = (password: string) =>
  request('/api/auth/account', { method: 'DELETE', body: { password } });
