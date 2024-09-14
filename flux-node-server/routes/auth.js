const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../Controller/authController');

router.post(
    '/signup',
    [
        body('username').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
        body('password').trim().isLength({ min: 7 }).withMessage('Password must be at least 7 characters long.'),
    ],
    authController.signup
);

router.post(
    '/login',
    [
        body('username').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
        body('password').trim().not().isEmpty().withMessage('Password is required.')
    ],
    authController.login
);

module.exports = router;
