import 'dotenv/config';

const sessionSecret = process.env.SESSION_SECRET;

const jwtAcessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUri = process.env.GOOGLE_CALLBACK_URL;


if (!sessionSecret) {
    console.error("ERRO: SESSION_SECRET não encontrada no arquivo .env");
    process.exit(1);
}

if (!jwtAcessSecret || !jwtRefreshSecret) {
    console.error("ERRO: JWT secrets não encontrado");
    process.exit(1);
}

export const ENV = {
    // Server
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,

    // Session
    SESSION_SECRET: sessionSecret,

    // JWT
    JWT: {
        ACCESS_SECRET: jwtAcessSecret,
        REFRESH_SECRET: jwtRefreshSecret
    },

    // Google Oauth
    GOOGLE_OAUTH: {
        CLIENT_ID: googleClientId,
        CLIENT_SECRET: googleClientSecret,
        CALLBACK_URI: googleCallbackUri
    }

};