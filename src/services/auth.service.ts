import bcrypt from 'bcrypt';
import type { User, CreateUserDTO } from '../types/user.types.js';
import { userRepository } from '../repositories/user.repository.js';


export interface IAuthService {
    registerUser(userData: CreateUserDTO): Promise<User>;
    sanitizeUser(user: User): Omit<User, 'password'>;
}

const SALT_ROUNDS: number = 10;

export class AuthService implements IAuthService {

    async registerUser(userData: CreateUserDTO): Promise<User> {

        if (userData.email) {
            const existingUser: User | undefined = await userRepository.findByEmail(userData.email);

            if (existingUser) {
                throw new Error('Email já cadastrado');
            }
        }

        if (!userData.password) {
            throw new Error('Senha é obrigatória');
        }

        const hashedPassword: string = await bcrypt.hash(userData.password, SALT_ROUNDS);

        return await userRepository.save({
            name: userData.name,
            email: userData.email ?? undefined,
            password: hashedPassword,
            age: userData.age ?? undefined,
            isActive: true,
            createdAt: new Date()
        });
    };
    // Remove senha do objeto de usuário e a retorna ao cliente
    sanitizeUser(user: User): Omit<User, 'password'> {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword
    };
}

export const createAuthService = (): IAuthService => {
    return new AuthService();
};

export const authService = createAuthService();


