const mongoose = require('mongoose');

const model_user = new mongoose.Schema(
{
    registered_on: { type: Date, default: Date.now },
    is_admin: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
    verified_user: { type: Boolean, default: false },
    email_address: { type: String, unique: true, lowercase: true },
    hashed_password: { type: String, default: null },
    username: { type: String, unique: true }
}, { collection: 'Users' });

module.exports = mongoose.model('User', model_user);

