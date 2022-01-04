const express = require('express');
const controller_mailing = require('../controllers/mailing');

const router = express.Router();

router.post('/contact', controller_mailing.send_visitor_mail_to_admin);
router.post('/register', controller_mailing.send_mail_at_account_registration);
router.post('/newsletter', controller_mailing.send_mail_at_newsletter_subscription);
router.post('/email', controller_mailing.send_mail_at_email_update);
router.post('/password', controller_mailing.send_mail_for_new_password);
router.get('/newsletter/all', controller_mailing.retrieve_all_newsletters);
router.post('/newsletter/send', controller_mailing.send_newsletter);


module.exports = router;

