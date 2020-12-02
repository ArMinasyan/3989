const Models = require('../../models/models');
const { CreateToken } = require('../../helpers/helper.jwt');

module.exports = async (req, res) => {
    try {
        const { email, code } = req.query;
        const findUser = await Models.user.findOne({ email: email }).populate('verificationCode');
        if (findUser) {
            if (findUser.verificationCode == null) res.status(200).json({ msg: 'The verification code was expired!' });
            else {
                if (code != findUser.verificationCode.code) res.status(200).json({ msg: 'Invalid verification code!' });
                else {
                    const ver = await Models.user.updateOne({ email: email }, { $set: { verified: true } });
                    if (ver) res.status(200).json({ token: CreateToken({ email: ver.email, time: Date.now() }) });
                }
            }
        } else res.status(200).json({ msg: "Don't find this user!" })
    } catch (err) {
        return res.status(500).send(err)
    }
}