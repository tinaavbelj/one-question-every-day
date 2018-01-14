const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    admin: Boolean,
    points: Number,
    answeredToday: Boolean,
    lastAnswer: Boolean
})

userSchema.pre('save', function(next) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.pasword, salt, null, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', userSchema)
