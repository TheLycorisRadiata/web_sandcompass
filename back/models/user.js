const mongoose = require('mongoose');

// Rank: 0 is "Customer", 1 is "Employee" and 2 is "Administrator"

const model_user = new mongoose.Schema(
{
    is_admin: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
    registered_on: { type: Date, default: Date.now },
    email_address: { type: String, unique: true, lowercase: true },
    password: { type: String, default: null }
}, { collection: 'Users' });

module.exports = mongoose.model('User', model_user);

