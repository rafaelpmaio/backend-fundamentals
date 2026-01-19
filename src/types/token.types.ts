export interface TokenPayLoad {
    userId: string;
    email: string;
    type: 'acess' | 'refresh'
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface DecodedToken {
    userId: string;
    email: string;
    type: 'access' | 'refresh';
    iat: number;
    exp: number;
}

// export type DecodedToken = TokenPayLoad & { iat: number; exp: number }

export interface RefreshTokenDocument {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    isRevoked: boolean;
    deviceInfo?: string;
    ipAddess?: string;
}