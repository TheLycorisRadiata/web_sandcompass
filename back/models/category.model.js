const mongoose = require('mongoose');

const model_category = new mongoose.Schema(
{
    name: String
});

module.exports = mongoose.model('Category', model_category);

