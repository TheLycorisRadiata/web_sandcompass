const mongoose = require('mongoose');

const model_category = new mongoose.Schema(
{
    name: { type: String, default: 'NO_NAME' }
}, { collection: 'Categories' });

module.exports = mongoose.model('Category', model_category);

