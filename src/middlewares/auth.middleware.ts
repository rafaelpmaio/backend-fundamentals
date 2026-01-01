import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
    
    next();
};
