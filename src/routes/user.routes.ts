import { Router } from 'express';
import {
    createUser,
    updateUser,
    deleteUser,
    getUsers
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';


const router = Router();

router.get('/', authMiddleware, getUsers);
router.post('/', authMiddleware, createUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;