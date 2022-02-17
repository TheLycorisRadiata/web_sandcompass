const mongoose = require('mongoose');

const model_language = new mongoose.Schema(
{
    index: { type: Number, unique: true },
    name: [String]
}, { collection: 'Languages', versionKey: false });

module.exports = mongoose.model('Language', model_language);

