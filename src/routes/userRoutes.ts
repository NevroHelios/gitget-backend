import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { ParamsDictionary } from 'express-serve-static-core';

const router = Router();
const userController = new UserController();

// Define route handlers with explicit typing
router.get('/:id', (req: Request<ParamsDictionary>, res: Response) => {
    userController.getUserById(req, res);
});

router.put('/:id', (req: Request<ParamsDictionary>, res: Response) => {
    userController.updateUser(req, res);
});

router.delete('/:id', (req: Request<ParamsDictionary>, res: Response) => {
    userController.deleteUser(req, res);
});

export default router;