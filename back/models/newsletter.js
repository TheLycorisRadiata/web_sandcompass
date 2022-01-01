const mongoose = require('mongoose');

const model_newsletter = new mongoose.Schema(
{
    title: { type: 'String', default: 'Test' },
    html_message: { type: 'String', default: '<html><body><p>Test: Ignore this email.</p></body></html>' },
    date: { type: Date, default: Date.now },
    is_sent: { type: Boolean, default: false }
}, { collection: 'Newsletters' });

module.exports = mongoose.model('Newsletter', model_newsletter);

