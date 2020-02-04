const express = require('express');
const router = express.Router();
const {body } = require('express-validator');

const signupValidator = require('../../validator/auth/signupValidator')
const loginValidator = require('../../validator/auth/loginValidator')
const authController= require('../../controllers/user/auth')
const {isUnAuthenticated}= require('../../middleware/user/is-unauth');

router.get('/login',isUnAuthenticated, authController.getLogin);
router.get('/signup',isUnAuthenticated, authController.getSignup);
router.post('/login',isUnAuthenticated,loginValidator, authController.postLogin);
router.post('/signup',isUnAuthenticated, signupValidator, authController.postSignup);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports= router;