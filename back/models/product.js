const mongoose = require('mongoose');

const model_product = new mongoose.Schema(
{
    is_highlighted: Boolean,
    title: [String],
    author: mongoose.Schema.Types.ObjectId,
    type: String,
    subtype: [String],
    genre: [String],
    release_date: [Date],
    catch_phrase: [String],
    summary: [String],
    cover_picture: [Buffer],
    files: [Buffer],
    links_to_review_pages: [{ name: String, link: String }],
    link_to_codebase: String,
    price: [Number]
}, { collection: 'Products', versionKey: false });

module.exports = mongoose.model('Product', model_product);

