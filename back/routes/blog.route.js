const express = require('express');
const router = express.Router();

router.get('/nbr/articles', (req, res) => 
{
	const nbr_articles = 1;
	//get the number of blog articles from the database
	res.status(200).json({ message: nbr_articles });
});

router.get('/nbr/categories', (req, res) => 
{
	const nbr_categories = 1;
	//get the number of blog categories from the database
	res.status(200).json({ message: nbr_categories });
});

router.get('/*', (req, res) => 
{
	res.status(404).json({ status: 404, title: 'Page Not Found', message: 'I\'m sorry, this page doesn\'t exist.' });
});

module.exports = router;

