const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

// Create a schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
})

// bcrypt
userSchema.pre('save', async function(next){
    try {
        // generate a salt
        const salt = await bcrypt.genSalt(10);
        // generate password hashed
        const passwordHashed = await bcrypt.hash(this.password, salt)
        // re-assign hashed version over original, plain text password
        this.password = passwordHashed
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

// Create a model
const User = mongoose.model('user', userSchema)

// Export the model
module.exports = User;