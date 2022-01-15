const mongoose = require('mongoose');

const model_category = new mongoose.Schema(
{
    name: [String],
    articles: [mongoose.Schema.Types.ObjectId]
}, { collection: 'Categories' });

module.exports = mongoose.model('Category', model_category);

