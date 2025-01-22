import express from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

const router = express.Router();

// Configure GitHub OAuth strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you would find or create a user in your database
    // For example:
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

// Initialize passport
router.use(passport.initialize());

// GitHub OAuth login route
router.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub OAuth callback route
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

export default router;