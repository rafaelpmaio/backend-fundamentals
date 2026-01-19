export interface User {
    id: string;
    name: string;
    email?: string | undefined;
    password?: string | undefined;
    age?: number | undefined;
    isActive: boolean;
    createdAt: Date;
}

export type CreateUserDTO = Pick<User, 'name' | 'email' | 'password' | 'age'>;

export type UpdateUserDTO = Pick<User, 'name' | 'email' | 'password' | 'age' | 'isActive'>;

export type UserResponse = Omit<User, 'password'>;

export interface LoginDTO {
    email: string;
    password: string;
}
