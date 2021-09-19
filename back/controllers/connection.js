const User = require('../models/user');

const check_admin_connected = (req, res) => 
{
    User.findOne({ rank: 'admin' })
    .catch(() => res.status(500).json({ status: 500, title: 'Internal Error', message: 'The admin account couldn\'t be retrieved.' }))
    .then(admin => res.status(200).json({ message: admin.is_connected }));
};

const connect_admin = (req, res) => 
{
    User.findOne({ rank: 'admin' })
    .catch(() => res.status(500).json({ status: 500, title: 'Internal Error', message: 'The admin account couldn\'t be retrieved.' }))
    .then(admin => 
    {
        if (req.body.field_login_username.toLowerCase() === admin.name && req.body.field_login_password === admin.password)
        {
            User.updateOne({ _id: admin._id },
            {
                is_connected: true
            })
            .catch((err) => res.status(500).json({ status: 500, title: 'Internal Error', message: 'The admin account is unable to log in.' }))
            .then(() => 
            {
                console.log('> Admin logged in'.blue);
                res.status(200).json({ status: 200, title: 'Access Granted', message: 'Welcome home... You.' });
            });
        }
        else
        {
            res.status(401).json({ status: 401, title: 'Access Denied', message: 'Your username and/or password are incorrect.'});
        }
    });
};

const disconnect_admin = (req, res) => 
{
    User.findOne({ rank: 'admin' })
    .catch(() => 
    {
        res.status(500).json({ status: 500, title: 'Internal Error', message: 'The admin account couldn\'t be retrieved. The server will restart.' });
        process.exit(1);
    })
    .then(admin => 
    {
        User.updateOne({ _id: admin._id },
        {
            is_connected: false
        })
        .catch(() => 
        {
            res.status(500).json({ status: 500, title: 'Internal Error', message: 'The admin account is unable to log out. The server will restart.' });
            process.exit(1);
        })
        .then(() => 
        {
            console.log('> Admin logged out'.blue);
            res.status(200).json({ status: 200, title: 'Access Closed', message: 'See you later.' });
        });
    });

    /*
        NOTE: At the moment, the server doesn't restart automatically after a crash. I tried "Forever", and it's too deprecated, won't even run.

        I restarted the server because of a suspicion of hacking.
        It's not normal that the admin could log in, and now can't log out or the account can't even be found.
        It may be a mere technical issue, or it may be because a third party did something.
        I don't know if this is the right reaction to have in such a situation, but at least I react.
    */
};

module.exports = 
{
    check_admin_connected,
    connect_admin,
    disconnect_admin
};

