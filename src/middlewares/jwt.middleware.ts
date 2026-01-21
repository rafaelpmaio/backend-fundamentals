import type { Request, Response, NextFunction } from 'express';
import { tokenService } from '../services/token.service.js';
import type { DecodedToken } from "../types/token.types.js";


declare global {
    namespace Express {
        interface Request {
            tokenData?: DecodedToken;
        }
    }
}

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Token de autenticação não fornecido'
            });
            return;
        }

        const decoded = tokenService.verifyAccessToken(token);
        req.tokenData = decoded;

        next();
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Token expirado') {
                res.status(401).json({
                    success: false,
                    message: 'Token expirado',
                    code: 'TOKEN_EXPIRED'
                });
                return;
            }

            res.status(403).json({
                success: false,
                message: 'Token inválido',
                code: 'INVALID_TOKEN'
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Erro ao verificar o token'
        });
    }
};

export const authorizeOwner = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const tokenData = req.tokenData;

    if (!tokenData) {
        res.status(401).json({
            success: false,
            message: 'Usuário não autenticado'
        });
        return;
    }

    const resourceUserId = req.params.userId || req.params.id;

    if (!resourceUserId) {
        res.status(400).json({
            success: false,
            message: 'ID do recurso não fornecido'
        });
        return;
    }

    if (tokenData.userId !== resourceUserId) {
        res.status(403).json({
            success: false,
            message: 'Acesso negado: você não tem permissão para acessar este recurso'
        });
        return;
    }
    next();
}