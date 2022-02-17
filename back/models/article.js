const mongoose = require('mongoose');

const model_article = new mongoose.Schema(
{
    code: { type: String, unique: true, lowercase: true },
    categories: [mongoose.Schema.Types.ObjectId],
    title: [String],
    author: { type: mongoose.Schema.Types.ObjectId, default: null },
    content: [String],
    time_creation: { type: Date, default: Date.now },
    time_modification: { type: Date, default: Date.now },
    is_modified: { type: Boolean, default: false },
    users:
    {
        likes: [mongoose.Schema.Types.ObjectId],
        dislikes: [mongoose.Schema.Types.ObjectId]
    }
}, { collection: 'Articles', versionKey: false });

module.exports = mongoose.model('Article', model_article);

