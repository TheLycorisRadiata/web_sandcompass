const mongoose = require('mongoose');

const model_product = new mongoose.Schema(
{
    title: String,
    author: mongoose.Schema.Types.ObjectId,
    type: String,
    subtype: String,
    genre: String,
    release_date: Date,
    summary: String,
    cover_picture: { type: Buffer, default: null },
    files: [Buffer],
    links_to_review_pages: [String],
    link_to_codebase: String,
    price: [Number]
}, { collection: 'Products', versionKey: false });

module.exports = mongoose.model('Product', model_product);

