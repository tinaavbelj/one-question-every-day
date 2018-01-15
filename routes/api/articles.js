const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'pdfs/' })
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const Article = require('../../models/Article')

router.use(verifyToken);

router.get('/', async ((req, res) => {
    try {
        const articles = await (Article.find({}, '-__v'))
        res.send(articles)     
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.get('/:id', async ((req, res) => {
    try {
        const article = await (Article.findById(req.params.id, '-__v'))
        res.status(200).send(article)  
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.get('/pdf/:filename', (req, res) => {
    const name = req.params.filename

    if (!name) {
        res.status(400).send('Parameter \'filename\' is required')
    } else {
        const filename = path.join(__dirname, '../../pdfs/', name)
        if (fs.existsSync(filename)) {
            res.download(filename)
        } else {
            res.status(404).send('PDF with such name does not exist')
        }
    }
})

router.post('/', [ verifyAdmin, upload.single('pdf') ], async ((req, res) => {
    const articleData = JSON.parse(req.body.data)
    const pdfFile = req.file

    if (pdfFile) {
        saveFile(pdfFile)
        articleData['pdf'] = pdfFile.originalname
    }

    const article = new Article(articleData)
    
    try {
        await (article.save())
        res.sendStatus(201).send(article)
    } catch (error) {
        res.sendStatus(500)
    }
}))

router.put('/:id', [ verifyAdmin, upload.single('pdf') ], async ((req, res) => {
    const articleData = JSON.parse(req.body.data)
    const pdfFile = req.file

    if (pdfFile) {
        saveFile(pdfFile)
        articleData['pdf'] = pdfFile.originalname
    }

    try {
        await (Article.findOneAndUpdate({ _id: req.params.id }, { $set: articleData }, {}))
        res.sendStatus(204).send('Article successfully updated')
    } catch (error) {
        res.sendStatus(404)
    }
}))

router.delete('/:id', verifyAdmin, async ((req, res) => {
    try {
        await (Article.remove({ _id: req.params.id }))
        res.sendStatus(204).send('Article successfully deleted')
    } catch (error) {
        res.sendStatus(404)
    }
}))

function saveFile (pdfFile) {
    const tmpFilename = path.join(__dirname, '../../', pdfFile.path)
    const filename = path.join(__dirname, '../../pdfs/', pdfFile.originalname)
    fs.renameSync(tmpFilename, filename)
}

module.exports = router
