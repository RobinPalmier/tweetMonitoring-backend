const express = require('express')
const router = require('express-promise-router')()
const passport = require('passport')
const passportConf = require('../passport')


const { validateBody, schemas } = require('../helpers/routeHelpers')
const userController = require('../controllers/userController');
const passportSignIn = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/signup')
    .post(validateBody(schemas.signUpSchema), userController.signUp)

router.route('/signin')
    .post(validateBody(schemas.signInSchema), passportSignIn, userController.signIn)

router.route('/me')
    .get(passportJWT, userController.me)

router.route('/allUsers')
    .get(userController.allUsers)

module.exports = router;