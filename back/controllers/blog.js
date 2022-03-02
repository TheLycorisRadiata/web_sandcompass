const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Article = require('../models/article');
const Category = require('../models/category');
const User = require('../models/user');
const Token = require('../models/token');
const {
    success_articles_retrieval, failure_articles_retrieval, 
    failure_article_retrieval, success_article_retrieval, 
    failure_article_posted_but_not_in_authors_list, success_article_posted, failure_article_posted_but_no_retrieval, failure_article_posted, 
    success_article_modified, failure_article_modified_but_no_retrieval, failure_article_modified, 
    success_article_deleted, failure_article_deleted_but_no_retrieval, failure_article_deleted_but_still_in_authors_list, failure_article_deleted, 
    success_categories_retrieval, failure_categories_retrieval, 
    success_category_retrieval, failure_category_retrieval, 
    success_category_created, failure_category_created_but_no_retrieval, failure_category_created, 
    failure_category_modified, success_category_modified, failure_category_modified_but_no_retrieval, 
    failure_category_deletion_not_empty, success_category_deleted, failure_category_deleted_but_no_retrieval, failure_category_deleted, 
    failure_article_not_found, failure_account_not_found, failure, success_vote_counted, failure_vote_counted 
} = require('../functions/lang');
const { parse_category } = require('../functions/parsing');

const retrieve_articles = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    Article.find()
    .then(articles => res.status(200).json({ is_success: true, message: success_articles_retrieval(lang, articles.length), data: articles }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_articles_retrieval(lang), error: err }));
};

const retrieve_articles_by_author = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    Article.find({ author: req.params.id_author })
    .then(articles => res.status(200).json({ is_success: true, message: success_articles_retrieval(lang, articles.length), data: articles }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_articles_retrieval(lang), error: err }));
};

const retrieve_articles_by_category_sort_and_page = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const code_category = req.params.category; // 'all' or code
    const sort = req.params.sort; // 'old' or 'recent'
    const page = parseInt(req.params.page, 10);

    // 5 articles per page
    const max_index = page * 5 - 1;
    const min_index = max_index - 4;

    let arr_articles = null;
    let last_page_number = 1;
    let category_not_found = false;
    let i;

    // (Temporary) Fetch the admin to set txt_author
    User.findOne({ is_admin: true })
    .then(author => 
    {
        // Does the category even exist?
        Category.findOne(code_category === 'all' ? {} : { code: code_category })
        .then(category => 
        {
            if (!category)
                category_not_found = true;

            // Does the blog even have a single article?
            Article.find({})
            .then(articles => 
            {
                if (!articles.length)
                {
                    res.status(200).json({ is_success: true, message: success_articles_retrieval(lang, 0), data: [], 
                        is_blog_empty: true, category_not_found: category_not_found });
                    return;
                }

                // Retrieve all categories in order to set txt_categories for each article
                Category.find({})
                .then(categories => 
                {
                    if (!categories.length)
                    {
                        res.status(404).json({ is_success: false, message: failure_articles_retrieval(lang) });
                        return;
                    }

                    // Filter by category
                    arr_articles = code_category === 'all' || category_not_found ? articles : articles.filter(e => e.categories.includes(category._id));

                    // Compute the last page number
                    last_page_number = Math.ceil(arr_articles.length / 5);
                    if (!last_page_number)
                        last_page_number = 1;

                    // Articles are in chronological order, so reverse the array if sort is 'recent'
                    if (sort === 'recent')
                        arr_articles = arr_articles.slice(0).reverse();

                    // Filter by page
                    arr_articles = arr_articles.slice(min_index, max_index + 1);

                    for (i = 0; i < arr_articles.length; ++i)
                    {
                        // Transform every element into a proper object so properties can be added (txt_categories and txt_author)
                        arr_articles[i] = arr_articles[i].toObject();

                        // Add txt_categories
                        arr_articles[i].txt_categories = [];
                        arr_articles[i].categories.map(cat_id => arr_articles[i].txt_categories.push(categories.find(cat => String(cat._id) === String(cat_id)).name));

                        // Add txt_author
                        // TODO
                        arr_articles[i].txt_author = author?.username === '' ? null : author.username;
                    }

                    res.status(200).json({ is_success: true, message: success_articles_retrieval(lang, arr_articles.length), data: arr_articles, 
                        is_blog_empty: false, last_page_number: last_page_number, category_not_found: category_not_found });
                })
                .catch(err => res.status(400).json({ is_success: false, message: failure_articles_retrieval(lang), error: err }));
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_articles_retrieval(lang), error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: failure_articles_retrieval(lang), error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_articles_retrieval(lang), error: err }));
};

const retrieve_last_article = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    let obj_article = null;

    // Browse starting from the end
    Article.findOne({}, null, { sort: { _id: -1 }})
    .then(article => 
    {
        if (!article)
            res.status(404).json({ is_success: false, message: failure_article_retrieval(lang) });
        else
        {
            obj_article = article.toObject();

            // Fetch author's username
            User.findOne({ _id: article.author })
            .then(author => 
            {
                obj_article.txt_author = author ? author.username : null;

                Category.find({ })
                .then(categories => 
                {
                    obj_article.txt_categories = [];
                    if (categories.length)
                        obj_article.categories.map(cat_id => obj_article.txt_categories.push(categories.find(cat => String(cat._id) === String(cat_id)).name));
                    res.status(200).json({ is_success: true, message: success_article_retrieval(lang, article._id), data: obj_article });
                })
                .catch(() => 
                {
                    obj_article.txt_categories = [];
                    res.status(200).json({ is_success: true, message: success_article_retrieval(lang, article._id), data: obj_article });
                });
            })
            .catch(() => 
            {
                obj_article.txt_author = null;
                obj_category.txt_categories = [];
                res.status(200).json({ is_success: true, message: success_article_retrieval(lang, article._id), data: obj_article });
            });
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_article_retrieval(lang), error: err }));
};

const retrieve_article_by_id_or_code = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const find_by_id = req.params.id_or_code === 'id';
    const value = req.params.value;
    let obj_article = null;

    Article.findOne(find_by_id ? { _id: value } : { code: value })
    .then(article => 
    {
        if (!article)
            res.status(404).json({ is_success: false, message: failure_article_retrieval(lang) });
        else
        {
            obj_article = article.toObject();

            // Fetch author's username
            User.findOne({ _id: article.author })
            .then(author => 
            {
                obj_article.txt_author = author ? author.username : null;

                Category.find({ })
                .then(categories => 
                {
                    obj_article.txt_categories = [];
                    if (categories.length)
                        obj_article.categories.map(cat_id => obj_article.txt_categories.push(categories.find(cat => String(cat._id) === String(cat_id)).name));
                    res.status(200).json({ is_success: true, message: success_article_retrieval(lang, article._id), data: obj_article });
                })
                .catch(() => 
                {
                    obj_article.txt_categories = [];
                    res.status(200).json({ is_success: true, message: success_article_retrieval(lang, article._id), data: obj_article });
                });
            })
            .catch(() => 
            {
                obj_article.txt_author = null;
                obj_category.txt_categories = [];
                res.status(200).json({ is_success: true, message: success_article_retrieval(lang, article._id), data: obj_article });
            });
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_article_retrieval(lang), error: err }));
};

const post_new_article = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const rng = uuidv4().split('-');
    let new_article = 
    {
        code: rng[rng.length - 1], // last part of the rng array (12 character long string)
        categories: req.body.new_article.categories,
        title: req.body.new_article.title,
        author: req.body.new_article.author,
        content: req.body.new_article.content
    };
    let arr_user_written_articles = null;
    let is_input_valid = true;

    // "categories", "title", and "content" need to be arrays
    // "categories" must have at least one element
    // "title" and "content" must have 3 elements
    if (!Array.isArray(new_article.categories) || !Array.isArray(new_article.title) || !Array.isArray(new_article.content) 
        || !new_article.categories.length || new_article.title.length !== 3 || new_article.content.length !== 3)
        is_input_valid = false;

    // Elements of "title" must be non-empty strings
    if (is_input_valid)
    {
        for (const element of new_article.title)
        {
            if (!element || typeof element !== 'string')
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Elements of "content" must be non-empty strings
    if (is_input_valid)
    {
        for (const element of new_article.content)
        {
            if (!element || typeof element !== 'string')
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Elements of "categories" must be MongoDB IDs
    if (is_input_valid)
    {
        for (const element of new_article.categories)
        {
            const id = new ObjectId(element);

            // If element is an invalid ID, new ObjectId() would create a new ID
            // But if it's a valid ID, then it won't change
            if (String(id) !== String(element))
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // "author" must be a MongoDB ID
    if (is_input_valid)
    {
        const id = new ObjectId(new_article.author);
        if (String(id) !== String(new_article.author))
            is_input_valid = false;
    }

    // Input is invalid
    if (!is_input_valid)
    {
        res.status(400).json({ is_success: false, message: failure_article_posted(lang) });
        return;
    }

    // Create the MongoDB document now so we can get its ID without needing findOne()
    new_article = new Article({ ...new_article });

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_article_posted(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account) && String(admin._id) === String(new_article.author))
                {
                    // Access granted
                    new_article.save()
                    .then(() => 
                    {
                        arr_user_written_articles = [...admin.articles.written];
                        arr_user_written_articles.push(new_article._id);

                        User.updateOne({ _id: admin._id }, 
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
                            .then(articles => res.status(201).json({ is_success: true, message: success_article_posted(lang, articles.length), data: articles }))
                            .catch(err => res.status(400).json({ is_success: false, message: failure_article_posted_but_no_retrieval(lang), error: err }));
                        })
                        .catch(err => res.status(400).json({ is_success: false, message: failure_article_posted_but_not_in_authors_list(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_article_posted(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_article_posted(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_articled_posted(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_article_posted(lang), error: err }));
};

const modify_article = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const id_article = req.body._id;
    const updated_article = 
    {
        is_modified: true,
        time_modification: Date.now(),
        categories: req.body.article.categories,
        title: req.body.article.title,
        content: req.body.article.content
    };
    let is_input_valid = true;

    // "categories", "title", and "content" need to be arrays
    // "categories" must have at least one element
    // "title" and "content" must have 3 elements
    if (!Array.isArray(updated_article.categories) || !Array.isArray(updated_article.title) || !Array.isArray(updated_article.content) 
        || !updated_article.categories.length || updated_article.title.length !== 3 || updated_article.content.length !== 3)
        is_input_valid = false;

    // Elements of "title" must be non-empty strings
    if (is_input_valid)
    {
        for (const element of updated_article.title)
        {
            if (!element || typeof element !== 'string')
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Elements of "content" must be non-empty strings
    if (is_input_valid)
    {
        for (const element of updated_article.content)
        {
            if (!element || typeof element !== 'string')
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Elements of "categories" must be MongoDB IDs
    if (is_input_valid)
    {
        for (const element of updated_article.categories)
        {
            const id = new ObjectId(element);

            // If element is an invalid ID, new ObjectId() would create a new ID
            // But if it's a valid ID, then it won't change
            if (String(id) !== String(element))
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Input is invalid
    if (!is_input_valid)
    {
        res.status(400).json({ is_success: false, message: failure_article_modified(lang) });
        return;
    }

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_article_modified(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Article.updateOne({ _id: id_article }, updated_article)
                    .then(() => 
                    {
                        Article.find()
                        .then(articles => res.status(200).json({ is_success: true, message: success_article_modified(lang, articles.length), data: articles }))
                        .catch(err => res.status(400).json({ is_success: false, message: failure_article_modified_but_no_retrieval(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_article_modified(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_article_modified(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_article_modified(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_article_modified(lang), error: err }));
};

const delete_article = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const id_article_to_delete = req.body._id;
    const id_author = req.body.author;
    const obj_author_articles = req.body.author_list_articles;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_article_deleted(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account) && String(admin._id) === String(id_author))
                {
                    // Access granted

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
                            .then(articles => res.status(200).json({ is_success: true, message: success_article_deleted(lang, articles.length), data: articles }))
                            .catch(err => res.status(400).json({ is_success: false, message: failure_article_deleted_but_no_retrieval(lang), error: err }))
                        })
                        .catch(err => res.status(400).json({ is_success: false, message: failure_article_deleted_but_still_in_authors_list(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_article_deleted(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_article_deleted(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_article_deleted(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_article_deleted(lang), error: err }));
};

const retrieve_categories = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    Category.find()
    .then(categories => res.status(200).json({ is_success: true, message: success_categories_retrieval(lang, categories.length), data: categories }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_categories_retrieval(lang), error: err }));
};

const get_category_name_from_id = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    Category.findOne({ _id: req.params.id })
    .then(category => 
    {
        if (category)
            res.status(200).json({ is_success: true, message: success_category_retrieval(lang), data: category.name });
        else
            res.status(404).json({ is_success: false, message: failure_category_retrieval(lang), data: null });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const create_new_category = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const rng = uuidv4().substring(0, 4);
    let new_category = req.body.new_category;
    let is_input_valid = true;
    let i;

    // "new_category" needs to be an array of 3 elements
    if (!Array.isArray(new_category) || new_category.length !== 3)
        is_input_valid = false;

    // Elements of "new_category" must non-empty strings
    if (is_input_valid)
    {
        for (i = 0; i < new_category.length; ++i)
        {
            // Parse the category, worst case it becomes an empty string
            new_category[i] = parse_category(new_category[i]);

            // Check for whether the string is empty
            if (!new_category[i])
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Input is invalid
    if (!is_input_valid)
    {
        res.status(400).json({ is_success: false, message: failure_category_created(lang) });
        return;
    }

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_category_created(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    new Category({ code: rng, name: new_category })
                    .save()
                    .then(() => 
                    {
                        Category.find()
                        .then(categories => res.status(201).json({ is_success: true, message: success_category_created(lang, categories.length), data: categories }))
                        .catch(err => res.status(400).json({ is_success: false, message: failure_category_created_but_no_retrieval(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_category_created(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_category_created(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_category_created(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_category_created(lang), error: err }));
};

const modify_category = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const id_category = req.body._id;
    const updated_category = req.body.updated_category;
    let is_input_valid = true;
    let i;

    // "updated_category" needs to be an array of 3 elements
    if (!Array.isArray(updated_category) || updated_category.length !== 3)
        is_input_valid = false;

    // Elements of "updated_category" must non-empty strings
    if (is_input_valid)
    {
        for (i = 0; i < updated_category.length; ++i)
        {
            // Parse the category, worst case it becomes an empty string
            updated_category[i] = parse_category(updated_category[i]);

            // Check for whether the string is empty
            if (!updated_category[i])
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Input is invalid
    if (!is_input_valid)
    {
        res.status(400).json({ is_success: false, message: failure_category_modified(lang) });
        return;
    }

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_category_modified(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Category.findOne({ _id: id_category })
                    .then(category => 
                    {
                        if (!category)
                        {
                            res.status(404).json({ is_success: false, message: failure_category_modified(lang) });
                            return;
                        }

                        Category.updateOne({ _id: id_category }, { name: updated_category })
                        .then(() => 
                        {
                            Category.find()
                            .then(categories => res.status(201).json({ is_success: true, message: success_category_modified(lang, categories.length), data: categories }))
                            .catch(err => res.status(400).json({ is_success: false, message: failure_category_modified_but_no_retrieval(lang), error: err }));
                        })
                        .catch(err => res.status(400).json({ is_success: false, message: failure_category_modified(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_category_modified(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_category_modified(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_category_modified(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_category_modified(lang), error: err }));
};

const delete_category = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const id_category = req.body._id;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_category_deleted(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Article.findOne({ categories: { $in: [id_category] }})
                    .then(article => 
                    {
                        if (article)
                            res.status(400).json({ is_success: false, message: failure_category_deletion_not_empty(lang) });
                        else
                        {
                            Category.deleteOne({ _id: id_category })
                            .then(() => 
                            {
                                Category.find()
                                .then(categories => res.status(200).json({ is_success: true, message: success_category_deleted(lang, categories.length), data: categories }))
                                .catch(err => res.status(400).json({ is_success: false, message: failure_category_deleted_but_no_retrieval(lang) }));
                            })
                            .catch(err => res.status(400).json({ is_success: false, message: failure_category_deleted(lang), error: err }));
                        }
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_category_deleted(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_category_deleted(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_category_deleted(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_category_deleted(lang), error: err }));
};

const like_or_dislike_article = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
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
            res.status(404).json({ is_success: false, message: failure_article_not_found(lang) });
        else
        {
            User.findOne({ _id: id_user })
            .then(user => 
            {
                if (!user)
                    res.status(404).json({ is_success: false, message: failure_account_not_found(lang) });
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
                                            res.status(200).json({ is_success: true, message: success_vote_counted(lang), user_vote: final_user_vote, user: updated_user, article: updated_article });
                                    })
                                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                                }
                            })
                            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                        })
                        .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_vote_counted(lang), error: err }));
                }
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_vote_counted(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_vote_counted(lang), error: err }));
};

module.exports = 
{
    retrieve_articles,
    retrieve_articles_by_author,
    retrieve_articles_by_category_sort_and_page,
    retrieve_last_article,
    retrieve_article_by_id_or_code,
    post_new_article,
    modify_article,
    delete_article,
    retrieve_categories,
    get_category_name_from_id,
    create_new_category,
    modify_category,
    delete_category,
    like_or_dislike_article
};

