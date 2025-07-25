import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from 'service/api';
import { IUser } from 'models/auth_model';
import { authService } from 'service/auth';

interface AuthState {
    token: string | null;
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
    signIn: (credentials: { email: string; password: string }) => Promise<boolean>;
    logOut: () => Promise<void>;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    initializeAuth: () => void;
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set): AuthState => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            signIn: async ({ email, password }) => {

                try {
                    set({ isLoading: true });
                    const response = await authService.signIn({ email, password });
                    set({ token: response.token, user: response.user, isAuthenticated: true });
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    return true;

                } catch (error) {
                    console.error("Login failed:", error);
                    return false;

                } finally {
                    set({ isLoading: false });
                }
            },
            setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            logOut: async () => {
                set({ token: null, user: null, isAuthenticated: false });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                api.defaults.headers.common['Authorization'] = '';
            },
            initializeAuth: () => {
                const token = localStorage.getItem('token');
                const userStr = localStorage.getItem('user');
                
                if (token && userStr) {
                    try {
                        const user = JSON.parse(userStr);
                        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        set({ token, user, isAuthenticated: true });
                    } catch (error) {
                        console.error('Error parsing user from localStorage:', error);
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
            }
        }),
        {
            name: 'auth-storage',
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);