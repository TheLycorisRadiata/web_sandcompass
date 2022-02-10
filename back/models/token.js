const mongoose = require('mongoose');

const model_token = new mongoose.Schema(
{
    code: String,
    account: { type: mongoose.Schema.Types.ObjectId },
    action: String,
    created: { type: Date, expires: 7200, default: Date.now } // 2H
}, { collection: 'Tokens' });

module.exports = mongoose.model('Token', model_token);

