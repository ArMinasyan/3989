const auth = require('express').Router();

const userLogin = require('../controllers/auth/Controller.SignIn');
const userRegister = require('../controllers/auth/Controller.SignUp');
const resetPassword = require('../controllers/auth/Controller.resetPassword');
const verifyCode = require('../controllers/auth/Controller.verifyCode');

const Validation = require('../Validators/Validator.SignUp');

auth.post('/login', userLogin);
auth.post('/register', Validation, userRegister);
auth.put('/resetPassword', resetPassword);
auth.put('/verifyCode', verifyCode);
module.exports = auth;