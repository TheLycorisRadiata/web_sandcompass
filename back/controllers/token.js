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
    const account = req.params.account;

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
                    if (!user || !bcrypt.compareSync(user._id, account))
                        res.status(404).json({ is_success: false });
                    else
                        res.status(200).json({ is_success: true, account_data: user, is_admin: user.is_admin });
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

module.exports = 
{
    execute_token
};

