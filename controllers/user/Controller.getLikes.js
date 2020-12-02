module.exports = async (req, res) => {
    try {
        const id = req.query.id;
        const userFind = await Models.channel.findOne({ _id: id, delete: false, verified: true })
            .select('likeChannels').populate('likeChannels')
        res.message = `Count - ${userFind.likeChannels.length}`
        return respFunc.successHandler(res, userFind)
    } catch (err) {
        return respFunc.errorHandler(res, err);
    }
}