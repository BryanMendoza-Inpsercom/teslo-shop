import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "../interfaces/auth-response";

export const checkAuthStatus = async (): Promise<AuthResponse> => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No exite token aun !!!');
        throw new Error('token not fount!!');
    }

    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        localStorage.setItem('token', data.token);
        return data;
    } catch (_) {
        localStorage.removeItem('token');
        throw new Error('Token expire or not valid..');
    }
}