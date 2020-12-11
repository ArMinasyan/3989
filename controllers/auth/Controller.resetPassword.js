const { emailSend } = require('../../helpers/Helper.SendEmail');
const Models = require('../../models/models');


module.exports = async (req, res) => {
    try {
        const email = req.query.email;
        const userFind = await Models.user.findOne({ email: email, delete: false, verified: true });
        if (!userFind) {
            let err = {};
            err.message = "User is not find!";
            return respFunc.errorHandler(res, err);
        }
        const code = await emailSend(email);
        const verifyCode = await Models.verifyCode.create({ user: userFind._id, code: code })
        userFind.verificationCode = verifyCode._id;
        await userFind.save();
        res.message = 'Your code sent!';
        return respFunc.successHandler(res, code);
    } catch (err) {
        return respFunc.errorHandler(res, err);
    }
}