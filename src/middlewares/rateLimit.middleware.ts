import type { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { rateLimitConfig } from "../config/rate-limit.config.js";

export const authRateLimiter = rateLimit({
    windowMs: rateLimitConfig.auth.windowMs,
    max: rateLimitConfig.auth.max,
    message: {
        success: false,
        message: rateLimitConfig.auth.message
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => req.ip || 'unknown',
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            success: false,
            message: rateLimitConfig.auth.message,
            retryAfter: Math.ceil(rateLimitConfig.auth.windowMs / 1000 / 60)
        });
    }
});

export const apiRateLimiter = rateLimit({
    windowMs: rateLimitConfig.api.windowMs,
    max: rateLimitConfig.api.max,
    message: {
        success: false,
        message: rateLimitConfig.api.message
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => req.ip || 'unknown',
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            success: false,
            message: rateLimitConfig.api.message,
            retryAfter: Math.ceil(rateLimitConfig.api.windowMs / 1000 / 60)
        });
    }
});

export const registerRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: 'Muitas tentativas de registro. Tente novamente em 1 hora'
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => req.ip || 'unknown',
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            success: false,
            message: 'Muitas tentativas de registro. Tente novamente em 1 hora',
            retryAfter: 60
        });
    }
});