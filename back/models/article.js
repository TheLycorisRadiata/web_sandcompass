const mongoose = require('mongoose');

const model_article = new mongoose.Schema(
{
    category: { type: String, default: 'NO_CATEGORY' },
    title: { type: String, default: 'NO_TITLE' },
    content: { type: String, default: 'NO_CONTENT' },
    time_creation: { type: Date, default: Date.now },
    time_modification: { type: Date, default: Date.now },
    is_modified: { type: Boolean, default: false },
    likes: { type: Number, default: 0 }
}, { collection: 'Articles' });

module.exports = mongoose.model('Article', model_article);

