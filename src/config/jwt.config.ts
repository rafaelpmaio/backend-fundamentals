import { ENV } from './env.js';
import type { Secret, SignOptions } from 'jsonwebtoken';

interface JwtTokenConfig {
    secret: Secret;
    expiresIn: SignOptions['expiresIn'];
}

const accessTokenSecret = ENV.JWT.ACCESS_SECRET;
const refreshTokenSecret = ENV.JWT.REFRESH_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
    console.error("ERRO: JWT secrets não encontrados no .env");
    process.exit(1);
}

export const jwtConfig: {
    accessToken: JwtTokenConfig;
    refreshToken: JwtTokenConfig
} = {
    accessToken: {
        secret: accessTokenSecret,
        expiresIn: '15m'
    },
    refreshToken: {
        secret: refreshTokenSecret,
        expiresIn: '7d'
    }
}