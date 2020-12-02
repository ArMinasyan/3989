const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    firstUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    secondUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group'
    },
    messages: [{
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        msg: {
            type: String,
            required: true
        }
    }],
    incognito: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    }
})

const groupSchema = new Schema({
    name: {
        type: String,
        default: null
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'chat'
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

mongoose.model('chat', chatSchema);
mongoose.model('group', groupSchema);
