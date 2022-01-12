const Article = require('../models/article');
const Category = require('../models/category');
const User = require('../models/user');

const retrieve_articles = (req, res) => 
{
    Article.find()
    .then(articles => res.status(200).json({ is_success: true, message: articles.length + ' articles loaded.', data: articles }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The articles can\'t be retrieved.', error: err }));
};

const post_new_article = (req, res) => 
{
    const new_article = new Article({ ...req.body.new_article });
    const id_new_article = new_article._id;
    let arr_user_articles = null;

    new_article.save()
    .then(() => 
    {
        User.findOne({ _id: new_article.author })
        .then(author => 
        {
            if (!author)
            {
                res.status(404).json({ is_success: false, message: 'Error: The new article has been posted, but it couldn\'t be added to the author\'s list.' });
                return;
            }

            arr_user_articles = [...author.articles.written];
            arr_user_articles.push(id_new_article);

            User.updateOne({ _id: author._id }, 
            {
                articles: 
                {
                    written: arr_user_articles,
                    liked: [...author.articles.liked],
                    disliked: [...author.articles.disliked]
                }
            })
            .then(() => 
            {
                Article.find()
                .then(articles => res.status(201).json({ is_success: true, message: 'New article posted, and ' + articles.length + ' articles loaded.', data: articles }))
                .catch(err => res.status(400).json({ is_success: false, message: 'Error: The new article has been posted, but the articles couldn\'t be loaded.', error: err }));
            })
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The new article has been posted, but it couldn\'t be added to the author\'s list.', error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The new article has been posted, but it couldn\'t be added to the author\'s list.' }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article can\'t be posted.', error: err }));
};

const modify_article = (req, res) => 
{
    Article.updateOne({ _id: req.body.id },
    {
        time_modification: req.body.article.time_modification,
        is_modified: true,
        category: req.body.article.category,
        title: req.body.article.title,
        content: req.body.article.content
    })
    .then(() => 
    {
        Article.find()
        .then(articles => res.status(200).json({ is_success: true, message: 'Article modified, and ' + articles.length + ' articles loaded.', data: articles }))
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article has been modified, but the articles couldn\'t be loaded.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article can\'t be modified.', error: err }));
};

const delete_article = (req, res) => 
{
    Article.deleteOne({ _id: req.body.id })
    .then(() => 
    {
        Article.find()
        .then(articles => res.status(200).json({ is_success: true, message: 'Article deleted, and ' + articles.length + ' articles loaded.', data: articles }))
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article has been deleted, but the articles couldn\'t be loaded.', error: err }))
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article can\'t be deleted.', error: err }));
};

const retrieve_categories = (req, res) => 
{
    Category.find()
    .then(categories => res.status(200).json({ is_success: true, message: categories.length + ' categories loaded.', data: categories }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The categories can\'t be retrieved.', error: err }));
};

const create_new_category = (req, res) => 
{
    Category.findOne({ name: req.body.new_category })
    .then(category => 
    {
        if (!category)
        {
            new Category({ name: req.body.new_category })
            .save()
            .then(() => 
            {
                Category.find()
                .then(categories => res.status(201).json({ is_success: true, message: 'Category created, and ' + categories.length + ' categories loaded.', data: categories }))
                .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category has been created, but the categories couldn\'t be loaded.', error: err }));
            })
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category can\'t be created.', error: err }));
        }
        else
        {
            Category.find()
            .then(categories => res.status(201).json({ is_success: true, message: 'Category created, and ' + categories.length + ' categories loaded.', data: categories }))
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category has been created, but the categories couldn\'t be loaded.', error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category can\'t be created.', error: err }));
};

const delete_category = (req, res) => 
{
    Article.findOne({ category: req.body.category})
    .then(article => 
    {
        if (article)
            res.status(400).json({ is_success: false, message: 'Error: The category must be void of articles before it can be deleted.' });
        else
        {
            Category.deleteOne({ name: req.body.category })
            .then(() => 
            {
                Category.find()
                .then(categories => res.status(200).json({ is_success: true, message: 'Category deleted, and ' + categories.length + ' categories loaded.', data: categories }))
                .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category has been deleted, but the categories couldn\'t be loaded.' }));
            })
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category can\'t be deleted.', error: err }));
        }	
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category can\'t be deleted.', error: err }));
};

module.exports = 
{
    retrieve_articles,
    post_new_article,
    modify_article,
    delete_article,
    retrieve_categories,
    create_new_category,
    delete_category
};

