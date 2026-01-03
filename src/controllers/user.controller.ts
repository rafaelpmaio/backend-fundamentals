import type { Request, Response } from "express";
import type { User, CreateUserDTO, UpdateUserDTO } from '../types/user.types.js';
import type { ApiResponse, ApiError } from '../types/api.types.js';
import {
    findAllUsers,
    findUserById,
    createUserInDb,
    updateUserInDb,
    deleteUserFromDb
} from '../services/user.service.js';
import { getValidatedId } from '../utils/typeGuards.js';

export const getUsers = async (
    req: Request,
    res: Response<ApiResponse<User[]> | ApiError>
): Promise<void> => {
    try {
        const users: User[] = await findAllUsers();
        res.status(200).json({ message: 'Lista de usuários', data: users });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

export const getUserById = async (
    req: Request,
    res: Response<ApiResponse<User> | ApiError>
): Promise<void> => {
    try {
        const id: string = getValidatedId(req.params);
        const user: User | undefined = await findUserById(id);

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json({ message: 'Usuário encontrado', data: user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

export const createUser = async (
    req: Request<{}, {}, CreateUserDTO>,
    res: Response<ApiResponse<User> | ApiError>
): Promise<void> => {
    try {
        const userData: CreateUserDTO = req.body;
        const newUser: User = await createUserInDb(userData);
        res.status(201).json({ message: 'Usuário Criado', data: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

export const updateUser = async (
    req: Request<{ id: string }, {}, UpdateUserDTO>,
    res: Response<ApiResponse<User> | ApiError>
): Promise<void> => {
    try {
        const id: string = getValidatedId(req.params);
        const userData: UpdateUserDTO = req.body;

        const updatedUser: User | null = await updateUserInDb(id, userData);

        if (!updatedUser) {
            res.status(404).json({ error: 'usuário não encontrado' });
            return;
        }
        res.status(200).json({ message: `Usuário ${id} atualizado`, data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o usuário' })
    }
};

export const deleteUser = async (
    req: Request,
    res: Response<ApiResponse<undefined> | ApiError>
): Promise<void> => {
    try {
        const id: string = getValidatedId(req.params);
        const deleted: boolean = await deleteUserFromDb(id);

        if (!deleted) {
            res.status(400).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json({ message: `Usuário ${id} deletado` });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
};
