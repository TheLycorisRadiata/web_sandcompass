const express = require('express');
const controller_user = require('../controllers/user');

const router = express.Router();

router.get('/admin/login/:email_address/:password', controller_user.connect_as_admin);
router.get('/login/:email_address/:password', controller_user.connect_as_user);
router.post('/password', controller_user.create_password);
router.get('/check/email/:id/:email_address', controller_user.is_email_already_used_by_another_account);
router.get('/check/username/:id/:username', controller_user.is_username_already_used_by_another_account);
router.post('/create', controller_user.create_account);
router.put('/update', controller_user.update_account);
router.delete('/delete', controller_user.delete_account);
router.get('/stats/all', controller_user.get_stats_on_all_users);
router.get('/username/:id', controller_user.get_username_from_id);

module.exports = router;

