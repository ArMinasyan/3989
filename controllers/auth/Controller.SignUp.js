const helpPassword = require('../../helpers/help.password');
const sendEmail = require('../../helpers/sendEmail');
const Models = require('../../models/models');
const SecurePin = require('crypto-random-string')
const respFunc = require('../../respnseFuntions');

const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const error = validationResult(req).array();
    if (error.length > 0) res.status(200).send(error[0].msg); else {
        try {
            const { body } = req;
            const userExists = await Models.user.findOne({ email: body.email });
            if (userExists) res.status(200).json({ msg: 'Email address already exist.' }); else {
                body.password = await helpPassword.hashPassword(body.password);
                let sendObj = {
                    name: body.name,
                    userName: body.userName,
                    email: body.email,
                    mobileNumber: body.mobileNumber,
                    password: body.password
                }
                const userCreate = await Models.user.create(sendObj);
                //const code = SecurePin({ length: 4, type: 'numeric' });
                const code = '1234';
                sendEmail(body.email, code, 'reg').then(async sent => {
                    const verifyCode = await Models.verifyCode.create({ user: userCreate._id, code: code });
                    userCreate.verificationCode = verifyCode._id;
                    await userCreate.save();

                    return respFunc.successHandler(res, userCreate);
                })
            }
        } catch (err) {
            console.log(err);
            return respFunc.errorHandler(res, err);
        }
    }



}