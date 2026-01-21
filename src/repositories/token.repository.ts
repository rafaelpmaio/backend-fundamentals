import type { RefreshTokenDocument } from '../types/token.types.js';

/**
 * Interface que define o contrato do repositório de tokens
 * Permite múltiplas implementações (in-memory, PostgreSQL, Redis, etc.)
 */

export interface ITokenRepository {
    create(tokenData: Omit<RefreshTokenDocument, 'id' | 'createdAt'>): Promise<RefreshTokenDocument>;
    findByToken(token: string): Promise<RefreshTokenDocument | null>;
    findByUserId(userId: string): Promise<RefreshTokenDocument[]>;
    revoke(tokenId: string): Promise<boolean>;
    revokeByToken(token: string): Promise<boolean>;
    revokeAllUserTokens(userId: string): Promise<number>;
    deleteExpired(): Promise<number>;
}

/**
 * Implementação in-memory do repositório de tokens
 */
export class InMemoryTokenRepository implements ITokenRepository {
    private tokens: Map<string, RefreshTokenDocument>;

    constructor() {
        this.tokens = new Map();
    }

    async create(tokenData: Omit<RefreshTokenDocument, 'id' | 'createdAt'>): Promise<RefreshTokenDocument> {
        const id = this.generateId();
        const token: RefreshTokenDocument = {
            ...tokenData,
            id,
            createdAt: new Date()
        };

        this.tokens.set(id, token);
        return token;
    }

    async findByToken(token: string): Promise<RefreshTokenDocument | null> {
        for (const storedToken of this.tokens.values()) {
            if (storedToken.token === token && !storedToken.isRevoked) {
                return storedToken;
            }
        }
        return null;
    }

    async findByUserId(userId: string): Promise<RefreshTokenDocument[]> {
        const userTokens: RefreshTokenDocument[] = [];
        for (const token of this.tokens.values()) {
            if (token.userId === userId && !token.isRevoked) {
                userTokens.push(token);
            }
        }
        return userTokens;
    }

    async revoke(tokenId: string): Promise<boolean> {
        const token = this.tokens.get(tokenId);
        if (token) {
            token.isRevoked = true;
            this.tokens.set(tokenId, token);
            return true;
        }
        return false;
    }

    async revokeByToken(token: string): Promise<boolean> {
        for (const [id, storedToken] of this.tokens.entries()) {
            if (storedToken.token === token) {
                storedToken.isRevoked = true;
                return true;
            }
        }
        return false;
    }

    async revokeAllUserTokens(userId: string): Promise<number> {
        let revokedCount: number = 0;
        for (const [id, token] of this.tokens.entries()) {
            if (token.userId === userId && !token.isRevoked) {
                token.isRevoked = true;
                this.tokens.set(id, token);
                revokedCount++;
            }
        }
        return revokedCount;
    }

    async deleteExpired(): Promise<number> {
        let deletedCount: number = 0;
        const now: Date = new Date();

        for (const [id, token] of this.tokens.entries()) {
            if (token.expiresAt < now) {
                this.tokens.delete(id);
                deletedCount++;
            }
        }
        return deletedCount;
    }

    private generateId(): string {
        return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    }
}

/**
 * Factory que cria a instância do repositório
 * Futuramente será substituído por um container de DI
 */
export const createTokenRepository = (): ITokenRepository => {
    return new InMemoryTokenRepository();
}

/**
 * Instância padrão para uso na aplicação
 * Pode ser substituída por DI container (TypeDI, InversifyJS, etc.)
 */

export const tokenRepository = createTokenRepository();
