import type { User } from '../types/user.types.js';
import bcrypt from 'bcrypt';

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    save(user: User): Promise<User>;
    update(id: string, updatedUser: User): Promise<User | null>;
    remove(id: string): Promise<boolean>;
}

// Banco de dados em memória
const saltRounds: number = 10; // SaltRounds criado para gerar a mesma hash comparada em passport.config.ts 
let users: User[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao@gmail.com',
        password: await bcrypt.hash('123123', saltRounds),
        age: 28,
        isActive: true,
        createdAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@gmail.com',
        password: await bcrypt.hash('345345', saltRounds),
        age: 32,
        isActive: true,
        createdAt: new Date('2024-02-20')
    }
];

export class UserRepository implements IUserRepository {
    private users: User[];
    constructor(initialUsers: User[]) {
        this.users = initialUsers;
    }

    async findAll(): Promise<User[]> {
        await simulateDbDelay();
        return users;
    }

    async findById(id: string): Promise<User | undefined> {
        await simulateDbDelay();
        return users.find(user => user.id === id);
    };

    async findByEmail(email: string): Promise<User | undefined> {
        await simulateDbDelay();
        return users.find(user => user.email === email);
    };

    async save(user: User): Promise<User> {
        await simulateDbDelay();
        users.push(user);
        return user;
    };

    async update(id: string, updatedUser: User): Promise<User | null> {
        await simulateDbDelay();
        const index: number = users.findIndex(user => user.id === id);

        if (index === -1) {
            return null;
        }
        users[index] = updatedUser;
        return updatedUser;
    };

    async remove(id: string): Promise<boolean> {
        await simulateDbDelay();

        const initialLength: number = users.length;
        users = users.filter(user => user.id !== id);

        return users.length < initialLength;
    };
}

export const createUserRepository = (): IUserRepository => {
    return new UserRepository(users);
}

export const userRepository = createUserRepository();

// Simula delay de operação no banco de dados
const simulateDbDelay = (ms: number = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};