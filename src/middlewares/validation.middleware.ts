import type { Request, Response, NextFunction } from 'express';

// Helper para validar ID e garantir tipo
export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || id.trim() === '') {
        res.status(400).json({ error: 'ID é obrigatório' });
        return;
    }
    next();
};

// Helper para validar corpo de criação
export const validateUserBody = (req: Request, res: Response, next: NextFunction): void => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({ error: 'Nome é obrigatório' });
        return;
    }
    next();
};

// Helper para validar corpo de atualização
export const validateUpdateBody = (req: Request, res: Response, next: NextFunction): void => {
    const userData = req.body;

    if (!userData || Object.keys(userData).length === 0) {
        res.status(400).json({ error: 'Dados para atualização são obrigatórios' });
        return;
    }
    next();
};