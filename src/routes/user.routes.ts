import { Router } from 'express';
import {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateIdParam, validateUserBody, validateUpdateBody } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, validateIdParam, getUserById);
router.post('/', authMiddleware, validateUserBody, createUser);
router.put('/:id', authMiddleware, validateIdParam, validateUpdateBody, updateUser);
router.delete('/:id', authMiddleware, validateIdParam, deleteUser);

export default router;