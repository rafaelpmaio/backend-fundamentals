import type { Request, Response } from "express";
import type { User, CreateUserDTO, UpdateUserDTO, UserResponse } from '../types/user.types.js';
import type { ApiResponse, ApiError } from '../types/api.types.js';
import { userService } from '../services/user.service.js';
import { getValidatedId } from '../utils/typeGuards.js';
import { authService } from '../services/auth.service.js';

export interface IUserController {
    getMe(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
    async getMe(req: Request, res: Response): Promise<void> {
        if (!req.tokenData) {
            res.status(401).json('Não autenticado' )
            return;
        }
        const user = await userService.findById(req.tokenData?.userId);
        res.status(200).json({ sucess: true, data: user });
    }
    async getAll(
        req: Request,
        res: Response<ApiResponse<UserResponse[]> | ApiError>
    ): Promise<void> {
        try {
            const users: User[] = await userService.findAll();
            const sanitizedUsers = users.map(user => authService.sanitizeUser(user));
            res.status(200).json({ message: 'Lista de usuários', data: sanitizedUsers });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    };

    async getById(
        req: Request,
        res: Response<ApiResponse<UserResponse> | ApiError>
    ): Promise<void> {
        try {
            const id: string = getValidatedId(req.params);
            const user: User | undefined = await userService.findById(id);

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

    async create(
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

    async update(
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

    async delete(
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




