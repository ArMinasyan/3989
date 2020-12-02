const { CreateToken } = require('../../helpers/helper.jwt');
const Models = require('../../models/models');
const passwordHelp = require('../../helpers/help.password');
module.exports = async (req, res) => {
    try {
        const { email, password, mobileNumber } = req.body;
        const user = await Models.user.findOne({ email: email });
        console.log(user);
        if (user) {
            if (!passwordHelp.comparePassword(password, user.password)) res.status(200).json({ msg: 'Incorrect email and /or password.' });

            else res.status(200).json({ token: CreateToken({ email: user.email, time: Date.now() }) });
        } else res.status(200).send({ msg: 'Incorrect email and /or password.' })

        // let userFind;
        // if (email && password) {
        //     userFind = await Models.user.findOne({ email: email, delete: false, verified: true });
        //     if (!userFind) {
        //         let err = {};
        //         err.message = 'User is not find!';
        //         return respFunc.errorHandler(res, err);
        //     }
        //     let compare = await passwordHelp.comparePassword(password, userFind.password);
        //     if (!compare) {
        //         let err = {};
        //         err.message = 'Password is not correct!';
        //         return respFunc.errorHandler(res, err);
        //     }
        //     tok = {
        //         id: userFind._id,
        //         userName: userFind.userName
        //     }
        // } else {
        //     userFind = await user.findOne({ mobileNumber: mobileNumber, delete: false, verified: true }, { password: 0 });
        //     if (!userFind) {
        //         let err = {};
        //         err.message = 'User is not find!';
        //         return respFunc.errorHandler(res, err);
        //     }
        //     tok = {
        //         id: userFind._id,
        //         userName: userFind.userName
        //     }

        //const code = await sendCode(userCreate.mobileNumber);
        // const code = 1422;
        // const verifyCode = await verifyModel.create({user: userFind._id, code: code})
        // userFind.verificationCode = verifyCode._id;
        //  const createToken = CreateToken(tok);
        //  userFind.token = createToken;
        //await userFind.save();
        // userFind = await Models.user.findOne({ _id: userFind._id }, { password: 0, verificationCode: 0 })
        //return respFunc.successHandler(res, CreateToken(tok));
    } catch (err) {
        return respFunc.errorHandler(res, err);
    }
}