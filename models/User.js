const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    admin: Boolean,
    points: Number,
    lastAnswer: Date
})

userSchema.pre('save', function(next) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }

    var password = user.password
    var saltRounds = 10

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', userSchema)
