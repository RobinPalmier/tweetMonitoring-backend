const express = require('express')
const router = require('express-promise-router')()



const keywordController = require('../controllers/keywordController');

router.route('/keywords')
    .post(keywordController.addKeyword)
    .get(keywordController.getKeyword)

module.exports = router;
