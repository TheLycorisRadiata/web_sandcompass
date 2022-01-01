const express = require('express');
const controller_user = require('../controllers/user');

const router = express.Router();

router.get('/login/admin', controller_user.connect_as_admin);
router.get('/login/user', controller_user.connect_as_user);
router.post('/password/create', controller_user.create_password);
router.get('/account/check/email', controller_user.is_email_already_used_by_another_account);
router.get('/account/check/username', controller_user.is_username_already_used_by_another_account);
router.post('/account/create', controller_user.create_account);
router.put('/account/update', controller_user.update_account);
router.delete('/account/delete', controller_user.delete_account);

module.exports = router;

