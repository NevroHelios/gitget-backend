import { Request, Response } from 'express';
import {User} from '../models/userModel';

export class UserController {
    // Retrieve user information by ID
    async getUserById(req: Request<{ id: string }>, res: Response) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    // Update user profile
    async updateUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(deletedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}
