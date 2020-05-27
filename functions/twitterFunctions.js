const accessTwiter = require('../twitter-connect');
const CronJob = require('cron').CronJob;

const TwitterFunctions = {
    keywordsParse: (keyword) => {
        let regex = /[#]/g;
        let isMatch = keyword.match(regex);
        return !isMatch ? "#".concat(keyword) : keyword;
    },
    twitterFetchDataByCountry: (idCountry) => {
        new CronJob('*/10 * * * * *', () => {
            accessTwiter.get('trends/place', { id: idCountry, count: 2 })
            .catch((err) => {
                console.log('ERROR :', err.stack);
            })
            .then((result) => {
                let parseData = [];
                let date = result[0].created_at;

                result[0].trends.map((keyword) => {
                    parseData.push({
                        date: date,
                        count: keyword.tweet_volume,
                        keyword: keyword.name
                    })
                });
                console.log('data parsed', parseData);
            });
        }).start();
    },
    twitterFetchDataByKeywords: (word) => {
        new CronJob('*/10 * * * *', () => {
            accessTwiter.get('search/tweets', { q: TwitterFunctions.keywordsParse(word), count: 2 })
            .catch((err) => {
                console.log('ERROR :', err.stack);
            })
            .then(function (result) {
                let parseData = [];
                result.statuses.map((keyword) => { 
                    parseData.push({
                        date: keyword.created_at,
                        idTweet: keyword.id,
                        keyword: TwitterFunctions.keywordsParse(word)
                    })
                });

                console.log('data parsed', parseData);
            });
        }).start();
    }
}

module.exports = TwitterFunctions;