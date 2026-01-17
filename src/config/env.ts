import 'dotenv/config';

const sessionSecret = process.env.SESSION_SECRET;

if(!sessionSecret) {
    console.error("ERRO: SESSION_SECRET não encontrada no arquivo .env");
    process.exit(1);
}

export const ENV = {
    SESSION_SECRET: sessionSecret,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000
};