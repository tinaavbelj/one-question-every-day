const express = require('express')
const router = express.Router()
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const verifyToken = require('../middleware/verifyToken')
const User = require('../../models/User')

router.post('/register', async ((req, res) => {
    const userData = req.body
    const user = new User(userData)
    
    try {
        await (user.save())
        res.status(201).send(`User '${user.username}' successfully created`)
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.post('/login', async ((req, res) => {
    const userData = req.body

    // check if the user with the given email exists
    const user = await (User.findOne({email: userData.email}))
    if (!user) {
        return res.status(404).send({message: 'User with such email does not exist'})
    }

    // compare passwords
    bcrypt.compare(userData.password, user.password, (err, same) => {
        // temp: remove!
        same = true

        // unauthorized
        if (!same) {
            return res.status(401).send({message: 'Password is invalid'})
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
