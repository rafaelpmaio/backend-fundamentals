import type { Request, Response } from "express";
import type { User, CreateUserDTO, UpdateUserDTO, UserResponse } from '../types/user.types.js';
import type { ApiResponse, ApiError } from '../types/api.types.js';
import { userService } from '../services/user.service.js';
import { getValidatedId } from '../utils/typeGuards.js';
import { authService } from '../services/auth.service.js';

export interface IUserController {
    getUsers(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    createUser(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
    async getUsers(
        req: Request,
        res: Response<ApiResponse<UserResponse[]> | ApiError>
    ): Promise<void> {
        try {
            const users: User[] = await userService.findAllUsers();
            const sanitizedUsers = users.map(user => authService.sanitizeUser(user));
            res.status(200).json({ message: 'Lista de usuários', data: sanitizedUsers });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    };

    async getUserById(
        req: Request,
        res: Response<ApiResponse<UserResponse> | ApiError>
    ): Promise<void> {
        try {
            const id: string = getValidatedId(req.params);
            const user: User | undefined = await userService.findUserById(id);

            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }

            const sanitezedUser = authService.sanitizeUser(user);
            res.status(200).json({ message: 'Usuário encontrado', data: sanitezedUser });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    };

    async createUser(
        req: Request<{}, {}, CreateUserDTO>,
        res: Response<ApiResponse<UserResponse> | ApiError>
    ): Promise<void> {
        try {
            const userData: CreateUserDTO = req.body;
            const newUser: User = await userService.createUserInDb(userData);
            const sanitezedUser = authService.sanitizeUser(newUser);
            res.status(201).json({ message: 'Usuário Criado', data: sanitezedUser });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    };

    async updateUser(
        req: Request<{ id: string }, {}, UpdateUserDTO>,
        res: Response<ApiResponse<UserResponse> | ApiError>
    ): Promise<void> {
        try {
            const id: string = getValidatedId(req.params);
            const userData: UpdateUserDTO = req.body;

            const updatedUser: User | null = await userService.updateUserInDb(id, userData);

            if (!updatedUser) {
                res.status(404).json({ error: 'usuário não encontrado' });
                return;
            }
            const sanitezedUser = authService.sanitizeUser(updatedUser);
            res.status(200).json({ message: `Usuário ${id} atualizado`, data: sanitezedUser });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
                return;
            }
            res.status(500).json({ error: 'Erro ao atualizar o usuário' })
        }
    };

    async deleteUser(
        req: Request,
        res: Response<ApiResponse<undefined> | ApiError>
    ): Promise<void> {
        try {
            const id: string = getValidatedId(req.params);
            const deleted: boolean = await userService.deleteUserFromDb(id);

            if (!deleted) {
                res.status(400).json({ error: 'Usuário não encontrado' });
                return;
            }

            res.status(200).json({ message: `Usuário ${id} deletado` });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o usuário' });
        }
    };
}

export const createUserController = (): UserController => {
    return new UserController();
}

export const userController = createUserController();




