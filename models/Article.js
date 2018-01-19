const mongoose = require('mongoose')

module.exports = mongoose.model('Article', {
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    correctAnswer: Number,
    date: Date,
    articleText: String,
    url: String,
    pdf: String
})
