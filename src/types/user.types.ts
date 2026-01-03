export interface User {
    id: string;
    name: string;
    email?: string | undefined;
    age?: number | undefined;
    isActive: boolean;
    createdAt: Date;
}

export interface CreateUserDTO {
    name: string;
    email?: string | undefined;
    age?: number | undefined;
}

export interface UpdateUserDTO {
    name?: string | undefined;
    email?: string | undefined;
    age?: number | undefined;
    isActive?: boolean | undefined;
}