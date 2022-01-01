const bcrypt = require('bcrypt');
const User = require('../models/user');

const connect_as_admin = (req, res) => 
{
    const email_address = req.body.email_address.toLowerCase();
    const password = req.body.password;

    User.findOne({ is_admin: true })
    .then(admin => 
    {
        if (!admin)
            res.status(500).json({ is_success: false, account_data: null, message: 'Error: The admin cannot be found.' });
        else if (!admin.verified_user)
            res.status(500).json({ is_success: false, account_data: null, message: 'Error: The email address is not verified.' });
        else if (!admin.hashed_password)
            res.status(500).json({ is_success: false, account_data: null, message: 'Error: The account has no password.' });
        else if (email_address === admin.email_address && bcrypt.compareSync(password, admin.hashed_password))
            res.status(200).json({ is_success: true, account_data: admin, message: '' });
        // The email and/or the password don't match
        else
            res.status(403).json({ is_success: false, account_data: null, message: 'Your email address or your password is incorrect.' });
    })
    .catch(err => res.status(400).json({ is_success: false, account_data: null, message: 'Error: An error occured. See the log.', error: err }));
};

const connect_as_user = (req, res) => 
{
    const email_address = req.body.email_address.toLowerCase();
    const password = req.body.password;

    User.findOne({ email_address: email_address, is_admin: false })
    .then(user => 
    {
        if (!user)
            res.status(404).json({ is_success: false, account_data: null, message: 'Your email address or your password is incorrect.' });
        else if (!user.verified_user)
            res.status(401).json({ is_success: false, account_data: null, message: 'The email address is not verified.', send_verif_email: true });
        else if (!user.hashed_password)
            res.status(401).json({ is_success: false, account_data: null, message: 'This account doesn\'t have a password yet. You\'re invited to click on "Password forgotten?".' });
        else if (bcrypt.compareSync(password, user.hashed_password))
            res.status(200).json({ is_success: true, account_data: user, message: '' });
        // The password is incorrect
        else
            res.status(404).json({ is_success: false, account_data: null, message: 'Your email address or your password is incorrect.' });
    })
    .catch(err => res.status(400).json({ is_success: false, account_data: null, message: 'Error: An error occured. See the log.', error: err }));
};

const create_password = (req, res) => 
{
    const find_obj = req.body._id ? { _id: req.body._id } : { email_address: req.body.email_address.toLowerCase() };

    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);
    const password = req.body.password;
    let hashed_password = null;
    let is_first_password = false;

    // Check whether an account exists with this email address
    User.findOne(find_obj)
    .then(user => 
    {
        if (!user)
            res.status(404).json({ is_success: false, message: 'No account exists with this email address.' });
        else if (!user.verified_user)
            res.status(401).json({ is_success: false, message: 'The email address has to be verified first.', send_verif_email: true });
        else
        {
            // If the password is undefined/null or an empty string
            if (!password || password === '')
                res.status(400).json({ is_success: false, message: 'The password must not be empty.' });
            else
            {
                is_first_password = user.hashed_password === null;
                hashed_password = bcrypt.hashSync(password, salt);
                
                // The hash didn't work
                if (!hashed_password)
                    res.status(400).json({ is_success: false, message: is_first_password ? 
                        'Error: The password creation didn\'t work.' : 
                        'Error: The password modification didn\'t work.' });

                // Store hashed_password in the DB
                User.updateOne({ _id: user._id },
                {
                    hashed_password: hashed_password
                })
                .then(() => res.status(200).json({ is_success: true, message: is_first_password ? 'The password has been created.' : 'The password has been updated.' }))
                .catch(err => res.status(400).json({ is_success: false, message: is_first_password ? 
                    'Error: The password creation didn\'t work.' : 
                    'Error: The password modification didn\'t work.', error: err }));
            }
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error occured. See the log.', error: err }));
};

const is_email_already_used_by_another_account = (req, res) =>
{
    User.findOne({ email_address: req.body.email_address.toLowerCase() })
    .then(user => 
    {
        if (user && user._id.toString() !== req.body._id)
            res.status(400).json({ is_success: false, message: 'This email address is already used by another account.' });
        // Either no account has this email address, or the account is ours, so all is good
        else
            res.status(200).json({ is_success: true, message: 'This email address can be used.' });
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error occured. See the log.', error: err }));
};

const is_username_already_used_by_another_account = (req, res) =>
{
    // The username's search is case insensitive
    User.findOne({ username: { $regex: '^' + req.body.username + '$', $options: 'i' }})
    .then(user => 
    {
        if (user && user._id.toString() !== req.body._id)
            res.status(400).json({ is_success: false, message: 'This username is already used by another account.' });
        // Either no account has this username, or the account is ours, so all is good
        else
            res.status(200).json({ is_success: true, message: 'This username can be used.' });
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error has occured. See the log.', error: err }));
};

const create_account = (req, res) => 
{
    const newsletter = req.body.newsletter !== undefined ? req.body.newsletter : false;

    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);
    const password = req.body.password !== undefined ? req.body.password : null;
    let hashed_password = null;

    // Check for whether an account with this email address already exist
    User.findOne({ email_address: req.body.email_address.toLowerCase() })
    .then(user => 
    {
        if (user)
        {
            // If the user already exists, check whether this is not just a newsletter subscription attempt
            if (newsletter)
            {
                // Also, if this is the admin account, it can't subscribe to the newsletter
                if (user.newsletter || user.is_admin)
                {
                    res.status(400).json({ is_success: false, message: 'This email address is already subscribed to the newsletter.' });
                }
                else
                {
	                User.updateOne({ _id: user._id }, { newsletter: true })
                    .then(() => res.status(200).json({ is_success: true, message: 'This email address is now subscribed to the newsletter.', 
                        send_newsletter_email: true, user_id: user._id }))
                    .catch(err => res.status(400).json({ is_success: false, message: 'Error: This email address couldn\'t get subscribed to the newsletter.', error: err }));
                }
            }
            else
            {
                res.status(400).json({ is_success: false, message: 'An account with this email address already exists.' });
            }
        }
        else
        {
            if (password)
            {
                hashed_password = bcrypt.hashSync(password, salt);

                // The hash didn't work
                if (!hashed_password)
                {
                    res.status(400).json({ is_success: false, message: 'Error: The account couldn\'t be created.' });
                    return;
                }
            }

            new User(
            {
                rank: req.body.rank !== undefined ? req.body.rank : 0,
                email_address: req.body.email_address.toLowerCase(),
                hashed_password: hashed_password,
                username: req.body.username,
                newsletter: newsletter
            })
            .save()
            .then(() => res.status(201).json({ is_success: true, message: 'The account has been created.' }))
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The account couldn\'t be created.', error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The account couldn\'t be created.', error: err }));
};

const update_account = (req, res) => 
{
    // Make sure the email address is in lower case
    const updated_account = req.body.updated_account;
    updated_account.email_address = updated_account.email_address.toLowerCase();

    User.updateOne({ _id: req.body._id }, updated_account)
    .then(() => 
    {
        User.findOne({ _id: req.body._id })
        .then(account => res.status(200).json({ is_success: true, data: account, message: 'The account has been updated.' }))
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The account update failed.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The account update failed.', error: err }));
};

const delete_account = (req, res) => 
{
    User.deleteOne({ _id: req.body.id_user_to_delete })
    .then(() => res.status(200).json({ is_success: true, message: 'The account has been deleted.' }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error occured. See the log.', error: err }));
};

module.exports = 
{
    connect_as_admin,
    connect_as_user,
    create_password,
    is_email_already_used_by_another_account,
    is_username_already_used_by_another_account,
    create_account,
    update_account,
    delete_account
};

