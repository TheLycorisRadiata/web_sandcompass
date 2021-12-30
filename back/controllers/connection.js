const User = require('../models/user');

const check_admin_connected = (req, res) => 
{
    User.findOne({ is_admin: true })
    .then(admin => 
    {
        if (admin)
            res.status(200).json({ is_success: true, message: 'Admin\'s connection status loaded.', data: admin.is_connected });
        else
            res.status(404).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved.' });
    })
    .catch(err => res.status(500).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved.', error: err }));
};

const connect_admin = (req, res) => 
{
    User.findOne({ is_admin: true })
    .then(admin => 
    {
        if (!admin)
        {
            res.status(404).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved.' });
            return;
        }

        if (req.body.field_login_username.toLowerCase() === admin.name && req.body.field_login_password === admin.password)
        {
            User.updateOne({ _id: admin._id },
            {
                is_connected: true
            })
            .then(() => res.status(200).json({ is_success: true, message: 'Admin connected.' }))
            .catch(err => res.status(500).json({ is_success: false, message: 'Error: The admin is unable to log in.', error: err }));
        }
        else
        {
            res.status(401).json({ is_success: false, message: 'Your username and/or password are incorrect.'});
        }
    })
    .catch(err => res.status(500).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved.', error: err }));
};

const disconnect_admin = (req, res) => 
{
    User.findOne({ is_admin: true })
    .then(admin => 
    {
        if (!admin)
        {
            res.status(404).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved. The server will restart.', error: err });
            process.exit(1);
        }
        else
        {
            User.updateOne({ _id: admin._id },
            {
                is_connected: false
            })
            .then(() => res.status(200).json({ is_success: true, message: 'Admin logged out.' }))
            .catch(err => 
            {
                res.status(500).json({ is_success: false, message: 'Error: The admin is unable to log out. The server will restart.', error: err });
                process.exit(1);
            });
        }
    })
    .catch(err => 
    {
        res.status(500).json({ is_success: false, message: 'Error: The admin couldn\'t be retrieved. The server will restart.', error: err });
        process.exit(1);
    });

    /*
        I restarted the server because of a suspicion of hacking.
        It's not normal that the admin could log in, and now can't log out or the account can't even be found.
        It may be a mere technical issue, or it may be because a third party did something.
        I don't know if this is the right reaction to have in such a situation, but at least I react.

        EDIT: At the moment, the server doesn't restart automatically after a crash. I tried "Forever", and it's too deprecated, won't even run.
    */
};

module.exports = 
{
    check_admin_connected,
    connect_admin,
    disconnect_admin
};

