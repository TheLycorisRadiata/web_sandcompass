const express = require('express');
const controller_blog = require('../controllers/blog');

const router = express.Router();

router.get('/:lang/articles', controller_blog.retrieve_articles);
router.get('/:lang/articles/:id_author', controller_blog.retrieve_articles_by_author);
router.get('/:lang/articles/:category/:sort/:page', controller_blog.retrieve_articles_by_category_sort_and_page);
router.get('/:lang/article/last', controller_blog.retrieve_last_article);
router.get('/:lang/article/:id_or_code/:value', controller_blog.retrieve_article_by_id_or_code);

router.post('/:lang/articles', controller_blog.post_new_article);
router.put('/:lang/articles', controller_blog.modify_article);
router.delete('/:lang/articles', controller_blog.delete_article);

router.get('/:lang/categories', controller_blog.retrieve_categories);
router.get('/:lang/category/name/:id', controller_blog.get_category_name_from_id);
router.post('/:lang/categories', controller_blog.create_new_category);
router.put('/:lang/categories', controller_blog.modify_category);
router.delete('/:lang/categories', controller_blog.delete_category);

router.put('/:lang/vote/article', controller_blog.like_or_dislike_article);

module.exports = router;

