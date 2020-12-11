module.exports.InsertProfileImg = (req, res, next) => {
    if (req.session.user.error) res.status(200).json({
        err: req.session.user.error
    });
    else res.status(200).json({
        profile_img: req.session.user.profile_img
    });
}


module.exports.InsertChannelImg = (req, res, next) => {
    if (req.session.user.error) res.status(200).json({
        err: req.session.user.error
    });

    else res.status(200).json({
        channel_img: req.session.user.channel_img
    });
}