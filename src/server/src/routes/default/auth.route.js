const express = require('express');

const router = new express.Router();

const verifySignUp = require('../../middleware/verifySignUp');
const authController = require('../../controllers/auth.controller');

router.post(
    '/auth/signup',
    verifySignUp.checkDuplicateUsernameOrEmail,
    authController.signup,
);

router.post('/auth/login', authController.login);

// router.post('/auth/logout', (req, res) =>{})

module.exports = router;
