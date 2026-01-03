import type { User, CreateUserDTO, UpdateUserDTO } from '../types/user.types.js';

//BD em memória
let users: User[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao@gmail.com',
        age: 28,
        isActive: true,
        createdAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@gmail.com',
        age: 32,
        isActive: true,
        createdAt: new Date('2024-02-20')
    }
];

const simulateDbDelay = (ms: number = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const findAllUsers = async (): Promise<User[]> => {
    await simulateDbDelay();
    return users;
};

export const findUserById = async (id: string): Promise<User | undefined> => {
    await simulateDbDelay();
    return users.find(user => user.id === id);
};

export const createUserInDb = async (userData: CreateUserDTO): Promise<User> => {
    await simulateDbDelay();

    const newUser: User = {
        id: String(users.length + 1),
        name: userData.name,
        email: userData.email ?? undefined,
        age: userData.age ?? undefined,
        isActive: true,
        createdAt: new Date()
    };

    users.push(newUser);
    return newUser
};

export const updateUserInDb = async (id: string, userData: UpdateUserDTO): Promise<User | null> => {
    await simulateDbDelay();

    const index: number = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    const currentUser: User | undefined = users[index];

    if (!currentUser) {
        return null;
    }

    const updatedUser: User = {
        id: currentUser.id, // Garante que o ID não seja sobrescrito
        name: userData.name ?? currentUser.name,
        email: userData.email !== undefined ? userData.email : currentUser.email,
        age: userData.age !== undefined ? userData.age : currentUser.age,
        isActive: userData.isActive ?? currentUser.isActive,
        createdAt: currentUser.createdAt
    };

    users[index] = updatedUser;
    return updatedUser;
};

export const deleteUserFromDb = async (id: string): Promise<boolean> => {
    await simulateDbDelay();

    const initialLength: number = users.length;
    users = users.filter(user => user.id !== id);

    return users.length < initialLength;
};