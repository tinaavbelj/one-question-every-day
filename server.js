const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const index = require('./routes/web/index')
const auth = require('./routes/api/auth')
const users = require('./routes/api/users')
const articles = require('./routes/api/articles')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))

// create directory for PDF file uploads
const dir = __dirname + '/pdfs/'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

app.use('/', index)
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/articles', articles)

mongoose.connect(process.env.MONGO_URL, (err) => {
    if (!err) {
        console.log('Connected to mongo database...')

        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server running on port ${port}...`)
        })
    }
})
