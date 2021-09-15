const mongoose = require('mongoose');

const model_user = new mongoose.Schema(
{
    is_connected: Boolean,
    rank: String,
    name: String,
    password: String,
    url_profile_picture: String
}, { collection: 'Users' });

module.exports = mongoose.model('User', model_user);

