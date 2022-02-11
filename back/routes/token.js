const express = require('express');
const controller_token = require('../controllers/token');

const router = express.Router();

router.get('/:lang/:id/:account', controller_token.execute_token);
router.delete('/:lang/login/:id', controller_token.delete_login_tokens);

module.exports = router;

