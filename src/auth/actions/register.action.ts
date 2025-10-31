import { tesloApi } from "@/api/teslo-api"
import type { AuthResponse } from "../interfaces/auth-response";

export const registerActions = async (fullname: string, email: string, password: string): Promise<AuthResponse> => {
    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            fullName:fullname,
            email,
            password,
        });

        return data;

    } catch (error) {

        throw error;

    }
}