import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const auth: string | undefined = req.headers.authorization;

    if (!auth) {
        res.status(401).json({ error: 'Não autorizado' });
        return;
    }
    
    next();
};
