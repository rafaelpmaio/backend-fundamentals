import type { User } from './user.types.js';

export interface AuthResponse {
    user: Omit<User, 'password'>,
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}