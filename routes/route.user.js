const user = require('express').Router();


const { profileImage, channelImage } = require('../helpers/Helper.Upload');

const addChannel = require('../controllers/user/Controller.addChannel');
const getChannels = require('../controllers/user/Controller.getChannel');
const likeChannel = require('../controllers/user/Controller.likeChannel');
const getLikes = require('../controllers/user/Controller.getLikes');
const { InsertProfileImg, InsertChannelImg } = require('../controllers/user/Controller.insertImgs');

user.post('/addChannel', addChannel);
user.put('/likeChannel', likeChannel);
user.get('/getLike', getLikes);
user.get('/getChannels', getChannels);

user.post('/insertProfileImg', profileImage.single('profileImage'), InsertProfileImg);
user.post('/insertChannelImg', channelImage.single('channelImage'), InsertChannelImg);
module.exports = user;