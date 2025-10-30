import type { User } from "@/shop/interfaces/user.interface";

export interface AuthResponse {
    user:  User;
    token: string;
}
