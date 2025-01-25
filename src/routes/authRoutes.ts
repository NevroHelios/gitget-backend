const express = require('express');
const AuthController = require('../controllers/AuthController');
const passport = require('passport');

const {isloggedin} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.get('/login', passport.authenticate('github', {scope : ['user:email']}), AuthController.login);
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), AuthController.logincallback);
router.get('/logout', isloggedin, AuthController.logout);
router.get('/authenticated', isloggedin, AuthController.authCheck);

module.exports = router;