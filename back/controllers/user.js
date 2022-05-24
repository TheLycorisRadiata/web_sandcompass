const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Token = require('../models/token');
const { gmail_user } = require('../package.json');
const {
    failure_admin_not_found, failure_admin_email_not_verified, failure_admin_no_password, failure_wrong_email_or_password, 
    failure_email_has_to_be_verified, failure_no_password, failure, 
    failure_no_account_with_this_email, failure_empty_password, failure_password_creation, success_password_creation, 
    failure_email_already_in_use, success_email_available, 
    failure_username_already_in_use, success_username_available, 
    failure_account_creation, success_account_creation, 
    success_account_update, failure_account_update, 
    success_account_deletion, 
    failure_no_non_admin_user_found, success_stats, 
    success_user_retrieval, failure_user_retrieval 
} = require('../functions/lang');
const { parse_username } = require('../functions/parsing');
const { encode_file_in_base64 } = require('./file');

const connect_as_admin = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const email_address = req.params.email_address.toLowerCase();
    const password = req.params.password;
    const stay_logged_in = (req.params.stay_logged_in === 'true');

    // Stay logged in token
    const rng = uuidv4().replace('-', '');
    const salt_rounds = 12;
    const salt = bcrypt.genSaltSync(salt_rounds);
    let hashed_id = null;

    User.findOne({ is_admin: true })
    .then(admin => 
    {
        if (!admin)
            res.status(500).json({ is_success: false, account_data: null, message: failure_admin_not_found(lang) });
        else if (!admin.verified_user)
            res.status(500).json({ is_success: false, account_data: null, message: failure_admin_email_not_verified(lang) });
        else if (!admin.hashed_password)
            res.status(500).json({ is_success: false, account_data: null, message: failure_admin_no_password(lang) });
        else if (email_address === admin.email_address && bcrypt.compareSync(password, admin.hashed_password))
        {
            // Stay logged in for 30 days
            if (stay_logged_in)
            {
                hashed_id = bcrypt.hashSync(admin._id.toString(), salt);

                if (hashed_id)
                {
                    new Token(
                    {
                        code: rng,
                        account: admin._id,
                        action: 'login',
                        created: Date.now() + 2588400000 // 30 days minus 2 hours from now
                    })
                    .save()
                    .then(() => res.status(200).json({ is_success: true, account_data: admin, message: '', token_stay_logged_in_30_days: rng, id: hashed_id }))
                    .catch(() => res.status(200).json({ is_success: true, account_data: admin, message: '' }))
                    return;
                }
            }
            // Stay logged in for 2 hours
            else
            {
                hashed_id = bcrypt.hashSync(admin._id.toString(), salt);

                if (hashed_id)
                {
                    new Token(
                    {
                        code: rng,
                        account: admin._id,
                        action: 'login'
                    })
                    .save()
                    .then(() => res.status(200).json({ is_success: true, account_data: admin, message: '', token_stay_logged_in_2h: rng, id: hashed_id }))
                    .catch(() => res.status(200).json({ is_success: true, account_data: admin, message: '' }))
                    return;
                }
            }

            // No token if the account ID encryption failed
            res.status(200).json({ is_success: true, account_data: admin, message: '' });
        }
        // The email and/or the password don't match
        else
            res.status(403).json({ is_success: false, account_data: null, message: failure_wrong_email_or_password(lang) });
    })
    .catch(err => res.status(400).json({ is_success: false, account_data: null, message: failure(lang), error: err }));
};

const connect_as_user = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const email_address = req.params.email_address.toLowerCase();
    const password = req.params.password;
    const stay_logged_in = req.params.stay_logged_in;

    // Stay logged in token
    const rng = uuidv4().replace('-', '');
    const salt_rounds = 12;
    const salt = bcrypt.genSaltSync(salt_rounds);
    let hashed_id = null;

    User.findOne({ email_address: email_address, is_admin: false })
    .then(user => 
    {
        if (!user)
            res.status(404).json({ is_success: false, account_data: null, message: failure_wrong_email_or_password(lang) });
        else if (!user.verified_user)
            res.status(401).json({ is_success: false, account_data: null, message: failure_email_has_to_be_verified(lang), send_verif_email: true });
        else if (!user.hashed_password)
            res.status(401).json({ is_success: false, account_data: null, message: failure_no_password(lang) });
        else if (bcrypt.compareSync(password, user.hashed_password))
        {
            // Stay logged in for 30 days
            if (stay_logged_in)
            {
                hashed_id = bcrypt.hashSync(user._id.toString(), salt);

                if (hashed_id)
                {
                    new Token(
                    {
                        code: rng,
                        account: user._id,
                        action: 'login',
                        created: Date.now() + 2588400000 // 30 days minus 2 hours from now
                    })
                    .save()
                    .then(() => res.status(200).json({ is_success: true, account_data: user, message: '', token_stay_logged_in_30_days: rng, id: hashed_id }))
                    .catch(() => res.status(200).json({ is_success: true, account_data: user, message: '' }))
                    return;
                }
            }
            // Stay logged in for 2 hours
            else
            {
                hashed_id = bcrypt.hashSync(user._id.toString(), salt);

                if (hashed_id)
                {
                    new Token(
                    {
                        code: rng,
                        account: user._id,
                        action: 'login'
                    })
                    .save()
                    .then(() => res.status(200).json({ is_success: true, account_data: user, message: '', token_stay_logged_in_2h: rng, id: hashed_id }))
                    .catch(() => res.status(200).json({ is_success: true, account_data: user, message: '' }))
                    return;
                }
            }

            // No token if the account ID encryption failed
            res.status(200).json({ is_success: true, account_data: user, message: '' });
        }
        // The password is incorrect
        else
            res.status(404).json({ is_success: false, account_data: null, message: failure_wrong_email_or_password(lang) });
    })
    .catch(err => res.status(400).json({ is_success: false, account_data: null, message: failure(lang), error: err }));
};

const create_password = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const salt_rounds = 12;
    const salt = bcrypt.genSaltSync(salt_rounds);

    const email_address = req.body.email_address.toLowerCase();
    const password = req.body.password;
    let hashed_password = null;

    // Check whether an account exists with this email address
    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
            res.status(404).json({ is_success: false, message: failure_no_account_with_this_email(lang) });
        else if (!user.verified_user)
            res.status(401).json({ is_success: false, message: failure_email_has_to_be_verified(lang), send_verif_email: true });
        else if (!password || typeof password !== 'string') // The password must be a non-empty string
            res.status(400).json({ is_success: false, message: failure_empty_password(lang) });
        else
        {
            // Protect the access with the user token
            Token.findOne({ code: id_token })
            .then(token => 
            {
                // "login" if from the account editor and "pass" if from forgotten password page
                if (!token || (token.action !== 'login' && token.action !== 'pass'))
                    res.status(400).json({ is_success: false, message: failure_password_creation(lang) });
                else
                {
                    User.findOne({ _id: token.account })
                    .then(user => 
                    {
                        if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account))
                        {
                            // Access granted
                            hashed_password = bcrypt.hashSync(password, salt);
                
                            // The hash didn't work
                            if (!hashed_password)
                            {
                                res.status(400).json({ is_success: false, message: failure_password_creation(lang) });
                                return;
                            }

                            // Store hashed_password in the DB
                            User.updateOne({ _id: user._id }, { hashed_password: hashed_password })
                            .then(() => 
                            {
                                // The 'pass' token is no longer needed (deleteMany because the user may have had several attempts)
                                Token.deleteMany({ action: 'pass', account: user._id })
                                .then(() => res.status(200).json({ is_success: true, message: success_password_creation(lang) }))
                                .catch(() => res.status(200).json({ is_success: true, message: success_password_creation(lang) }));
                            })
                            .catch(err => res.status(400).json({ is_success: false, message: failure_password_creation(lang), error: err }));
                        }
                         else
                            res.status(400).json({ is_success: false, message: failure_password_creation(lang) });
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_password_creation(lang), error: err }));
                }
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_password_creation(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const is_email_already_used_by_another_account = (req, res) =>
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;

    const id = req.params.id;
    const email_address = req.params.email_address.toLowerCase();

    // Protect the access with the user token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account })
            .then(user => 
            {
                if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account) && String(user._id) === String(id))
                {
                    // Access granted
                    User.findOne({ email_address: email_address })
                    .then(email_user => 
                    {
                        if (email_user && String(email_user._id) !== String(id) || email_address === gmail_user.toLowerCase())
                            res.status(400).json({ is_success: false, message: failure_email_already_in_use(lang) });
                        // Either no account has this email address, or the account is ours, so all is good
                        else
                            res.status(200).json({ is_success: true, message: success_email_available(lang) });
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const is_username_already_used_by_another_account = (req, res) =>
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;

    const id = req.params.id;

    // Protect the access with the user token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account })
            .then(user => 
            {
                if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account) && String(user._id) === String(id))
                {
                    // Access granted

                    // The username's search is case insensitive
                    User.findOne({ username: { $regex: '^' + req.params.username + '$', $options: 'i' }})
                    .then(username_user => 
                    {
                        if (username_user && String(username_user._id) !== String(id))
                            res.status(400).json({ is_success: false, message: failure_username_already_in_use(lang) });
                        // Either no account has this username, or the account is ours, so all is good
                        else
                            res.status(200).json({ is_success: true, message: success_username_available(lang) });
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const create_account = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const salt_rounds = 12;
    const salt = bcrypt.genSaltSync(salt_rounds);

    const email_address = req.body.email_address.toLowerCase();
    const username = parse_username(req.body.username);
    const newsletter = req.body.newsletter;
    const language = parseInt(req.body.language, 10);
    // "password" is optional, we make it null if it's undefined or something other than a non-empty string
    const password = !req.body.password || typeof req.body.password !== 'string' ? null : req.body.password;
    let hashed_password = null;
    let is_input_valid = true;

    // "username" is either valid or an empty string after being parsed by parse_username()
    // "email_address" and "username" must be non-empty strings
    // "newsletter" must be a boolean
    // "language" must be an integer between 0 and 2
    if (!email_address || typeof email_address !== 'string' || !username 
        || typeof newsletter !== 'boolean' 
        || !Number.isInteger(language) || language < 0 || language > 2)
    {
        // Input is invalid
        res.status(400).json({ is_success: false, message: failure_account_creation(lang) });
        return;
    }

    // Check for whether an account with this email address already exists
    User.findOne({ email_address: email_address })
    .then(email_user => 
    {
        if (email_user || email_address === gmail_user)
        {
            res.status(400).json({ is_success: false, message: failure_email_already_in_use(lang) });
            return;
        }

        // Check for whether an account with this username already exists (case insensitive)
        User.findOne({ username: { $regex: '^' + username + '$', $options: 'i' }})
        .then(username_user => 
        {
            if (username_user)
            {
                res.status(400).json({ is_success: false, message: failure_username_already_in_use(lang) });
                return;
            }

            if (password)
            {
                hashed_password = bcrypt.hashSync(password, salt);

                // The hash didn't work
                if (!hashed_password)
                {
                    res.status(400).json({ is_success: false, message: failure_account_creation(lang) });
                    return;
                }
            }

            new User(
            {
                email_address: email_address,
                hashed_password: hashed_password,
                username: username,
                newsletter: newsletter,
                language: language
            })
            .save()
            .then(() => res.status(201).json({ is_success: true, message: success_account_creation(lang) }))
            .catch(err => res.status(400).json({ is_success: false, message: failure_account_creation(lang), error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: failure_account_creation(lang), error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_account_creation(lang), error: err }));
};

const update_account = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const id = req.body._id;
    const updated_account = 
    {
        verified_user: req.body.updated_account.verified_user,
        email_address: req.body.updated_account.email_address.toLowerCase(),
        username: parse_username(req.body.updated_account.username),
        profile_picture: req.body.updated_account.profile_picture,
        newsletter: req.body.updated_account.newsletter,
        language: parseInt(req.body.updated_account.language, 10)
    };

    // worst case, "username" is an empty string after being parsed by parse_username()
    // "username" and "email_address" must be non-empty strings
    // "language" is an integer between 0 and 2
    // "newsletter" is a boolean
    if (!updated_account.username || !updated_account.email_address || typeof updated_account.email_address !== 'string' 
        || !Number.isInteger(updated_account.language) || updated_account.language < 0 || updated_account.language > 2 
        || typeof updated_account.newsletter !== 'boolean')
    {
        // Input is invalid
        res.status(400).json({ is_success: false, message: failure_account_update(lang) });
        return;
    }

    // Profile picture: Check the datatype (png, jpeg, jpg) and size (<= 1 Mb)
    if (updated_account.profile_picture)
    {
        const base64_img = updated_account.profile_picture;
        const whitelist = ['png', 'jpeg', 'jpg'];
        let invalid = false;

        if (typeof base64_img !== 'string')
            invalid = true;

        if (!invalid)
        {
            // Get the datatype from the "data" part of the string (e.g.: "data:image/png;base64,")
            const type = base64_img.substring(base64_img.indexOf('/') + 1, base64_img.indexOf(';'));
            if (!whitelist.includes(type.toLowerCase()))
                invalid = true;

            if (!invalid)
            {
                // Remove the "data" part to only keep the file itself
                const str = base64_img.substring(base64_img.indexOf(',') + 1);

                // "decoded_file.length / 1000" is the size in Kb, and 1 Mb is 1000 Kb
                const decoded_file = Buffer.from(str, 'base64').toString('binary');
                const size_in_mb = (decoded_file.length / 1000) / 1000;
                if (size_in_mb > 1)
                    invalid = true;
            }
        }

        if (invalid)
        {
            res.status(400).json({ is_success: false, message: failure_account_update(lang) });
            return;
        }
    }

    // Protect the access with the user token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_account_update(lang) });
        else
        {
            User.findOne({ _id: token.account })
            .then(user => 
            {
                if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account) && String(user._id) === String(id))
                {
                    // Access granted

                    // "username" must not be already used by another account (the username's search is case insensitive)
                    User.findOne({ username: { $regex: '^' + updated_account.username + '$', $options: 'i' }})
                    .then(username_user => 
                    {
                        if (username_user && String(username_user._id) !== String(id))
                            res.status(400).json({ is_success: false, message: failure_account_update(lang) });
                        // Either no account has this username, or the account is ours, so all is good
                        else
                        {
                            // "email_address" must not be already used by another account
                            User.findOne({ email_address: updated_account.email_address })
                            .then(async (email_user) => 
                            {
                                if (email_user && String(email_user._id) !== String(id) || updated_account.email_address === gmail_user.toLowerCase())
                                    res.status(400).json({ is_success: false, message: failure_account_update(lang) });
                                // Either no account has this email address, or the account is ours, so all is good
                                else
                                {
                                    // if email is updated, then "verified_user" is false, otherwise it's unchanged
                                    if (user.email_address !== updated_account.email_address)
                                        updated_account.verified_user = false;

                                    // Update account
                                    User.updateOne({ _id: id }, updated_account)
                                    .then(() => 
                                    {
                                        // Return the updated user to the front
                                        User.findOne({ _id: id })
                                        .then(account => res.status(200).json({ is_success: true, data: account, message: success_account_update(lang) }))
                                        .catch(err => res.status(400).json({ is_success: false, message: failure_account_update(lang), error: err }));
                                    })
                                    .catch(err => res.status(400).json({ is_success: false, message: failure_account_update(lang), error: err }));
                                }
                            })
                            .catch(err => res.status(400).json({ is_success: false, message: failure_account_update(lang), error: err }));
                        }
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_account_update(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_account_update(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_account_update(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_account_update(lang), error: err }));
};

const delete_account = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const id_user_to_delete = req.body.id_user_to_delete;

    // Protect the access with the user token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account })
            .then(user => 
            {
                if (user && bcrypt.compareSync(user._id.toString(), id_hashed_account) && String(user._id) === String(id_user_to_delete))
                {
                    // Access granted
                    User.deleteOne({ _id: id_user_to_delete })
                    .then(() => 
                    {
                        // Delete tokens related to this account
                        Token.deleteMany({ account: id_user_to_delete })
                        .then(() => res.status(200).json({ is_success: true, message: success_account_deletion(lang) }))
                        .catch(() => res.status(200).json({ is_success: true, message: success_account_deletion(lang) }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const get_stats_on_all_users = (req, res) =>
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;

    const stats =
    {
        accounts:
        {
            total: 0,
            verified_user: 0,
            newsletter: 0,
            language:
            {
                english: 0,
                french: 0,
                japanese: 0
            }
        }
    };

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    User.find({ is_admin: false })
                    .then(users =>
                    {
                        if (!users.length)
                            res.status(404).json({ is_success: false, message: failure_no_non_admin_user_found(lang) });
                        else
                        {
                            stats.accounts.total = users.length;
                            stats.accounts.verified_user = users.filter(e => e.verified_user).length;
                            stats.accounts.newsletter = users.filter(e => e.newsletter).length;
                            stats.accounts.language.english = users.filter(e => e.language === 0).length;
                            stats.accounts.language.french = users.filter(e => e.language === 1).length;
                            stats.accounts.language.japanese = users.filter(e => e.language === 2).length;

                            res.status(200).json({ is_success: true, message: success_stats(lang), data: stats });
                        }
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const get_username_from_id = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    User.findOne({ _id: req.params.id })
    .then(user => 
    {
        if (user)
            res.status(200).json({ is_success: true, message: success_user_retrieval(lang), data: user.username });
        else
            res.status(404).json({ is_success: false, message: failure_user_retrieval(lang), data: null });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
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
    delete_account,
    get_stats_on_all_users,
    get_username_from_id
};

