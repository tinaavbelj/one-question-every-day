var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    points: Number,
    answeredToday: Boolean,
    lastAnswer: Boolean

})

userSchema.pre('save', function(next) {
    var user = this

    if (!user.isModified('password'))
        return next()
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.pasword, salt, null, (err, hash) => {
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', userSchema)
