import { Router } from 'express';
import {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/passport.middleware.js';
import { validateIdParam, validateUserBody, validateUpdateBody } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', isAuthenticated, getUsers);
router.get('/:id', isAuthenticated, validateIdParam, getUserById);
router.post('/', isAuthenticated, validateUserBody, createUser);
router.put('/:id', isAuthenticated, validateIdParam, validateUpdateBody, updateUser);
router.delete('/:id', isAuthenticated, validateIdParam, deleteUser);

export default router;