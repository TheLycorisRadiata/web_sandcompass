const express = require('express');
const controller_file = require('../controllers/file');

const router = express.Router();

router.get('/:lang/questionnaire/ebook_format_picker', controller_file.retrieve_ebook_format_picker);
router.get('/:lang/book/cosmic_dust/:format', controller_file.retrieve_cosmic_dust);
router.get('/:lang/game/persistence/:os', controller_file.retrieve_persistence);

module.exports = router;

