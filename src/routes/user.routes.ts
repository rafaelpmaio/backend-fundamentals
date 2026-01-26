import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { validateIdParam, validateUserBody, validateUpdateBody } from '../middlewares/validation.middleware.js';
import { authenticateToken, authorizeOwner } from '../middlewares/jwt.middleware.js';
import { apiRateLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

// ADICIONA Rate Limiter global para users
router.use(apiRateLimiter);

router.get('/me', authenticateToken, userController.getMe);
router.get('/:id', authenticateToken, validateIdParam, userController.getById);
router.get('/', authenticateToken, userController.getAll);

router.post('/', authenticateToken, authorizeOwner, validateUserBody, userController.create);
router.put('/:id', authenticateToken, authorizeOwner, validateIdParam, validateUpdateBody, userController.update);
router.delete('/:id', authenticateToken, authorizeOwner, validateIdParam, userController.delete);

export default router;