const mongoose = require('mongoose');

const model_article = new mongoose.Schema(
{
	likes: Number,
	page_number: Number,
	time: Date,
	category: String,
	title: String,
	content: String
});

module.exports = mongoose.model('Article', model_article);

