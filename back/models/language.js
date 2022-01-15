const mongoose = require('mongoose');

const model_language = new mongoose.Schema(
{
    index: { type: Number, unique: true },
    name: [String]
}, { collection: 'Languages' });

module.exports = mongoose.model('Language', model_language);

