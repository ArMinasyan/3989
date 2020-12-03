const auth = require('express').Router();

const userLogin = require('../controllers/auth/Controller.SignIn');
const userRegister = require('../controllers/auth/Controller.SignUp');
const resetPassword = require('../controllers/auth/Controller.resetPassword');
const verifyCode = require('../controllers/auth/Controller.verifyCode');

const { SendPhonePin, VerifyPhonePin } = require('../controllers/auth/Controller.Phone');

const Validation = require('../Validators/Validator.SignUp');

auth.post('/login', userLogin);
auth.post('/register', Validation, userRegister);
auth.put('/resetPassword', resetPassword);
auth.put('/verifyCode', verifyCode);

auth.post('/send_pin_phone', SendPhonePin);
auth.post('/verify_pin_phone', VerifyPhonePin);

module.exports = auth;