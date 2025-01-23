import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

// Configure GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    callbackURL: process.env.GITHUB_CALLBACK_URL as string
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        // Here you would typically:
        // 1. Find or create user in your database
        // 2. Return user object
        return done(null, profile);
    } catch (error) {
        return done(error, null);
    }
}));

// Serialize user for the session
passport.serializeUser((user: any, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user: any, done) => {
    done(null, user);
});

// Authentication middleware
export const authenticateGitHub = passport.authenticate('github', {
    scope: ['user:email']
});

// Check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};