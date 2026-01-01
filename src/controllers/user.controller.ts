import type { Request, Response } from "express";
import {
    findAllUsers,
    findUserById,
    createUserInDb,
    updateUserInDb,
    deleteUserFromDb
} from '../services/user.service.js';
import { getValidatedId } from '../utils/typeGuards.js';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await findAllUsers();
        res.status(200).json({ message: 'Lista de usuários', users });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getValidatedId(req.params);
        const user = await findUserById(id);

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json({ message: 'Usuário encontrado', user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email } = req.body;
        const newUser = await createUserInDb({ name, email });
        res.status(201).json({ message: 'Usuário Criado', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getValidatedId(req.params);
        const userData = req.body;

        const updatedUser = await updateUserInDb(id, userData);

        if (!updatedUser) {
            res.status(404).json({ error: 'usuário não encontrado' });
            return;
        }
        res.status(200).json({ message: `Usuário ${id} atualizado`, user: updateUser });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o usuário' })
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getValidatedId(req.params);
        const deleted = await deleteUserFromDb(id);

        if (!deleted) {
            res.status(400).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json({ message: `Usuário ${id} deletado` });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
};
