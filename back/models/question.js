const mongoose = require('mongoose');

const model_question = new mongoose.Schema(
{
    question: String,
    answer: String
}, { collection: 'Questions' });

module.exports = mongoose.model('Question', model_question);

