const Token = require('../models/token');
const User = require('../models/user');
const {
    success_email_verified, failure_expired_link, success_valid_link 
} = require('../lang');

const execute_token = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Token.findOne({ _id: req.params.id })
    .then(token => 
    {
        if (token)
        {
            // Check for valid actions
            if (token.action === 'email')
            {
                // Update user: verified_user becomes true
                User.updateOne({ _id: token.account }, { verified_user: true })
                .then(() => res.status(200).json({ is_success: true, message: success_email_verified(lang) }))
                .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }))
                return;
            }
            else if (token.action === 'pass')
            {
                User.findOne({ _id: token.account })
                .then(user => 
                {
                    if (user)
                        res.status(200).json({ is_success: true, message: success_valid_link(lang), email_address: user.email_address });
                    else
                        res.status(404).json({ is_success: false, message: failure_expired_link(lang) });
                })
                .catch(err => res.status(400).json({ is_success: false, message: failure_expired_link(lang), error: err }));
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

