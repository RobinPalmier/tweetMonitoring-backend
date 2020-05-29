const router = require('express-promise-router')()
const passport = require('passport')

const keywordController = require('../controllers/keywordController');
const passportJWT = passport.authenticate('jwt', { session: false })

// Keyword Global Route
// router.route('/:woeid')
    // .get(keywordController.getKeywordByCountry)
    
// Keyword User Routes
router.route('/all')
    // .get(keywordController.allKeywords)

router.route('/add')
    .post(passportJWT, keywordController.addKeyword)
        
router.route('/:hashtag')
    // .put(passportJWT, keywordController.updateKeyword)
    .delete(passportJWT, keywordController.deleteKeyword)

module.exports = router;
