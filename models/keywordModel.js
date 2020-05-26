const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a schema
const keywordSchema = new Schema({
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
    }
})


// Create a model
const Keyword = mongoose.model('keyword', keywordSchema)

// Export the model
module.exports = Keyword;