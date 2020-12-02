const user = require('express').Router();
const { VerifyToken } = require('../helpers/helper.jwt');

const addChannel = require('../controllers/user/Controller.addChannel');
const getChannels = require('../controllers/user/Controller.getChannel');
const likeChannel = require('../controllers/user/Controller.likeChannel');
const getLikes = require('../controllers/user/Controller.getLikes');

user.post('/addChannel', addChannel);
user.put('/likeChannel', likeChannel);
user.get('/getLike', getLikes);
user.get('/getChannels', getChannels);

user.use(VerifyToken);

module.exports = user;