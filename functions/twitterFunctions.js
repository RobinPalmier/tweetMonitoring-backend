const CronJob = require('cron').CronJob;

const accessTwiter = require('../twitter-connect');
const woeids = require('../static/woeid.json');
const Keyword = require('../models/keywordModel');


const TwitterFunctions = {
    keywordsParse: (keyword) => {
        let regex = /[#]/g;
        let isMatch = keyword.match(regex);
        return !isMatch ? "#".concat(keyword) : keyword;
    },
    twitterFetchKeywordByCountry: () => {
        new CronJob('* */10 * * * *', () => {
            woeids.forEach((element) => {
                accessTwiter.get('trends/place', { id: element.woeid })
                .then((result) => {
                    result.forEach((keyword) => {
                        keyword.trends.forEach((trend) => {
                            const newKeyword = new Keyword({hashTag: trend.name, date: keyword.created_at, counter: trend.tweet_volume, woeid: element.woeid});
                            newKeyword.save();
                        })
                    });
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        }).start();
    },
    twitterFetchKeywordsByKeyword: (word) => {
        new CronJob('*/10 * * * *', () => {
            accessTwiter.get('search/tweets', { q: TwitterFunctions.keywordsParse(word), count: 2 })
            .then((result) => {
                let parseData = [];
                result.statuses.map((keyword) => { 
                    parseData.push({
                        date: keyword.created_at,
                        idTweet: keyword.id,
                        keyword: TwitterFunctions.keywordsParse(word)
                    })
                });

                console.log('data parsed', parseData);
            })
            .catch((err) => {
                console.log('ERROR :', err.stack);
            })
        }).start();
    },
    twitterFetchTweetByUser: (userName) => {
        accessTwiter.get('statuses/user_timeline', { screen_name: userName, count: 2 })
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
            return data;
        })
        .catch((err) => {
            console.log('ERROR :', err.stack);
        })
    }
}

module.exports = TwitterFunctions;