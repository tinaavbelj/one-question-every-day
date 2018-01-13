var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var jwt = require('jwt-simple')
var app = express()
var bcrypt = require('bcrypt-nodejs')
var User = require('./models/User.js')
var Article = require('./models/Article.js')

var questions = 
[
    {
        "questionId": 1,
        "questionText": "What’s the difference between regular food and organic food?",
        "questionAnswers": ["answer 1", "word word word", "a3What’s the difference between regular food and org", "a4"],
        "questionRightAnswer": "a3",
        "questionCategory": "Consumerism",
        "questionDate": "4.12.2017"
    },
    {
        "questionId": 2,
        "questionText": "What’s the difference between regular food and organic food?2",
        "questionAnswers": ["a1", "a2", "a3", "a4"],
        "questionRightAnswer": "a3",
        "questionCategory": "Recycling",
        "questionDate": "5.12.2017"
    },
    {
        "questionId": 3,
        "questionText": "What’s the difference between regular food and organic food?3",
        "questionAnswers": ["a1", "a2", "a3", "a4"],
        "questionRightAnswer": "a3",
        "questionCategory": "Ecosystem",
        "questionDate": "6.12.2017"
    },
    {
        "questionId": 4,
        "questionText": "What’s the difference between regular food and organic food?4",
        "questionAnswers": ["a1", "a2", "a3", "a4"],
        "questionRightAnswer": "a3",
        "questionCategory": "Consumerism",
        "questionDate": "7.12.2017"
    }

]

app.use(cors())
app.use(bodyParser.json())

app.get('/questions', (req, res) => {
    res.status(200).send(questions)
})

app.get('/users', async ((req, res) => {
    try {
        var sortByPoints = { points: -1 }
        var users = await (User.find({}, '-password -__v').sort(sortByPoints))
        res.status(200).send(users)     
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}))

app.get('/users/:id', async ((req, res) => {
    try {
        var user = await (User.findById(req.params.id, '-password -__v'))
        res.status(200).send(user)  
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }  
}))

app.put('/users/:id', async ((req, res) => {
    var userData = req.body

    try {
        await (User.findOneAndUpdate({ _id: req.params.id }, { $set: userData }, {}))
        res.sendStatus(204)
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }
}))

app.delete('/users/:id', async ((req, res) => {
    try {
        await (User.remove({ _id: req.params.id }))
        res.sendStatus(204)
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }
}))

app.post('/register', async ((req, res) => {
    var userData = req.body
    var user = new User(userData)
    
    try {
        await (user.save())
        res.status(201).send(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}))

app.post('/login', async ((req, res) => {
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

app.get('/articles', async ((req, res) => {
    try {
        var articles = await (Article.find({}))
        res.send(articles)     
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}))

app.get('/articles/:id', async ((req, res) => {
    try {
        var article = await (Article.findById(req.params.id))
        res.status(200).send(article)  
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }
}))

app.post('/articles', async ((req, res) => {
    var articleData = req.body
    var article = new Article(articleData)
    
    try {
        await (article.save())
        res.sendStatus(201)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}))

app.put('/articles/:id', async ((req, res) => {
    var articleData = req.body

    try {
        await (Article.findOneAndUpdate({ _id: req.params.id }, { $set: articleData }, {}))
        res.sendStatus(204)
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }
}))

app.delete('/articles/:id', async ((req, res) => {
    try {
        await (Article.remove({ _id: req.params.id }))
        res.sendStatus(204)
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }
}))

mongoose.connect('mongodb://test:test@ds231987.mlab.com:31987/oq', (err) => {
    if (!err) {
        console.log('connected to mongo')
    }
})

app.listen(3000)

