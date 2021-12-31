const express = require('express');
const controller_rank = require('../controllers/rank');

const router = express.Router();

router.get('/all', controller_rank.retrieve_all_ranks);

module.exports = router;

