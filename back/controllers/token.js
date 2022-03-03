const bcrypt = require('bcrypt');
const Token = require('../models/token');
const User = require('../models/user');
const {
    success_email_verified, failure_expired_link, success_valid_link 
} = require('../functions/lang');

const execute_token = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;

    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (token)
        {
            // Check for valid actions
            if (token.action === 'email')
            {
                User.findOne({ _id: token.account })
                .then(user => 
                {
                    if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account))
                    {
                        // Update user: verified_user becomes true
                        User.updateOne({ _id: user._id }, { verified_user: true })
                        .then(() => 
                        {
                            // Get rid of token
                            Token.deleteOne({ _id: token._id })
                            .then(() => res.status(200).json({ is_success: true, message: success_email_verified(lang) }))
                            .catch(() => res.status(200).json({ is_success: true, message: success_email_verified(lang) }));
                        })
                        .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }))
                    }
                    else
                        res.status(400).json({ is_success: false, message: failure_expired_link(lang) });
                })
                .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }));
                return;
            }
            else if (token.action === 'pass')
            {
                User.findOne({ _id: token.account })
                .then(user => 
                {
                    if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account))
                        res.status(200).json({ is_success: true, message: success_valid_link(lang), email_address: user.email_address });
                    else
                        res.status(400).json({ is_success: false, message: failure_expired_link(lang) });

                    // Don't delete the token as the password creation process is still ongoing
                })
                .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }));
                return;
            }
            else if (token.action === 'login')
            {
                User.findOne({ _id: token.account, verified_user: true })
                .then(user => 
                {
                    if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account))
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
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;
    const id = req.params.id;

    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false });
        else
        {
            User.findOne({ _id: token.account })
            .then(user => 
            {
                if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account) && String(user._id) === String(id))
                {
                    Token.deleteMany({ action: 'login', account: user._id })
                    .then(() => res.status(200).json({ is_success: true }))
                    .catch(() => res.status(400).json({ is_success: false }));
                }
                else
                    res.status(400).json({ is_success: false });
            })
            .catch(() => res.status(400).json({ is_success: false }));
        }
    })
    .catch(() => res.status(400).json({ is_success: false }));
};

module.exports = 
{
    execute_token,
    delete_login_tokens
};

