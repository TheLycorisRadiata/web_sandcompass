const express = require('express');
const controller_mailing = require('../controllers/mailing');

const router = express.Router();

router.post('/:lang/contact', controller_mailing.send_visitor_mail_to_admin);
router.post('/:lang/register', controller_mailing.send_mail_at_account_registration);
router.post('/:lang/newsletter', controller_mailing.send_mail_at_newsletter_subscription);
router.post('/:lang/email', controller_mailing.send_mail_at_email_update);
router.post('/:lang/password', controller_mailing.send_mail_for_new_password);
router.get('/:lang/newsletter/all/:id_token/:id_account', controller_mailing.retrieve_all_newsletters);
router.post('/:lang/newsletter/send', controller_mailing.send_newsletter);

module.exports = router;

