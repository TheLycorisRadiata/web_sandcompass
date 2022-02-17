const mongoose = require('mongoose');

const model_category = new mongoose.Schema(
{
    code: { type: String, unique: true, lowercase: true },
    name: [String]
}, { collection: 'Categories', versionKey: false });

module.exports = mongoose.model('Category', model_category);

