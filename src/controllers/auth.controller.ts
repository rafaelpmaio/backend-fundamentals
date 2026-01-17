import type { Request, Response, NextFunction } from 'express';
import type { User, CreateUserDTO, SafeUser } from '../types/user.types.js';
import type { ApiResponse, ApiError } from '../types/api.types.js';
import { registerUser, sanitizeUser } from '../services/auth.service.js';
import passport from '../config/passport.config.js';

// Registrar novo usuário
export const register = async (
    req: Request<{}, {}, CreateUserDTO>,
    res: Response<ApiResponse<Omit<User, 'password'>> | ApiError>
): Promise<void> => {
    try {
        const userData: CreateUserDTO = req.body;
        const newUser: User = await registerUser(userData);
        const userWithoutPassword = sanitizeUser(newUser);

        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            data: userWithoutPassword
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

// Login com Passport e LocalStrategy
export const login = (
    req: Request,
    res: Response<ApiResponse<Omit<User, 'password'>> | ApiError>,
    next: NextFunction
): void => {
    passport.authenticate('local', (err: Error, user: User | false, info: { message: 'string' }) => {
        if (err) {
            res.status(500).json({ error: 'Erro no servidor' });
            return;
        }

        if (!user) {
            res.status(401).json({ error: info.message || 'Credenciais inválidas' });
            return;
        }

        req.logIn(user, (err) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao criar sessão' });
                return;
            }

            const userWithoutPassword = sanitizeUser(user);
            res.status(200).json({
                message: 'Login realizado com sucesso',
                data: userWithoutPassword
            });
        });
    })(req, res, next);
};

// Logout
export const logout = (req: Request, res: Response, next: NextFunction): void => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    });
};

// Obter perfil do usuário autenticado
export const getProfile = (
    req: Request,
    res: Response<ApiResponse<Omit<User, 'password'>> | ApiError>
): void => {
    if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
    }

    const user = req.user as User;
    const userWithoutPassword = sanitizeUser(user);

    res.status(200).json({
        message: 'Perfil do usuário',
        data: userWithoutPassword
    });
};