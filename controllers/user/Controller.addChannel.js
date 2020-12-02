module.exports = async (req, res) => {
    try {
        const body = req.body;
        const createChannel = await Models.channel.create(body);
        const updateUser = await Models.user.updateOne({ _id: body.user, delete: false, verified: true }, {
            $push: { channels: createChannel._id }
        })
        if (updateUser.nModified === 0) {
            let err = {};
            err.message = 'User is not Find';
            await Models.channel.deleteOne({ _id: createChannel._id });
            return respFunc.errorHandler(res, err);
        }
        return respFunc.successHandler(res, createChannel);
    } catch (err) {
        return respFunc.errorHandler(res, err);
    }
}