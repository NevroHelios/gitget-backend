import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
};

export const checkUserRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role; // Assuming user role is attached to req.user
        if (!roles.includes(userRole)) return res.sendStatus(403);
        next();
    };
};