const express = require('express');
const controller_connection = require('../controllers/connection');

const router = express.Router();

router.get('/admin/connected', controller_connection.check_admin_connected);
router.post('/admin/login', controller_connection.connect_admin);
router.get('/admin/logout', controller_connection.disconnect_admin); 

module.exports = router;

