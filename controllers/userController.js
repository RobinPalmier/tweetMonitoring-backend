const JWT = require('jsonwebtoken')
const User = require('../models/userModel')

signToken = user => {
    return JWT.sign({
        iss: 'ipssitweeter',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, 'codeworkrauthentication')
}

module.exports = {
    signUp: async (req, res, next) => {
        // Email & password
        const { email, password, firstName, lastName, age } = req.value.body

        // Check if the email already exists
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(409).json({ error: 'Email already exists' })
        }

        // Create the user
        const newUser = new User({ email, password, firstName, lastName, age })
        await newUser.save();
        const token = signToken(newUser)
        console.log(foundUser);

        // respond with token
        res.status(200).json({
            status: 'success',
            data: {token}
        })
    },

    signIn: async (req, res, next) => {
        // Generate token
        console.log('login user', req.body.email)
        const token = signToken(req.user)
        res.status(200).json({ 
            status: 'success',
            data: {token}
        })
    },

    me: async (req, res, next) => {
        console.log('I managed to get here !')
        console.log('res', req.user.email)
        const userFound = await User.findOne({email: req.user.email})
        res.json({status: 'success', data: userFound })
    },

    students: async (req, res, next) => {
        const users = await User.find({userType: "Student"})
        res.status(200).json({users})
    },

    teachers: async (req, res, next) => {
        const users = await User.find({userType: "Teacher"})
        res.status(200).json({users})
    },

    allUsers: async (req, res, next) => {
        const users = await User.find()
        console.log(users)
        res.status(200).json({users})
    },


}