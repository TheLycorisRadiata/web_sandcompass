const Article = require('../models/article.model');
const Category = require('../models/category.model');

exports.retrieve_articles = (req, res) => 
{
	Article.find()
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The articles can\'t be retrieved.' }))
	.then(articles => res.status(200).json({ status: 200, title: 'Success', message: articles }));
};

exports.post_new_article = (req, res) => 
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
};

exports.modify_article = (req, res) => 
{
	Article.updateOne({ _id: req.body.id },
	{
		time_modification: new Date(), // the date is updated again here because doing it on the front doesn't work for some reason
		is_modified: true,
		category: req.body.article.category,
		title: req.body.article.title,
		content: req.body.article.content
	})
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be modified.' }))
	.then(() => 
	{
		Article.find()
		.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be modified.' }))
		.then(articles => 
		{
			console.log(`> Article of ID "${req.body.id}" modified`);
			res.status(200).json({ status: 200, title: 'Article modified', message: articles });
		});
	});
};

exports.delete_article = (req, res) => 
{
	Article.deleteOne({ _id: req.body.id })
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be deleted.' }))
	.then(() => 
	{
		Article.find()
		.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The article can\'t be deleted.' }))
		.then(articles => 
		{
			console.log(`> Article of ID "${req.body.id}" deleted`);
			res.status(200).json({ status: 200, title: 'Article deleted', message: articles });
		});
	});
};

exports.retrieve_categories = (req, res) => 
{
	Category.find()
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The categories can\'t be retrieved.' }))
	.then(categories => res.status(200).json({ status: 200, title: 'Success', message: categories }));
};

exports.create_new_category = (req, res) => 
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
			.then(category => console.log(`> Category "${category.name}" created`));
		}

		Category.find()
		.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The category can\'t be created.' }))
		.then(categories => res.status(201).json({ status: 201, title: 'Success', message: categories }));
	});
};

exports.delete_category = (req, res) => 
{
	Article.findOne({ category: req.body.category})
	.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The category can\'t be deleted.' }))
	.then(article => 
	{
		if (article != null)
			res.status(400).json({ status: 400, title: 'Failure', message: 'The category can\'t be deleted.' });
		else
		{
			Category.deleteOne({ name: req.body.category })
			.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The category can\'t be deleted.' }))
			.then(() => 
			{
				Category.find()
				.catch(() => res.status(400).json({ status: 400, title: 'Failure', message: 'The category can\'t be deleted.' }))
				.then(categories => 
				{
					console.log(`> Category "${req.body.category}" deleted`);
					res.status(200).json({ status: 200, title: 'Category deleted', message: categories });
				});
			});
		}	
	});
};

