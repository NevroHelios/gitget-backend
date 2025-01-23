import { Router } from 'express';
import {UserController} from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// Define user routes
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;