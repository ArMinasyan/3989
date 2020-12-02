const mongoose = require('mongoose');
const { userSchema, verifySchema } = require('./Schemas/User');

require('./Schemas/Channel');
require('./Schemas/Chat');

const user = mongoose.model('user', userSchema);
const verifyCode = mongoose.model('verifyCode', verifySchema);
const channel = mongoose.model('channel');
const chat = mongoose.model('chat');
const group = mongoose.model('group');

module.exports = {
    user,
    verifyCode,
    channel,
    chat,
    group
}