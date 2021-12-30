const mongoose = require('mongoose');

// Rank: 0 is "Customer", 1 is "Employee" and 2 is "Administrator"

const model_user = new mongoose.Schema(
{
    registered_on: { type: Date, default: Date.now },
    is_admin: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
    is_connected: Boolean,
    email_address: { type: String, unique: true, lowercase: true },
    password: String,
    name: String,
    url_profile_picture: String
}, { collection: 'Users' });

module.exports = mongoose.model('User', model_user);

