import express from 'express';
import type { Application, Request, Response } from 'express';
import userRoutes from './routes/user.routes.js'
import { loggerMiddleware } from './middlewares/logger.middleware.js';

const app: Application = express();

app.use(loggerMiddleware);

app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Backend Fundamentals API rodando' });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
    res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app;