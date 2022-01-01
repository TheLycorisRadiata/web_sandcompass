const Token = require('../models/token');
const User = require('../models/user');

const execute_token = (req, res) => 
{
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
                .then(() => res.status(200).json({ is_success: true, message: 'The email address is verified.' }))
                .catch(err => res.status(400).json({ is_success: false, message: 'The link has expired.', error: err }))
                return;
            }
            else if (token.action === 'pass')
            {
                User.findOne({ _id: token.account })
                .then(user => 
                {
                    if (user)
                        res.status(200).json({ is_success: true, message: 'The link is valid.', email_address: user.email_address });
                    else
                        res.status(404).json({ is_success: false, message: 'The link has expired.' });
                })
                .catch(err => res.status(400).json({ is_success: false, message: 'The link has expired.', error: err }));
                return;
            }
        }

        // Token is expired or the action is invalid
        res.status(400).json({ is_success: false, message: 'The link has expired.' });
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'The link has expired.', error: err }));
};

module.exports = 
{
    execute_token
};

