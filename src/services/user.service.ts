import type { User, CreateUserDTO, UpdateUserDTO } from '../types/user.types.js';
import { userRepository } from '../repositories/user.repository.js';
import { randomUUID } from 'crypto';


export const findAllUsers = async (): Promise<User[]> => {
    return await userRepository.findAll();
};

export const findUserById = async (id: string): Promise<User | undefined> => {
    return await userRepository.findById(id);
};

export const createUserInDb = async (userData: CreateUserDTO): Promise<User> => {

    if (userData.email) {
        const existingUser: User | undefined = await userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new Error('Email já cadastrado');
        }
    }

    const newUser: User = {
        id: randomUUID(),
        name: userData.name,
        email: userData.email ?? undefined,
        age: userData.age ?? undefined,
        isActive: true,
        createdAt: new Date()
    };
    return await userRepository.save(newUser);
};

export const updateUserInDb = async (id: string, userData: UpdateUserDTO): Promise<User | null> => {

    const currentUser: User | undefined = await userRepository.findById(id);

    if (!currentUser) {
        return null;
    }

    if (userData.email && userData.email !== currentUser.email) {
        const existingUser: User | undefined = await userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new Error('Email já cadastrado');
        }
    }

    const updatedUser: User = {
        id: currentUser.id, // Garante que o ID não seja sobrescrito
        name: userData.name ?? currentUser.name,
        email: userData.email !== undefined ? userData.email : currentUser.email,
        age: userData.age !== undefined ? userData.age : currentUser.age,
        isActive: userData.isActive ?? currentUser.isActive,
        createdAt: currentUser.createdAt
    };

    return await userRepository.update(id, updatedUser);
};

export const deleteUserFromDb = async (id: string): Promise<boolean> => {
    return await userRepository.remove(id);
};