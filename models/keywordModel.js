const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a schema
const keywordSchema = new Schema({
    hashTag: {
        type: String,
    },
    date: {
        type: Date,
    },
    counter: {
        type: Number,
    },
    woeid: {
        type: Number,
    }
})

// Create a model
const Keyword = mongoose.model('keyword', keywordSchema)

// Export the model
module.exports = Keyword;
