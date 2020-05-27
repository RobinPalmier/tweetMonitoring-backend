const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a schema
const tweetSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    replyCount: {
        type: Number,
    },
    retweetCount: {
        type: Number,
    },
    favoriteCount: {
        type: Number,
    },
    user: {
        name: {
            type: String,
        },
        avatar: {
            type: String,
        }
    },
    id: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


// Create a model
const Tweet = mongoose.model('tweet', tweetSchema)

// Export the model
module.exports = Tweet;