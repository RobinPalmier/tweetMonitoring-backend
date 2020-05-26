const JWT = require('jsonwebtoken')
const Keyword = require('../models/keywordModel')

module.exports = {
    addKeyword: async(req, res, next) => {
        const { text, replyCount, retweetCount, favoriteCount, user, id } = req.body;
        const foundKeyword = await Keyword.findOne({id: req.body.id});
        console.log(foundKeyword);
        if(foundKeyword) {
            return res.status(404).json({ message: 'Tweet already exists'})
        }
        const newTweet = new Keyword({ text, replyCount, retweetCount, favoriteCount, user, id });
        await newTweet.save();

        return res.status(200).json({
            status: 'success',
            message: 'Tweet successfully saved',
            data: Keyword,
        })
    },

    getKeyword: async(req, res, next) => {
        const keywords = await Keyword.find()
        console.log(keywords)
        res.status(200).json({keywords})
    }
}
