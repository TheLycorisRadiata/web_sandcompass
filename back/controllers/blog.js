const Article = require('../models/article');
const Category = require('../models/category');
const User = require('../models/user');
const {
    failure, failure_see_log 
} = require('../lang');

const retrieve_articles = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Article.find()
    .then(articles => res.status(200).json({ is_success: true, message: articles.length + ' articles loaded.', data: articles }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The articles can\'t be retrieved.', error: err }));
};

const retrieve_articles_by_author = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Article.find({ author: req.params.id_author })
    .then(articles => res.status(200).json({ is_success: true, message: articles.length + ' articles loaded.', data: articles }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The articles can\'t be retrieved.', error: err }));
};

const post_new_article = (req, res) => 
{
    const lang = parseInt(req.params.lang);
    const new_article = new Article({ ...req.body.new_article });
    const id_new_article = new_article._id;
    let arr_user_written_articles = null;

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

            arr_user_written_articles = [...author.articles.written];
            arr_user_written_articles.push(id_new_article);

            User.updateOne({ _id: author._id }, 
            {
                articles: 
                {
                    written: arr_user_written_articles,
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
    const lang = parseInt(req.params.lang);

    Article.updateOne({ _id: req.body._id },
    {
        time_modification: req.body.article.time_modification,
        is_modified: true,
        category: req.body.article.category,
        title: req.body.article.title,
        content: req.body.article.content,
        language: req.body.article.language
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
    const lang = parseInt(req.params.lang);
    const id_article_to_delete = req.body._id;
    const id_author = req.body.author;
    const obj_author_articles = req.body.author_list_articles;

    // Remove the article from the Articles collection
    Article.deleteOne({ _id: id_article_to_delete })
    .then(() => 
    {
        // Remove the article from the author's written articles
        obj_author_articles.written = obj_author_articles.written.filter(id => id !== id_article_to_delete);

        User.updateOne({ _id: id_author }, { articles: obj_author_articles })
        .then(() => 
        {
            Article.find()
            .then(articles => res.status(200).json({ is_success: true, message: 'Article deleted, and ' + articles.length + ' articles loaded.', data: articles }))
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article has been deleted, but the articles couldn\'t be loaded.', error: err }))
        })
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article has been deleted, but it couldn\'t be removed from the author\'s list.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The article can\'t be deleted.', error: err }));
};

const retrieve_categories = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Category.find()
    .then(categories => res.status(200).json({ is_success: true, message: categories.length + ' categories loaded.', data: categories }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The categories can\'t be retrieved.', error: err }));
};

const create_new_category = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    new Category({ name: req.body.new_category })
    .save()
    .then(() => 
    {
        Category.find()
        .then(categories => res.status(201).json({ is_success: true, message: 'Category created, and ' + categories.length + ' categories loaded.', data: categories }))
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category has been created, but the categories couldn\'t be loaded.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category can\'t be created.', error: err }));
};

const modify_category = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Category.findOne({ _id: req.body._id })
    .then(category => 
    {
        if (!category)
        {
            res.status(404).json({ is_success: false, message: 'Error: The category can\'t be modified.' });
            return;
        }

        Category.updateOne({ _id: req.body._id }, { name: req.body.updated_category })
        .then(() => 
        {
            Category.find()
            .then(categories => res.status(201).json({ is_success: true, message: 'Category modified, and ' + categories.length + ' categories loaded.', data: categories }))
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category has been modified, but the categories couldn\'t be loaded.', error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category can\'t be modified.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The category can\'t be modified.', error: err }));
};

const delete_category = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Article.findOne({ category: req.body._id })
    .then(article => 
    {
        if (article)
            res.status(400).json({ is_success: false, message: 'Error: The category must be void of articles before it can be deleted.' });
        else
        {
            Category.deleteOne({ _id: req.body._id })
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

const like_or_dislike_article = (req, res) => 
{
    const lang = parseInt(req.params.lang);
    const id_article = req.body.id_article;
    const id_user = req.body.id_user;
    const new_user_vote = req.body.user_vote;
    let old_user_vote = 0;
    let final_user_vote = 0;
    let user_articles = null;
    let article_users = null;

    Article.findOne({ _id: id_article })
    .then(article => 
    {
        if (!article)
            res.status(404).json({ is_success: false, message: 'Error: It seems like the article doesn\'t exist anymore.' });
        else
        {
            User.findOne({ _id: id_user })
            .then(user => 
            {
                if (!user)
                    res.status(404).json({ is_success: false, message: 'Error: Your account cannot be found.' });
                else
                {
                    if (user.articles.liked.includes(id_article))
                        old_user_vote = 1;
                    else if (user.articles.disliked.includes(id_article))
                        old_user_vote = -1;
                    else
                        old_user_vote = 0;

                    user_articles = user.articles;
                    article_users = article.users;

                    if (!old_user_vote)
                    {
                        // User clicks on "like" for the first time
                        if (new_user_vote === 1)
                        {
                            user_articles.liked.push(id_article);
                            article_users.likes.push(id_user);
                            final_user_vote = 1;
                        }
                        // User clicks on "dislike" for the first time
                        else
                        {
                            user_articles.disliked.push(id_article);
                            article_users.dislikes.push(id_user);
                            final_user_vote = -1;
                        }
                    }
                    else if (old_user_vote === new_user_vote)
                    {
                        // User clicks on "like" again
                        if (new_user_vote === 1)
                        {
                            user_articles.liked = user_articles.liked.filter(id => id !== id_article);
                            article_users.likes = article_users.likes.filter(id => id !== id_user);
                            final_user_vote = 0;
                        }
                        // User clicks on "dislike" again
                        else
                        {
                            user_articles.disliked = user_articles.disliked.filter(id => id !== id_article);
                            article_users.dislikes = article_users.dislikes.filter(id => id !== id_user);
                            final_user_vote = 0;
                        }
                    }
                    else
                    {
                        // User goes from "dislike" to "like"
                        if (new_user_vote === 1)
                        {
                            user_articles.disliked = user_articles.disliked.filter(id => id !== id_article);
                            article_users.dislikes = article_users.dislikes.filter(id => id !== id_user);
                            user_articles.liked.push(id_article);
                            article_users.likes.push(id_user);
                            final_user_vote = 1;
                        }
                        // User goes from "like" to "dislike"
                        else
                        {
                            user_articles.liked = user_articles.liked.filter(id => id !== id_article);
                            article_users.likes = article_users.likes.filter(id => id !== id_user);
                            user_articles.disliked.push(id_article);
                            article_users.dislikes.push(id_user);
                            final_user_vote = -1;
                        }
                    }

                    /*
                        Update the user first, because in case the second update fails it's better that it happens to the article.

                        Imagine the opposite scenario: the user likes, and the like is added to the article but not to the user because failure. 
                        Then, the user clicks on "like" again because it didn't seem to work, and so here in this controller we see that the user 
                        had a choice of 0 (no vote) and then asks for 1 (like), and in such a case, what happens? The user is added to the article's 
                        likes list a second time.

                        While, if the failure happens on the article and not the user, it's true that the user will think they liked while the like 
                        didn't reach the article, but in case they click on "like" again for whatever reason, it will go from 1 ("fake" like) to 1 (like),
                        which simply removes the user from the article's likes list, and since it wasn't inside to begin with, it does nothing, and the 
                        article is removed from the user's likes list as well, so they will see that there's no like and we're back safely to square one.

                        Sure, I could also browse the entire likes list of the article to see if the user isn't already there by any chance, and same with 
                        the dislikes list, but do you have any pity for our dear machines? I already browse both the liked and disliked lists of the user. 
                        And yeah, on the subject, I do so because I can't trust the front copy of the user object, as the user could have done some fuckery 
                        such as interacting with an article through two sessions at once or something: both sessions start with nothing (0), then a like from 
                        session A, and then a like again from session B, so "0 to 1" instead of "1 to 1" as it actually is, which doesn't remove the like but 
                        adds a second one. Exploit: 0 - Me: 1.

                        If I am to browse though arrays, it's more realistic to go for the user's, as for instance 1M users but only 10K articles is more 
                        likely than the contrary.
                    */

                    User.updateOne({ _id: user._id }, { articles: user_articles })
                    .then(() => 
                    {
                        Article.updateOne({ _id: article._id }, { users: article_users })
                        .then(() => 
                        {
                            User.findOne({ _id: user._id })
                            .then(updated_user => 
                            {
                                if (!updated_user)
                                    res.status(404).json({ is_success: false, message: failure(lang) });
                                else
                                {
                                    Article.findOne({ _id: article._id })
                                    .then(updated_article => 
                                    {
                                        if (!updated_article)
                                            res.status(404).json({ is_success: false, message: failure(lang) });
                                        else
                                            res.status(200).json({ is_success: true, message: 'Vote counted.', user_vote: final_user_vote, user: updated_user, article: updated_article });
                                    })
                                    .catch(err => res.status(400).json({ is_success: false, message: failure_see_log(lang), error: err }));
                                }
                            })
                            .catch(err => res.status(400).json({ is_success: false, message: failure_see_log(lang), error: err }));
                        })
                        .catch(err => res.status(400).json({ is_success: false, message: failure_see_log(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The vote couldn\'t be counted. You may try again.', error: err }));
                }
            })
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The vote couldn\'t be counted. You may try again.', error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The vote couldn\'t be counted. You may try again.', error: err }));
};

module.exports = 
{
    retrieve_articles,
    retrieve_articles_by_author,
    post_new_article,
    modify_article,
    delete_article,
    retrieve_categories,
    create_new_category,
    modify_category,
    delete_category,
    like_or_dislike_article
};

