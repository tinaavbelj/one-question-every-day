const mongoose = require('mongoose')

module.exports = mongoose.model('Question', {
    text: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    correctAnswer: String,
    articleText: String
    //article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article'}
})
