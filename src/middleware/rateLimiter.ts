import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
    points: 10, // Number of requests
    duration: 60 // Per minute
});

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await limiter.consume(req.ip || '0.0.0.0');
        next();
    } catch {
        res.status(429).json({ error: 'Too many requests' });
    }
};