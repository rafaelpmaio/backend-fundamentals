import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config.js';
import type { TokenPayLoad, TokenPair, DecodedToken } from '../types/token.types.js';
import { tokenRepository } from '../repositories/token.repository.js';

export interface ITokenService {
    generateTokenPair(userId: string, email: string, deviceInfo?: string, ipAddess?: string): Promise<TokenPair>;
    generateAccessToken(userId: string, email: string): string;
    generateRefreshToken(userId: string, email: string): string;
    verifyAccessToken(token: string): DecodedToken;
    verifyRefreshToken(token: string): Promise<DecodedToken>;
    refreshAccessToken(refreshToken: string): Promise<TokenPair>;
    revokeToken(token: string): Promise<boolean>;
    revokeAllUserTokens(userId: string): Promise<number>;
    cleanupExpiredTokens(): Promise<number>;
}

class TokenService implements ITokenService {
    async generateTokenPair(userId: string, email: string, deviceInfo?: string, ipAddess?: string): Promise<TokenPair> {

        if (!userId) {
            throw new Error('User ID inválido');
        }

        try {

            const accessToken = this.generateAccessToken(userId, email);
            const refreshToken = this.generateRefreshToken(userId, email);

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7)

            await tokenRepository.create({
                userId,
                token: refreshToken,
                expiresAt,
                isRevoked: false,
                deviceInfo,
                ipAddess,
            });

            return { accessToken, refreshToken };
        } catch (err) {
            throw new Error('Falha ao gerar Token Pair');
        }
    }

    generateAccessToken(userId: string, email: string): string {
        const expiresIn = jwtConfig.accessToken.expiresIn;
        if (!expiresIn) {
            throw new Error('JWT expiresIn não configurado');
        }
        const payload: TokenPayLoad = {
            userId,
            email,
            type: 'access'
        };
        return jwt.sign(payload, jwtConfig.accessToken.secret, {
            expiresIn: expiresIn
        });
    }

    generateRefreshToken(userId: string, email: string): string {
        const expiresIn = jwtConfig.refreshToken.expiresIn;
        if (!expiresIn) {
            throw new Error('JWT expiresIn não configurado');
        }
        const payload: TokenPayLoad = {
            userId,
            email,
            type: 'refresh'
        };
        return jwt.sign(payload, jwtConfig.refreshToken.secret, {
            expiresIn: expiresIn,
        });
    }

    verifyAccessToken(token: string): DecodedToken {
        try {
            const decoded = jwt.verify(token, jwtConfig.accessToken.secret) as DecodedToken;

            if (decoded.type !== 'access') {
                throw new Error('Token inválido: tipo incorreto');
            }
            return decoded;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Token expirado');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Token inválido');
            }
            throw error;
        }
    }

    async verifyRefreshToken(token: string): Promise<DecodedToken> {
        try {
            const decoded = jwt.verify(token, jwtConfig.refreshToken.secret) as DecodedToken;

            if (decoded.type !== 'refresh') {
                throw new Error('Token inválido> tipo incorreto');
            }

            const storedToken = await tokenRepository.findByToken(token);
            if (!storedToken || storedToken.isRevoked) {
                throw new Error('Token revogado ou inválido');
            }
            return decoded;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Refresh token expirado');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Refresh token inválido');
            }
            throw error;
        }
    }
    async refreshAccessToken(refreshToken: string): Promise<TokenPair> {
        const decodedToken = await this.verifyRefreshToken(refreshToken);
        await tokenRepository.revokeByToken(refreshToken);
        return this.generateTokenPair(decodedToken.userId, decodedToken.email);
    }

    async revokeToken(token: string): Promise<boolean> {
        return tokenRepository.revokeByToken(token);
    }

    async revokeAllUserTokens(userId: string): Promise<number> {
        return tokenRepository.revokeAllUserTokens(userId);
    }

    async cleanupExpiredTokens(): Promise<number> {
        return tokenRepository.deleteExpired();
    }
}

export const createTokenService = (): ITokenService => {
    return new TokenService();
}

export const tokenService = createTokenService();


