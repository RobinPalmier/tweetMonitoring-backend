const JWT = require('jsonwebtoken')
const Tweet = require('../models/tweetModel')

module.exports = {
    addTweet: async(req, res, next) => {
        const { text, replyCount, retweetCount, favoriteCount, user, id, createdAt } = req.body;
        const foundTweet = await Tweet.findOne({id: req.body.id});
        console.log(foundTweet);
        if(foundTweet) {
            return res.status(404).json({ message: 'Tweet already exists'})
        }
        const newTweet = new Tweet({ text, replyCount, retweetCount, favoriteCount, user, id, createdAt });
        await newTweet.save();

        return res.status(200).json({
            status: 'success',
            message: 'Tweet successfully saved',
            data: Tweet,
        })
    },

    getTweet: async(req, res, next) => {
        const tweets = await Tweet.find()
        console.log(tweets)
        res.status(200).json({tweets})
    }
}
