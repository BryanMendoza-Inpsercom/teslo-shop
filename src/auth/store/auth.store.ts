import type { User } from '@/shop/interfaces/user.interface';
import { create } from 'zustand'
import { loginActions } from '../actions/login.action';
import { checkAuthStatus } from '../actions/check-auth-action';
import { registerActions } from '../actions/register.action';

type AuthStatus = 'authenticated' | 'not-aunthenticated' | 'checking';

type AuthState = {
    //properties
    user: User | null,
    token: string | null;
    authStatus: AuthStatus;
    // actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    register: (fullname: string, email: string, password: string) => Promise<boolean>;

    //getters --> valores computados
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    isAdmin: () => {
        const roles = get().user?.roles || [];
        console.log(roles.includes('admin'))
        return roles.includes('admin');
    },

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

    },

    register: async (fullname: string, email: string, password: string) => {
        try {
            const data = await registerActions(fullname, email, password);
            console.log(data);
            if (!data.token) return false;
            if (data.user) {
                localStorage.setItem('token', data.token);
                set({ user: data.user, token: data.token, authStatus: 'authenticated' });
                return true;
            }
            return false;

        } catch (_) {
            return false;
        }
    }
}));