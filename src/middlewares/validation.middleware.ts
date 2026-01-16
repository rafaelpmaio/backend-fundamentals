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

export const validateRegisterBody = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({ error: 'Nome é obrigatório' });
        return;
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ error: 'O email fornecido não é válido' });
        return;
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        res.status(400).json({ error: 'Senha deve ter no mínimo 6 caractéres' });
        return;
    }
    next();
};

// Validar dados de login
export const validateLoginBody = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ error: 'O email fornecido não é válido' });
        return;
    }

    if (!password || typeof password !== 'string') {
        res.status(400).json({ error: 'Senha é obrigatória' });
        return;
    }
    next();
};