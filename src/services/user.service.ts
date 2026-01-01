interface User {
    id: string;
    name: string;
    email?: string;
}

//BD em memória
let users: User[] = [
    { id: '1', name: 'João Silva', email: 'joao@gmail.com' },
    { id: '2', name: 'Maria Santos', email: 'maria@gmail.com' }
];

//Simula delay do BD
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

export const createUserInDb = async (userData: Omit<User, 'id'>): Promise<User> => {
    await simulateDbDelay();

    const newUser: User = {
        id: String(users.length + 1),
        ...userData
    };

    users.push(newUser);
    return newUser
};

export const updateUserInDb = async (id: string, userData: Partial<User>): Promise<User | null> => {
    await simulateDbDelay();

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    const currentUser = users[index];

    if (!currentUser) {
        return null;
    }

    const updatedUser: User = {
        ...currentUser,
        ...userData,
        id: currentUser.id // Garante que o ID não seja sobrescrito
    };

    users[index] = updatedUser;
    return updatedUser;
};

export const deleteUserFromDb = async (id: string): Promise<boolean> => {
    await simulateDbDelay();

    const initialLength = users.length;
    users = users.filter(user => user.id !== id);

    return users.length < initialLength;
};