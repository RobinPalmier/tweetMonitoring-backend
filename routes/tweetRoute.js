const express = require('express')
const router = require('express-promise-router')()



const tweetController = require('../controllers/tweetController');

router.route('/tweets')
    .post(tweetController.addTweet)
    .get(tweetController.getTweet)

module.exports = router;
