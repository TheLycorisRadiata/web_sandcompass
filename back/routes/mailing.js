const express = require('express');
const controller_mailing = require('../controllers/mailing');

const router = express.Router();

router.post('/contact', controller_mailing.send_visitor_mail_to_admin);

module.exports = router;

