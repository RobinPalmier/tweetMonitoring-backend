const JWT = require('jsonwebtoken')
const CronJob = require('cron').CronJob;

const accessTwiter = require('../twitter-connect');
const Keyword = require('../models/keywordModel')

module.exports = {

    // Keyword Global
    getKeywordByCountry: async (req, res, next) => {
        new CronJob('*/10 * * * * *', () => {
            accessTwiter.get('trends/place', { id: req.params.woeid })
            .then((result) => {
                const data = result.map((keyword) => {
                    return keyword.trends.map((trend) => {
                        return {
                            date: keyword.created_at,
                            count: trend.tweet_volume,
                            keyword: trend.name
                        }
                    })
                });
                return res.status(200).json(data.flat());
            })
            .catch((err) => {
                console.log('ERROR :', err.stack);
            })
        }).start();
    },

    // Keyword User
    addKeyword: async (req, res, next) => {
        const {keyword, date, counter} = req.body;
        const newKeyword = new Keyword({keyword, date, counter});
        await newKeyword.save();
        return res.status(200).json({
            status: 'success',
            message: 'Tweet successfully added',
        })
    },

    allKeywords: async (req, res, next) => {
        const allKeywords = await Keyword.find();
        return res.status(200).json(allKeywords);
    },

    deleteKeyword: async (req, res, next) => {
        const keyword = Keyword.find({hashTag: req.params.hashTag});
        await Keyword.deleteOne(keyword);
        return res.status()
    }

}
