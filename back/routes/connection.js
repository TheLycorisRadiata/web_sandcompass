const express = require('express');
const controller_connection = require('../controllers/connection');

const router = express.Router();

router.get('/connected/admin', controller_connection.check_admin_connected);
router.post('/login/admin', controller_connection.connect_admin);
router.get('/logout/admin', controller_connection.disconnect_admin); 

module.exports = router;

