import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/passport.middleware.js';
import { validateIdParam, validateUserBody, validateUpdateBody } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', isAuthenticated, userController.getUsers);
router.get('/:id', isAuthenticated, validateIdParam, userController.getUserById);
router.post('/', isAuthenticated, validateUserBody, userController.createUser);
router.put('/:id', isAuthenticated, validateIdParam, validateUpdateBody, userController.updateUser);
router.delete('/:id', isAuthenticated, validateIdParam, userController.deleteUser);

export default router;