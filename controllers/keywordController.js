const JWT = require('jsonwebtoken')
const CronJob = require('cron').CronJob;

const accessTwiter = require('../twitter-connect');
const Keyword = require('../models/keywordModel');

module.exports = {

    // Keyword Global
    getKeywordByCountry: async (req, res, next) => {
        const keyword = await Keyword.find({woeid: req.body.woeid});
        return res.status(200).json(keyword);
    },

    // Keyword User
    addKeyword: async (date, counter, keyword) => {
        const newKeyword = new Keyword({keyword, date, counter});
        await newKeyword.save();
    },

    // getOneKeyword: async (req, res, next) => {
    //     const foundKeyword = await Keyword.findOne({keyword: })
    //     return res.status(200).json(allKeywords);
    // },

    deleteKeyword: async (req, res, next) => {
        const keyword = Keyword.find({hashTag: req.params.hashTag});
        await Keyword.deleteOne(keyword);
        return res.status()
    }

}
