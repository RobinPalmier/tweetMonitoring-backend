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
        const { email, password, firstName, lastName, age, twitterScreenName } = req.value.body

        // Check if the email already exists
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(409).json({ error: 'Email already exists' })
        }

        // Create the user
        const newUser = new User({ email, password, firstName, lastName, age, twitterScreenName })
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
        console.log('res', req.user.email)
        const userFound = await User.findOne({email: req.user.email})
        res.json({status: 'success', data: userFound })
    },

    allUsers: async (req, res, next) => {
        const users = await User.find()
        console.log(users)
        res.status(200).json({users})
    },

    updateUser: async (req, res, next) => {
        try {
            const user = await User.findById({_id: req.params.id})
            const allUsers = await User.find()
            allUsers.forEach((user) => {
                if(req.body.email === user.email) {
                    return res.status(409).json({status: 'error', message: 'this email is already in used !'})
                }
                if(req.body.twitterScreenName === user.twitterScreenName) {
                    return res.status(409).json({status: 'error', message: 'this username already exists !'})
                }
            })
            await User.updateOne(user, req.body);
            return res.status(200).json({
                status: 'success',
                message: 'user updated successfully'
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: 'impossible to update'
            })
        }
    },
    
    deleteUser: async (req, res, next) => {
        try {
            const user = User.findById({_id: req.params.id});
            await User.deleteOne(user);
            return res.status(200).json({
                status: 'success',
                message: 'user had been deleted'
            });
        } catch {
            return res.status(400).json({
                message: 'erreur serveur'
            })
        }
    },

    addKeyword: async (req, res, next) => {
        const userFound = await User.findOne({_id: req.user._id})
        if(userFound.keywords.indexOf(req.params.keyword) != -1) {
            return res.status(400).json({message: 'this keyword already is already saved !'})
        } else {
            userFound.keywords.push(req.params.keyword)
            await userFound.save()
            return res.status(200).json({
                message: 'Keyword has been added !',
                newUser: userFound
            })
        }        
    },

    deleteUserKeyword: async (req, res, next) => {
        console.log('toto')
        const userFound = await User.findOne({email: req.user.email})
        const index = userFound.keywords.indexOf(req.params.keyword)
        if (index > -1) {
            userFound.keywords.splice(index, 1)
        }
        await userFound.save()
        return res.status(200).json({
            message: 'Keyword has been deleted !',
            newUser: userFound
        })
    }

}
