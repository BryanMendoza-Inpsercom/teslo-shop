import type { User } from '@/shop/interfaces/user.interface';
import { create } from 'zustand'
import { loginActions } from '../actions/login.action';
import { checkAuthStatus } from '../actions/check-auth-action';

type AuthStatus = 'authenticated' | 'not-aunthenticated' | 'checking';

type AuthState = {
    //properties
    user: User | null,
    token: string | null;
    // actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    //getters --> valores computados
    authStatus: AuthStatus;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    //actions
    login: async (email: string, password: string) => {
        try {
            const data = await loginActions(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (_) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-aunthenticated' });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-aunthenticated' });
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthStatus();
            set({
                user: user,
                token: token,
                authStatus: 'authenticated'
            })
            return true;
        } catch (_) {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-aunthenticated'
            })
            return false;
        }

    }
}));