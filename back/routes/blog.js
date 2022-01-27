const express = require('express');
const controller_blog = require('../controllers/blog');

const router = express.Router();

router.get('/articles', controller_blog.retrieve_articles);
router.get('/articles/:id_author', controller_blog.retrieve_articles_by_author);
router.post('/articles', controller_blog.post_new_article);
router.put('/articles', controller_blog.modify_article);
router.delete('/articles', controller_blog.delete_article);

router.get('/categories', controller_blog.retrieve_categories);
router.post('/categories', controller_blog.create_new_category);
router.put('/categories', controller_blog.modify_category);
router.delete('/categories', controller_blog.delete_category);

router.put('/vote/article', controller_blog.like_or_dislike_article);

module.exports = router;

