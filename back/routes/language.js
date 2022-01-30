const express = require('express');
const controller_language = require('../controllers/language');

const router = express.Router();

router.get('/:lang/all', controller_language.retrieve_all_languages);
router.get('/:lang/:index', controller_language.retrieve_language_by_index);

module.exports = router;

