const { body } = require('express-validator');


module.exports = [
    body('userName').trim().notEmpty().withMessage('Username is required.'),

    body('email').trim().notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Incorrect email address.'),

    body('mobileNumber').trim().notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone('any').withMessage('Incorrect mobile number.'),

    body('password').trim().notEmpty().withMessage('Pasword field is required.')
        .isLength({ min: 8 }).withMessage('Please enter at least 8 characters.'),

    body('confirm_password').trim().notEmpty().withMessage('Confirm pasword field is required.')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Password confirmation does not match password.');
            else return true
        })
]