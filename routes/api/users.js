const express = require('express')
const router = express.Router()
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const User = require('../../models/User')

router.use(verifyToken);

router.get('/', async ((req, res) => {
    try {
        const sortByPoints = { points: -1 }
        const users = await (User.find({}, '-_id -admin -password -__v').sort(sortByPoints))
        res.status(200).send(users)
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.get('/me', async ((req, res) => {
    try {
        const user = await (User.findById(req.decoded.id, '-password -__v'))
        res.status(200).send(user)  
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.get('/:id', verifyAdmin, async ((req, res) => {
    try {
        const user = await (User.findById(req.params.id, '-password -__v'))
        res.status(200).send(user)  
    } catch (error) {
        res.sendStatus(404)
    }  
}))

router.put('/:id', async ((req, res) => {
    const userData = req.body

    try {
        await (User.findOneAndUpdate({ _id: req.params.id }, { $set: userData }, {}))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.delete('/:id', verifyAdmin, async ((req, res) => {
    try {
        await (User.remove({ _id: req.params.id }))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
}))

module.exports = router
