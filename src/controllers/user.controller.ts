import type { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({message: 'Lista de usuários', users: []});
};

export const createUser = (req: Request, res: Response) => {
    const user = req.body;

    if (!user || !user.name) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    res.status(201).json({ message: "usuário criado", user });
}

export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.body;
    
    if (!user || Object.keys(user).length === 0) {
        return res.status(400).json({ error: 'Dados para atualização são obrigatórios' });
    }

    res.status(200).json({ message: `usuário ${id} atualizado`, user});
}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `usuário ${id} deletado` });
}
