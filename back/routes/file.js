const express = require('express');
const controller_file = require('../controllers/file');

const router = express.Router();

router.get('/:lang/questionnaire/ebook_format_picker', controller_file.retrieve_ebook_format_picker);

module.exports = router;

