module.exports = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const find = await Models.channel.find()
            .limit(limit * 1)
            .sort({ _id: -1 }) //get latest documents
            .skip((page - 1) * limit)
            .exec();
        return respFunc.successHandler(res, find);
    } catch (err) {
        return respFunc.errorHandler(res, err);
    }
}