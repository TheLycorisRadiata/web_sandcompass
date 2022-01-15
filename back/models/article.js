const mongoose = require('mongoose');

const model_article = new mongoose.Schema(
{
    language: Number,
    category: mongoose.Schema.Types.ObjectId,
    title: { type: String, default: 'NO_TITLE' },
    author: { type: mongoose.Schema.Types.ObjectId, default: null },
    content: { type: String, default: 'NO_CONTENT' },
    time_creation: { type: Date, default: Date.now },
    time_modification: { type: Date, default: Date.now },
    is_modified: { type: Boolean, default: false },
    users:
    {
        likes: [mongoose.Schema.Types.ObjectId],
        dislikes: [mongoose.Schema.Types.ObjectId]
    }
}, { collection: 'Articles' });

module.exports = mongoose.model('Article', model_article);

