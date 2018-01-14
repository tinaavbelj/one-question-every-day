const express = require('express')
const router = express.Router()
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const User = require('../../models/User')

router.get('/', async ((req, res) => {
    try {
        var sortByPoints = { points: -1 }
        var users = await (User.find({}, '-password -__v').sort(sortByPoints))
        res.status(200).send(users)
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.get('/:id', async ((req, res) => {
    try {
        var user = await (User.findById(req.params.id, '-password -__v'))
        res.status(200).send(user)  
    } catch (error) {
        res.sendStatus(404)
    }  
}))

router.put('/:id', async ((req, res) => {
    var userData = req.body

    try {
        await (User.findOneAndUpdate({ _id: req.params.id }, { $set: userData }, {}))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.delete('/:id', async ((req, res) => {
    try {
        await (User.remove({ _id: req.params.id }))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.post('/register', async ((req, res) => {
    var userData = req.body
    var user = new User(userData)
    
    try {
        await (user.save())
        res.status(201).send(user)
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.post('/login', async ((req, res) => {
    var userData = req.body

    // check if the user with the given email exists
    var user = await (User.findOne({email: userData.email}))
    if (!user) {
        return res.status(404).send({message: 'user with such email does not exist'})
    }

    // compare passwords
    bcrypt.compare(userData.password, user.password, (err, same) => {
        // temp: remove!
        same = true

        // unauthorized
        if (!same) {
            return res.status(401).send({message: 'password is invalid'})
        }
        // generate token
        else {
            var payload = { sub: user._id }
            var token = jwt.encode(payload, 'secret')
            res.status(201).send({token: token, user: user})
        }
    })
}))

module.exports = router
