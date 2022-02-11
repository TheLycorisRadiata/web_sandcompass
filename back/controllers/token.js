const bcrypt = require('bcrypt');
const Token = require('../models/token');
const User = require('../models/user');
const {
    success_email_verified, failure_expired_link, success_valid_link 
} = require('../lang');

const execute_token = (req, res) => 
{
    const lang = parseInt(req.params.lang);
    const id = req.params.id;
    const hashed_account_id = req.params.account;

    Token.findOne({ code: id })
    .then(token => 
    {
        if (token)
        {
            // Check for valid actions
            if (token.action === 'email')
            {
                // Update user: verified_user becomes true
                User.updateOne({ _id: token.account }, { verified_user: true })
                .then(() => 
                {
                    // Get rid of token
                    Token.deleteOne({ code: id })
                    .then(() => res.status(200).json({ is_success: true, message: success_email_verified(lang) }))
                    .catch(() => res.status(200).json({ is_success: true, message: success_email_verified(lang) }));
                })
                .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }))
                return;
            }
            else if (token.action === 'pass')
            {
                User.findOne({ _id: token.account })
                .then(user => 
                {
                    if (!user)
                        res.status(404).json({ is_success: false, message: failure_expired_link(lang) });
                    else
                    {
                        // Get rid of token
                        Token.deleteOne({ code: id })
                        .then(() => res.status(200).json({ is_success: true, message: success_valid_link(lang), email_address: user.email_address }))
                        .catch(() => res.status(200).json({ is_success: true, message: success_valid_link(lang), email_address: user.email_address }));
                    }
                })
                .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }));
                return;
            }
            else if (token.action === 'login')
            {
                User.findOne({ _id: token.account, verified_user: true })
                .then(user => 
                {
                    if (!user)
                        res.status(404).json({ is_success: false });
                    else if (bcrypt.compareSync(user._id.toString(), hashed_account_id))
                        res.status(200).json({ is_success: true, account_data: user });
                    else
                        res.status(400).json({ is_success: false });
                })
                .catch(() => res.status(400).json({ is_success: false }));
                return;
            }
        }

        // Token is expired or the action is invalid
        res.status(400).json({ is_success: false, message: failure_expired_link(lang) });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }));
};

const delete_login_tokens = (req, res) => 
{
    Token.deleteMany({ account: req.params.id, action: 'login' })
    .then(() => res.status(200).json({ is_success: true }))
    .catch(() => res.status(400).json({ is_success: false }));
};

module.exports = 
{
    execute_token,
    delete_login_tokens
};

