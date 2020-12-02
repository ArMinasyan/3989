const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusEnum = {
    ONLINE: true,
    OFFLINE: false
}

const userSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    // confirmPass: {
    //     type: String
    // },
    delete: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    verificationCode: {
        type: Schema.Types.ObjectId,
        ref: 'verifyCode'
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: statusEnum.OFFLINE,
        lastConnect: {
            type: Date,
            default: null
        }
    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'channel'
    }],
    likeChannels: [{
        type: Schema.Types.ObjectId,
        ref: 'channel'
    }],
    chat: [{
        type: Schema.Types.ObjectId,
        ref: 'chat'
    }]
})

const verifySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    code: {
        type: Number
    },
    createdAt: { type: Date, expires: 420, default: Date.now }
})

verifySchema.index({ "lastModifiedDate": 1 }, { expireAfterSeconds: 420 });

module.exports = { userSchema, verifySchema }
// module.exports={userSchema,ver}
// mongoose.model('user', userSchema);
// mongoose.model('verifyCode', verifySchema);