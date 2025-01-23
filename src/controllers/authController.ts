import { Request, Response } from 'express';
import {User} from '../models/userModel';

class AuthController {
    async register(req: Request, res: Response) {
        // Registration logic here
    }

    async login(req: Request, res: Response) {
        // Login logic here
    }

    async logout(req: Request, res: Response) {
        // Logout logic here
    }
}

export default AuthController;