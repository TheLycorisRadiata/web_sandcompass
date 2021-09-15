const express = require('express');
const controller_blog = require('../controllers/blog');

const router = express.Router();

router.get('/articles', controller_blog.retrieve_articles);
router.post('/articles', controller_blog.post_new_article);
router.put('/articles', controller_blog.modify_article);
router.delete('/articles', controller_blog.delete_article);

router.get('/categories', controller_blog.retrieve_categories);
router.post('/categories', controller_blog.create_new_category);
router.delete('/categories', controller_blog.delete_category);

module.exports = router;

