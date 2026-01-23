import type { User, CreateUserDTO, UpdateUserDTO } from '../types/user.types.js';
import { userRepository } from '../repositories/user.repository.js';


export interface IUserService {
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User | undefined>;
    createUserInDb(userData: CreateUserDTO): Promise<User>;
    updateUserInDb(id: string, userData: UpdateUserDTO): Promise<User | null>;
    deleteUserFromDb(id: string): Promise<boolean>;
}

export class UserService implements IUserService {

    async findAllUsers(): Promise<User[]> {
        return await userRepository.findAll();
    };

    async findUserById(id: string): Promise<User | undefined> {
        return await userRepository.findById(id);
    };

    async createUserInDb(userData: CreateUserDTO): Promise<User> {

        if (userData.email) {
            const existingUser: User | undefined = await userRepository.findByEmail(userData.email);

            if (existingUser) {
                throw new Error('Email já cadastrado');
            }
        }

        return await userRepository.save({
            name: userData.name,
            email: userData.email ?? undefined,
            age: userData.age ?? undefined,
            isActive: true,
            createdAt: new Date()
        });
    };

    async updateUserInDb(id: string, userData: UpdateUserDTO): Promise<User | null> {

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
    async deleteUserFromDb(id: string): Promise<boolean> {
        return await userRepository.remove(id);
    };
}

export const createUserService = (): IUserService => {
    return new UserService();
}

export const userService = createUserService();






