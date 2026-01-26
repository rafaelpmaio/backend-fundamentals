import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validateRegisterBody, validateLoginBody } from '../middlewares/validation.middleware.js';
import { authRateLimiter, registerRateLimiter } from '../middlewares/rateLimit.middleware.js';
import { authenticateToken } from '../middlewares/jwt.middleware.js';

const router = Router();

// Registrar novo usuário utilizando políticas de nº de tentativas válidas (RateLimiter)
router.post('/register', registerRateLimiter, validateRegisterBody, authController.register);
router.post('/login', authRateLimiter, validateLoginBody, authController.login);

router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/logout-all', authenticateToken, authController.logoutAll);

// Obter perfil (rota protegida)
router.get('/profile',  authController.getProfile);

export default router;