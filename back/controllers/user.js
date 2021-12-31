const User = require('../models/user');

const connect_as_admin = (req, res) => 
{
    User.findOne({ is_admin: true })
    .then(admin => 
    {
        if (!admin)
        {
            res.status(404).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved.' });
            return;
        }

        if (req.body.email_address.toLowerCase() === admin.email_address && req.body.password === admin.hashed_password)
            res.status(200).json({ is_success: true, message: 'Admin connected.', data: admin });
        else
            res.status(401).json({ is_success: false, message: 'Your email_address and/or your password are incorrect.'});
    })
    .catch(err => res.status(500).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved.', error: err }));
};

module.exports = 
{
    connect_as_admin
};

