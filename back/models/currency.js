const mongoose = require('mongoose');

const model_currency = new mongoose.Schema(
{
    index: { type: Number, unique: true },
    name: [String],
    singular: [String],
    plural: [String],
    code: { type: String, unique: true },
    symbol: String,
    symbol_before_amount: { type: Boolean, default: true }
}, { collection: 'Currencies' });

module.exports = mongoose.model('Currency', model_currency);

