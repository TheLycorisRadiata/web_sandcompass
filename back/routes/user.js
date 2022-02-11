const express = require('express');
const controller_user = require('../controllers/user');

const router = express.Router();

router.get('/:lang/admin/login/:email_address/:password/:stay_logged_in', controller_user.connect_as_admin);
router.get('/:lang/login/:email_address/:password/:stay_logged_in', controller_user.connect_as_user);
router.post('/:lang/password', controller_user.create_password);
router.get('/:lang/check/email/:id/:email_address', controller_user.is_email_already_used_by_another_account);
router.get('/:lang/check/username/:id/:username', controller_user.is_username_already_used_by_another_account);
router.post('/:lang/create', controller_user.create_account);
router.put('/:lang/update', controller_user.update_account);
router.delete('/:lang/delete', controller_user.delete_account);
router.get('/:lang/stats/all', controller_user.get_stats_on_all_users);
router.get('/:lang/username/:id', controller_user.get_username_from_id);

module.exports = router;

