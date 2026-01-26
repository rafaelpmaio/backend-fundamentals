import type { Request, Response, NextFunction } from 'express';
import type { User, CreateUserDTO, UserResponse } from '../types/user.types.js';
import type { ApiResponse, ApiError } from '../types/api.types.js';
import { authService } from '../services/auth.service.js';
import passport from '../config/passport.config.js';
import { tokenService } from '../services/token.service.js';
import type { AuthResponse } from '../types/auth.types.js';


export interface IAuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): void;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    logoutAll(req: Request, res: Response): Promise<void>;
    refreshToken(req: Request, res: Response): Promise<void>;
    getProfile(req: Request, res: Response): void;
}

export class AuthController implements IAuthController {
    // Registrar novo usuário
    async register(
        req: Request<{}, {}, CreateUserDTO>,
        res: Response<ApiResponse<UserResponse> | ApiError>
    ): Promise<void> {
        try {
            const userData: CreateUserDTO = req.body;
            const newUser: User = await authService.registerUser(userData);
            const sanitizedUser = authService.sanitizeUser(newUser);

            res.status(201).json({
                message: 'Usuário registrado com sucesso',
                data: sanitizedUser
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }

    // Login com Passport e Jwt
    login(
        req: Request,
        res: Response<ApiResponse<AuthResponse> | ApiError>,
        next: NextFunction
    ): void {
        passport.authenticate(
            'local',
            async (err: Error, user: User | false, info: { message: 'string' }) => {
                if (err) {
                    res.status(500).json({ error: 'Erro no servidor' });
                    return;
                }

                if (!user) {
                    res.status(401).json({ error: info.message || 'Credenciais inválidas' });
                    return;
                }

                const tokens = await tokenService.generateTokenPair(
                    user.id,
                    user.email,
                    req.headers['user-agent'],
                    req.ip);

                const sanitizedUser = authService.sanitizeUser(user);

                res.status(200).json({
                    message: 'Login realizado com sucesso',
                    data: {
                        user: sanitizedUser,
                        tokens: {
                            accessToken: tokens.accessToken,
                            refreshToken: tokens.refreshToken
                        }
                    },
                })

            })(req, res, next);
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { refreshToken } = req.body;
        await tokenService.revokeToken(refreshToken);
        res.json({ success: true, message: 'Logout realizado com sucesso' });
    }

    async logoutAll(req: Request, res: Response): Promise<void> {
        if (!req.tokenData) {
            res.status(401).json({ message: 'Não autenticado' });
            return;
        }
        const count = await tokenService.revokeAllUserTokens(req.tokenData.userId);
        res.json({ success: true, message: `${count} tokens encerrados` });
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        const { refreshToken } = req.body;
        const tokens = await tokenService.refreshAccessToken(refreshToken);
        res.json({
            success: true,
            data: tokens
        });
    }

    // Obter perfil do usuário autenticado
    getProfile(
        req: Request,
        res: Response<ApiResponse<UserResponse> | ApiError>
    ): void {
        if (!req.user) {
            res.status(401).json({ error: 'Não autenticado' });
            return;
        }

        const user = req.user as User;
        const userWithoutPassword = authService.sanitizeUser(user);

        res.status(200).json({
            message: 'Perfil do usuário',
            data: userWithoutPassword
        });
    };
}

export const createAuthController = (): IAuthController => {
    return new AuthController();
}

export const authController = createAuthController();




