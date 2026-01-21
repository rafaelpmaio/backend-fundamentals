// Dados armazenados dentro do token JWT
export interface TokenPayLoad {
    userId: string;
    email: string;
    type: 'access' | 'refresh'
}

// Par de tokens enviados pelo servidor (acess e refresh)
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

// Conteúdo do token JWT depois de decodificado
export interface DecodedToken {
    userId: string;
    email: string;
    type: 'access' | 'refresh';
    iat: number; // timestamp da emissão
    exp: number; // timestamp da expiração
}

// Refresh Token que será persistido no BD para utilização 
export interface RefreshTokenDocument {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    isRevoked: boolean;
    deviceInfo?: string | undefined;
    ipAddess?: string | undefined;
}