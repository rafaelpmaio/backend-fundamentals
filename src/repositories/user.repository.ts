import type { User } from '../types/user.types.js';

//Banco de dados em memória
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

// Simula delay de operação no banco de dados
const simulateDbDelay = (ms: number = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Busca todos os usuários
export const findAll = async (): Promise<User[]> => {
    await simulateDbDelay();
    return users;
};

// Busca usuário por ID
export const findById = async (id: string): Promise<User | undefined> => {
    await simulateDbDelay();
    return users.find(user => user.id === id);
};

// Busca usuário por email
export const findByEmail = async (email: string): Promise<User | undefined> => {
    await simulateDbDelay();
    return users.find(user => user.email === email);
};

// Salva novo usuário
export const save = async (user: User): Promise<User> => {
    await simulateDbDelay();
    users.push(user);
    return user;
};

// Atualiza usuário existente
export const update = async (id: string, updatedUser: User): Promise<User | null> => {
    await simulateDbDelay();

    const index: number = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }
    users[index] = updatedUser;
    return updatedUser;
};

// Remove usuário
export const remove = async (id: string): Promise<boolean> => {
    await simulateDbDelay();

    const initialLength: number = users.length;
    users = users.filter(user => user.id !== id);

    return users.length < initialLength;
};

// Gera próximo ID disponível
export const generateNextId = (): string => {
    return String(users.length + 1);
};