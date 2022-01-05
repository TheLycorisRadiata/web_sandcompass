const express = require('express');
const controller_faq = require('../controllers/faq');

const router = express.Router();

router.get('/all', controller_faq.retrieve_all_questions);
router.post('/add', controller_faq.add_question);
router.put('/edit', controller_faq.edit_question);
router.delete('/remove', controller_faq.remove_question);

module.exports = router;

