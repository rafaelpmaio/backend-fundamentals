import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/passport.middleware.js';
import { validateRegisterBody, validateLoginBody } from '../middlewares/validation.middleware.js';

const router = Router();

// Registrar novo usuário
router.post('/register', validateRegisterBody, authController.register);

// Login
router.post('/login', validateLoginBody, authController.login);

// Logout (rota protegida)
router.post('/logout', isAuthenticated, authController.logout);

// Obter perfil (rota protegida)
router.get('/profile', isAuthenticated, authController.getProfile);

export default router;