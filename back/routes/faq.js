const express = require('express');
const controller_faq = require('../controllers/faq');

const router = express.Router();

router.get('/:lang/all', controller_faq.retrieve_all_questions);
router.post('/:lang', controller_faq.add_question);
router.put('/:lang', controller_faq.edit_question);
router.delete('/:lang', controller_faq.remove_question);

module.exports = router;

