const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const index = require('./routes/web/index')
const users = require('./routes/api/users')
const articles = require('./routes/api/articles')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/', index)
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
