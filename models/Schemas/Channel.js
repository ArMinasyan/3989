const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryEnum = {
      WEALTH_BUSINESS : 'wealth/business',
      HEALTH: 'health',
      SELF_HELP: 'self-help',
      FOOD: 'food',
      LOVE_RELATIONSHIP: 'love/relationship',
      EDUCATION: 'education'
}

const channelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        default: null
    },
    voiceMessages: {
        type: [String],
        default: []
    },
    videos: {
        type: [String],
        default: []
    },
    usersLike: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    category: {
        type: String,
        default: null
    },
    delete: {
        type: Boolean,
        default: false
    }
})

mongoose.model('channel', channelSchema);