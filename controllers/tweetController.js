const JWT = require('jsonwebtoken')
const Tweet = require('../models/tweetModel')

const accessTwiter = require('../twitter-connect');
const Twitter = require('../functions/twitterFunctions');

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

    getTweet: async(res) => {
        const tweets = await Tweet.find()
        console.log(tweets)
        res.status(200).json({tweets})
    },

    getTweetByUser: async(req,res) => {
        accessTwiter.get('statuses/user_timeline', { screen_name: req.params.userName, count: 100 })
        .then((result) => {
            const data = result.map((userData) => { 
                return {
                    userTwitterId: userData.id,
                    name: userData.user.name,
                    screen_name: userData.user.screen_name,
                    text: userData.text,
                    dateTweet: userData.created_at,
                    avatar: userData.user.profile_image_url
                };
            });

            return res.status(200).json({data});
        })
        .catch((err) => {
            console.log('ERROR :', err.stack);
        })
    }
}
