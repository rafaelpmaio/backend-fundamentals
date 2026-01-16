import { Router } from 'express';
import { register, login, logout, getProfile } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/passport.middleware.js';
import { validateRegisterBody, validateLoginBody } from '../middlewares/validation.middleware.js';

const router = Router();

// Registrar novo usuário
router.post('/register', validateRegisterBody, register);

// Login
router.post('/login', validateLoginBody, login);

// Logout (rota protegida)
router.post('/logout', isAuthenticated, logout);

// Obter perfil (rota protegida)
router.get('/profile', isAuthenticated, getProfile);

export default router;