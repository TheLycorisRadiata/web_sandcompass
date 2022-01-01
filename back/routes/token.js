const express = require('express');
const controller_token = require('../controllers/token');

const router = express.Router();

router.get('/:id', controller_token.execute_token);

module.exports = router;

