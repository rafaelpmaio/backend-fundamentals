import bcrypt from 'bcrypt';
import type { User, CreateUserDTO } from '../types/user.types.js';
import * as userRepository from '../repositories/user.repository.js';

const SALT_ROUNDS: number = 10;

// Registrar novo usuário
export const registerUser = async (userData: CreateUserDTO): Promise<User> => {

    // Virifica se email já existe
    if (userData.email) {
        const existingUser: User | undefined = await userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new Error('Email já cadastrado');
        }
    }

    // Verifica se senha foi fornecida
    if (!userData.password) {
        throw new Error('Senha é obrigatória');
    }

    const hashedPassword: string = await bcrypt.hash(userData.password, SALT_ROUNDS);

    // Cria novo usuário
    const newUser: User = {
        id: userRepository.generateNextId(),
        name: userData.name,
        email: userData.email ?? undefined,
        password: hashedPassword,
        age: userData.age ?? undefined,
        isActive: true,
        createdAt: new Date()
    };

    return await userRepository.save(newUser);
};

// Remove senha do objeto de usuário e a retorna ao cliente
export const sanitizeUser = (user: User): Omit<User, 'password'> => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword
};