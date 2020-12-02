module.exports = async (req, res) => {
    try {
        const { id, channelId } = req.query;
        const likeChannel = await Models.channel.updateOne({ _id: channelId, delete: false }, {
            $push: { usersLike: id }
        })
        console.log(likeChannel)
        if (likeChannel.nModified === 0) {
            let err = {};
            err.message = 'Channel is not Find';
            return respFunc.errorHandler(res, err);
        }
        const likeUser = await Models.channel.updateOne({ _id: id, delete: false, verified: true }, {
            $push: { likeChannels: channelId }
        })
        if (likeUser.nModified === 0) {
            let err = {};
            err.message = 'User is not Find';
            return respFunc.errorHandler(res, err);
        }
        res.message = 'You likes on this channel!';
        return respFunc.successHandler(res, null)
    } catch (err) {
        return respFunc.errorHandler(res, err);
    }
}