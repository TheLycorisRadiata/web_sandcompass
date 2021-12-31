const express = require('express');
const controller_user = require('../controllers/user');

const router = express.Router();

router.post('/admin/login', controller_user.connect_as_admin);

module.exports = router;

