const express = require('express');
const router = express.Router();
const Article = require('../models/article.model.js');
const Category = require('../models/category.model.js');

router.get('/articles', (req, res) => 
{
	Article.find()
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The articles can\'t be retrieved.' }))
	.then(articles => res.status(200).json({ status: 200, title: 'Success', message: articles }));
});

router.post('/articles', (req, res) => 
{
	new Article(
	{
		...req.body.new_article
	})
	.save()
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be posted.' }))
	.then(() => 
	{
		Category.findOne({ name: req.body.new_article.category })
		.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be posted.' }))
		.then(category => 
		{
			if (category == null)
			{
				new Category({ name: req.body.new_article.category })
				.save()
				.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be posted.' }))
				.then(category => console.log(`> "${category.name}" category created`));
			}

			Article.find()
			.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be posted.' }))
			.then(articles => 
			{
				console.log(`> Article added to "${category.name}" category`);
				res.status(201).json({ status: 200, title: 'Success', message: articles });
			});
		});
	});
});

router.get('/categories', (req, res) => 
{
	Category.find()
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The categories can\'t be retrieved.' }))
	.then(categories => res.status(200).json({ status: 200, title: 'Success', message: categories }));
});

router.post('/categories', (req, res) => 
{
	let new_category = req.body.new_category;
	new_category = new_category.toLowerCase();
	new_category = new_category[0].toUpperCase() + new_category.substring(1);

	Category.findOne({ name: new_category })
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The category can\'t be created.' }))
	.then((category) => 
	{
		if (category == null)
		{
			new Category(
			{
				name: new_category
			})
			.save()
			.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The new category can\'t be created.' }))
			.then(category => console.log(`> "${category.name}" category created`));
		}

		Category.find()
		.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The category can\'t be created.' }))
		.then(categories => res.status(201).json({ status: 201, title: 'Success', message: categories }));
	});
});

router.get('/*', (req, res) => 
{
	res.status(404).json({ status: 404, title: 'Page Not Found', message: 'I\'m sorry, this page doesn\'t exist.' });
});

module.exports = router;

