const express = require('express')
const router = express.Router()
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const Article = require('../../models/Article')

router.get('/', async ((req, res) => {
    try {
        var articles = await (Article.find({}))
        res.send(articles)     
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.get('/:id', async ((req, res) => {
    try {
        var article = await (Article.findById(req.params.id))
        res.status(200).send(article)  
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.post('/', async ((req, res) => {
    var articleData = req.body
    var article = new Article(articleData)
    
    try {
        await (article.save())
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.put('/:id', async ((req, res) => {
    var articleData = req.body

    try {
        await (Article.findOneAndUpdate({ _id: req.params.id }, { $set: articleData }, {}))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.delete('/:id', async ((req, res) => {
    try {
        await (Article.remove({ _id: req.params.id }))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
}))

module.exports = router
