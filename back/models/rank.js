const mongoose = require('mongoose');

const model_rank = new mongoose.Schema(
{
    index: { type: Number, unique: true },
    name: [String]
}, { collection: 'Ranks', versionKey: false });

module.exports = mongoose.model('Rank', model_rank);

