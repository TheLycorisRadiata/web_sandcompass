const mongoose = require('mongoose');

const model_category = new mongoose.Schema(
{
    name: [String],
    articles:
    {
        eng: [mongoose.Schema.Types.ObjectId],
        fr: [mongoose.Schema.Types.ObjectId],
        jp: [mongoose.Schema.Types.ObjectId]
    }
}, { collection: 'Categories' });

module.exports = mongoose.model('Category', model_category);

