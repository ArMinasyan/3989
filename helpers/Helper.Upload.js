const multer = require('multer');
const multerS3 = require('multer-s3');


const User = require('../models/models').user;
const path = require('path');

const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: process.env.DOSpacesAccessKeyId,
    secretAccessKey: process.env.DOSpacesSecretAccessKey
});

const spacesEndpoint = new AWS.Endpoint(`${process.env.DOContainer}/ProfileImages`);
const spacesEndpoint1 = new AWS.Endpoint(`${process.env.DOContainer}/ChannelImages`);

const s3 = new AWS.S3({
    endpoint: spacesEndpoint
});

const s3_1 = new AWS.S3({
    endpoint: spacesEndpoint1
})



const filter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        req.session.user.error = 'Only .png, .jpg and .jpeg format allowed!';
    }
};


const profileImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.DOBucket,
        acl: 'public-read',
        key: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const imgPath = 'profile_' + req.session.user.id + ext;
            User.findByIdAndUpdate(req.session.user.id, {
                profileImgPath: imgPath
            }).then(updated => {
                cb(null, imgPath);
                req.session.user.profile_img = imgPath;
            })
        }
    }),
    fileFilter: filter
});

const channelImage = multer({
    storage: multerS3({
        s3: s3_1,
        bucket: process.env.DOBucket,
        acl: 'public-read',
        key: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const imgPath = 'channel_' + req.query.channel + '_' + req.session.user.id + ext;
            
            User.findByIdAndUpdate(req.session.user.id, {
                $addToSet: {
                    channelImgPaths: {
                        channelName: req.query.channel,
                        path: imgPath
                    }
                }
            }).then(updated => {
                cb(null, imgPath);
                req.session.user.channel_img = imgPath;
            })
        }
    }),
    fileFilter: filter
});


module.exports = { profileImage, channelImage }
