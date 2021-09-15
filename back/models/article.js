const mongoose = require('mongoose');

const model_article = new mongoose.Schema(
{
    likes: Number,
    time_creation: Date,
    time_modification: Date,
    is_modified: Boolean,
    category: String,
    title: String,
    content: String
}, { collection: 'Articles' });

module.exports = mongoose.model('Article', model_article);

