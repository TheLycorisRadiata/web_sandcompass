const express = require('express');
const controller_currency = require('../controllers/currency');

const router = express.Router();

router.get('/all', controller_currency.retrieve_all_currencies);

module.exports = router;

