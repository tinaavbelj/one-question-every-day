const express = require('express')
const router = express.Router()
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verifyToken = require('../middleware/verifyToken')
const User = require('../../models/User')

router.post('/register', async ((req, res) => {
    let registerData = req.body
    registerData['admin'] = false
    registerData['points'] = 0
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    registerData['lastAnswer'] = yesterday

    var user

    // check if the user with the given username already exists
    user = await (User.findOne({ username: registerData.username }))
    if (user) {
        return res.status(400).send('Username is already taken')
    }

    // check if the user with the given email already exists
    user = await (User.findOne({ email: registerData.email }))
    if (user) {
        return res.status(400).send('Email is already taken')
    }

    user = new User(registerData)
    
    try {
        await (user.save())
        res.status(201).send(`User '${user.username}' successfully created`)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred on the server')
    }
}))

router.post('/login', async ((req, res) => {
    const userData = req.body

    // check if the user with the given email exists
    const user = await (User.findOne({ email: userData.email }))
    if (!user) {
        return res.status(404).send('User with such email does not exist')
    }

    // compare passwords
    bcrypt.compare(userData.password, user.password, (err, same) => {
        // unauthorized
        if (!same) {
            return res.status(401).send('Password is invalid')
        }
        // generate token
        else {
            const payload = {
                id: user._id,
                admin: user.admin
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(201).send({ token: token })
        }
    })
}))

router.post('/logout', async ((req, res) => {
    res.status(200).send('User successfully logged out')
}))

router.get('/verify', verifyToken, async ((req, res) => {
    res.status(200).send('User is authenticated')
}))

module.exports = router
