import express from 'express';
import session from 'express-session';
import type { Application, Request, Response, NextFunction } from 'express';
import passport from './config/passport.config.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import { ENV } from './config/env.js';

const app: Application = express();

app.use(loggerMiddleware);
app.use(express.json());

app.use(
    session({
        secret: ENV.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: ENV.SESSION_SECRET === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        }
    })
);

// Inicializa passport
app.use(passport.initialize());
app.use(passport.session());

//Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Backend Fundamentals API rodando' });
});

app.use((req: Request, res: Response): void => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error('Erro:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app;