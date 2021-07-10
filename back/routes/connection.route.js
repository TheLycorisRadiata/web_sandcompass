const express = require('express');
const colors = require('colors');
const router = express.Router();
const controller_connection = require('../controllers/connection.controller');

router.get('/connected/admin', controller_connection.check_admin_connected);
router.post('/login/admin', controller_connection.connect_admin);
router.get('/logout/admin', controller_connection.disconnect_admin); 

module.exports = router;

