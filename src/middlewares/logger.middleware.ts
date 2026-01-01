import type { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const { method, url } = req;

    console.log(`[${timestamp}] ${method} ${url}`);

    // Log do response quando finalizar
    res.on('finish', () => {
        console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
    });

    next();
};