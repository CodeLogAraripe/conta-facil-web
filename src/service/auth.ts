import { SignInCredentials, SignInResponse, SignUpCredentials } from '../models/auth_model';
import { api } from './api';

export const authService = {
  async signIn({ email, password }: SignInCredentials): Promise<SignInResponse> {
    const response = await api.post<SignInResponse>('/sessions/login', {
      email,
      password,
    });
    return response.data;
  },

  async signOut(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async signUp(params: SignUpCredentials): Promise<void> {
    await api.post('/company', params);
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },
};