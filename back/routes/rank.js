const express = require('express');
const controller_rank = require('../controllers/rank');

const router = express.Router();

router.get('/:lang/all', controller_rank.retrieve_all_ranks);
router.get('/:lang/:index', controller_rank.retrieve_rank_by_index);

module.exports = router;

