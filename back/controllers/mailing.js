const nodemailer = require('nodemailer');
const markdown = require( "markdown" ).markdown;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Token = require('../models/token');
const Newsletter = require('../models/newsletter');
const { homepage, gmail_user } = require('../package.json');
const key = require('../.nodemailer.json');
const {
    short_lang, long_lang, failure_try_again, success_message_sent, 
    welcome_to_sandcompass, welcome_to_sandcompass_user, click_email_verification_link, user_is_subscribed_to_newsletter, suggest_subscription_to_newsletter, help_by_speaking_about_sc, help_by_leaving_message, failure_no_account_matches_this_email, failure_account_already_verified, failure_account_validation_email, success_account_validation_email, 
    failure_account_not_subscribed_to_newsletter, title_newsletter_subscription_email, hello_user, failure_newsletter_subscription_email, success_newsletter_subscription_email, 
    title_email_address_update_email, click_new_email_verification_link, failure_email_address_update_email, success_email_address_update_email, 
    title_password_email, click_password_link, failure_email_has_to_be_verified, success_password_email, 
    nbr_loaded_newsletters, failure, 
    success_newsletter_saved_and_not_sent, failure_newsletter_saved_but_no_lang_subscriber, failure_newsletter_saved_but_not_sent, failure_newsletter_sent_but_none_found, success_newsletter_sent, failure_newsletter_sent_but_not_declared_as_sent 
} = require('../functions/lang');

const send_visitor_mail_to_admin = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    /* SUBJECT
        Not supposed to happen:
            'default' > No subject selected

        Projects:
            'subject_work_cosmic_dust' > Book: Cosmic Dust
            'subject_work_persistence' > Game: Persistence
            'subject_work_other' > Another project

        Miscellaneous:
            'subject_website' > This website
            'subject_legal' > Legal stuff
            'subject_other' > Other
    */

    // Body
    const is_pro = req.body.is_pro ? 'The professional ' : '';
    const business_name = req.body.business_name === '' ? '' : ' of the company ' + req.body.business_name;
    const name = req.body.name;
    const email_address = req.body.email_address.toLowerCase();
    const subject = !req.body.subject && typeof req.body.subject !== 'string' ? null 
        : req.body.subject === 'subject_work_cosmic_dust' ? 'Projects - Book: Cosmic Dust' 
        : req.body.subject === 'subject_work_persistence' ? 'Projects - Game: Persistence' 
        : req.body.subject === 'subject_work_other' ? 'Projects - Another project' 
        : req.body.subject === 'subject_website' ? 'Misc - This website' 
        : req.body.subject === 'subject_legal' ? 'Misc - Legal stuff' 
        : req.body.subject === 'subject_other' ? 'Misc - Other' 
        : null;
    const message = req.body.message;

    // Input is invalid
    if (!business_name || typeof business_name !== 'string' || !name || typeof name !== 'string' 
        || !email_address || typeof email_address !== 'string' || !subject || !message || typeof message !== 'string')
    {
        res.status(400).json({ is_success: false, message: failure_try_again(lang) });
        return;
    }

    // Instantiation of the SMTP server
    const smtp_trans = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:
        {
            type: 'OAuth2',
            user: gmail_user,
            serviceClient: key.client_id,
            privateKey: key.private_key
        }
    });

    // Email
    const mail_options = 
    {
        from: `"${name}" <${email_address}>`,
        to: `"Sand Compass" <${gmail_user}>`,
        subject: `[${short_lang(lang)}] Contact form | ${subject}`,
        html: '' +
        '<html>' +
            '<body>' +
                '<hr />' +
                `<p style="font-weight: bold;">${is_pro}${name} (${email_address})${business_name} says in ${long_lang(lang)}:</p>` +
                '<hr />' +

                `<div>${markdown.toHTML(message)}</div>` +
            '</body>' +
        '</html>'
    };

    // Prevent a visitor from using either the admin's or the mailing's email addresses
    User.findOne({ is_admin: true })
    .then(admin =>
    {
        if ((admin && email_address === admin.email_address.toLowerCase()) || email_address === gmail_user.toLowerCase())
            res.status(400).json({ is_success: false, message: failure_try_again(lang) });
        else
        {
            // Send the email
            smtp_trans.sendMail(mail_options, (error, response) => 
            {
                if (error)
                    res.status(400).json({ is_success: false, message: failure_try_again(lang), error: error });
                else
                    res.status(200).json({ is_success: true, message: success_message_sent(lang) });
            });
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_try_again(lang), error: err }));
};

const send_mail_at_account_registration = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);

    const email_address = req.body.email_address.toLowerCase();
    const rng = uuidv4().replace('-', '');

    let smtp_trans = null;
    let mail_options = null;

    let paragraph_newsletter = '';
    let id_hashed_account = null;
    let link_verify_email = '';

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
        {
            res.status(404).json({ is_success: false, message: failure_no_account_matches_this_email(lang) });
            return;
        }
        else if (user.verified_user)
        {
            res.status(400).json({ is_success: false, message: failure_account_already_verified(lang) });
            return;
        }

        // Hash the ID for the link
        id_hashed_account = bcrypt.hashSync(user._id, salt);
        // The hash didn't work
        if (!id_hashed_account)
        {
            res.status(400).json({ is_success: false, message: failure_account_validation_email(lang) });
            return;
        }

        // Create the token for email verification
        new Token(
        {
            code: rng,
            account: user._id,
            action: 'email'
        })
        .save()
        .then(() => 
        {
            // Retrieve this token and use its ID in the email verification link
            // Be careful: the user may have requested a token several times, so retrieve the most recent of them (so not findOne(), but find() + length - 1)
            Token.find({ account: user._id, action: 'email' })
            .then(tokens => 
            {
                link_verify_email = `${homepage}/token/${encodeURIComponent(tokens[tokens.length - 1].code)}/${encodeURIComponent(id_hashed_account)}`;

                smtp_trans = nodemailer.createTransport(
                {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth:
                    {
                        type: 'OAuth2',
                        user: gmail_user,
                        serviceClient: key.client_id,
                        privateKey: key.private_key
                    }
                });

                mail_options = 
                {
                    from: `"Sand Compass" <${gmail_user}>`,
                    to: `"${user.username}" <${email_address}>`,
                    subject: welcome_to_sandcompass(lang),
                    html: '' + 
                    '<html>' + 
                        '<body>' + 
                            '<hr />' + 
                            `<h1 style="text-align: center;">${welcome_to_sandcompass_user(lang, user.username)}</h1>` + 
                            '<hr />' + 

                            `<p>${click_email_verification_link(lang, link_verify_email)}</p>` + 

                            (user.newsletter ? `<p>${user_is_subscribed_to_newsletter(lang)}</p>` : `<p>${suggest_subscription_to_newsletter(lang)}</p>`) + 

                            `<p>${help_by_speaking_about_sc(lang)}</p>` + 
                            `<p>${help_by_leaving_message(lang)}</p>` + 
                        '</body>' + 
                    '</html>'
                };

                smtp_trans.sendMail(mail_options, (err, response) => 
                {
                    if (err)
                        res.status(400).json({ is_success: false, message: failure_account_validation_email(lang), error: err });
                    else
                        res.status(200).json({ is_success: true, message: success_account_validation_email(lang) });
                });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_account_validation_email(lang), error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: failure_account_validation_email(lang), error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_account_validation_email(lang), error: err }));
};

const send_mail_at_newsletter_subscription = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const email_address = req.body.email_address.toLowerCase();

    let smtp_trans = null;
    let mail_options = null;

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
        {
            res.status(404).json({ is_success: false, message: failure_no_account_matches_this_email(lang) });
            return;
        }
        else if (!user.newsletter)
        {
            res.status(400).json({ is_success: false, message: failure_account_not_subscribed_to_newsletter(lang) });
            return;
        }

        smtp_trans = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:
            {
                type: 'OAuth2',
                user: gmail_user,
                serviceClient: key.client_id,
                privateKey: key.private_key
            }
        });

        mail_options = 
        {
            from: `"Sand Compass" <${gmail_user}>`,
            to: `"${user.username}" <${email_address}>`,
            subject: title_newsletter_subscription_email(lang),
            html: '' + 
            '<html>' + 
                '<body>' + 
                    '<hr />' + 
                    `<h1 style="text-align: center;">${hello_user(lang, user.username)}</h1>` + 
                    '<hr />' + 

                    `<p>${user_is_subscribed_to_newsletter(lang)}</p>` + 
                    `<p>${help_by_speaking_about_sc(lang)}</p>` + 
                    `<p>${help_by_leaving_message(lang)}</p>` + 
                '</body>' + 
            '</html>'
        };

        smtp_trans.sendMail(mail_options, (err, response) => 
        {
            if (err)
                res.status(400).json({ is_success: false, message: failure_newsletter_subscription_email(lang), error: err });
            else
                res.status(200).json({ is_success: true, message: success_newsletter_subscription_email(lang) });
        });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_newsletter_subscription_email(lang), error: err }));
};

const send_mail_at_email_update = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);

    const email_address = req.body.email_address.toLowerCase();
    const rng = uuidv4().replace('-', '');
    
    let smtp_trans = null;
    let mail_options = null;

    let id_hashed_account = null;
    let link_verify_email = '';

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
        {
            res.status(404).json({ is_success: false, message: failure_no_account_matches_this_email(lang) });
            return;
        }
        else if (user.verified_user)
        {
            res.status(400).json({ is_success: false, message: failure_account_already_verified(lang) });
            return;
        }

        // Hash the ID for the link
        id_hashed_account = bcrypt.hashSync(user._id, salt);
        // The hash didn't work
        if (!id_hashed_account)
        {
            res.status(400).json({ is_success: false, message: failure_email_address_update_email(lang) });
            return;
        }

        // Create the token for email verification
        new Token(
        {
            code: rng,
            account: user._id,
            action: 'email',
        })
        .save()
        .then(() => 
        {
            // Retrieve this token and use its ID in the email verification link
            // Be careful: the user may have requested a token several times, so retrieve the most recent of them (so not findOne(), but find() + length - 1)
            Token.find({ account: user._id, action: 'email' })
            .then(tokens => 
            {
                link_verify_email = `${homepage}/token/${encodeURIComponent(tokens[tokens.length - 1].code)}/${encodeURIComponent(id_hashed_account)}`;

                smtp_trans = nodemailer.createTransport(
                {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth:
                    {
                        type: 'OAuth2',
                        user: gmail_user,
                        serviceClient: key.client_id,
                        privateKey: key.private_key
                    }
                });

                mail_options = 
                {
                    from: `"Sand Compass" <${gmail_user}>`,
                    to: `"${user.username}" <${email_address}>`,
                    subject: title_email_address_update_email(lang),
                    html: '' + 
                    '<html>' + 
                        '<body>' + 
                            '<hr />' + 
                            `<h1 style="text-align: center;">${hello_user(lang, req.body.username)}</h1>` + 
                            '<hr />' + 

                            `<p>${click_new_email_verification_link(lang, email_address, link_verify_email)}</p>` +
                        '</body>' + 
                    '</html>'
                };

                smtp_trans.sendMail(mail_options, (err, response) => 
                {
                    if (err)
                        res.status(400).json({ is_success: false, message: failure_email_address_update_email(lang), error: err });
                    else
                        res.status(200).json({ is_success: true, message: success_email_address_update_email(lang) });
                });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_email_address_update_email(lang), error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: failure_email_address_update_email(lang), error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_email_address_update_email(lang), error: err }));
};

const send_mail_for_new_password = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);

    const email_address = req.body.email_address.toLowerCase();
    const rng = uuidv4().replace('-', '');

    let smtp_trans = null;
    let mail_options = null;

    let id_hashed_account = null;
    let link_create_password = '';

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
            res.status(404).json({ is_success: false, message: failure_no_account_matches_this_email(lang) });
        else if (!user.verified_user)
            res.status(401).json({ is_success: false, message: failure_email_has_to_be_verified(lang), send_verif_email: true});
        else
        {
            // Hash the ID for the link
            id_hashed_account = bcrypt.hashSync(user._id, salt);
            // The hash didn't work
            if (!id_hashed_account)
            {
                res.status(400).json({ is_success: false, message: failure_try_again(lang) });
                return;
            }

            // Create the token for password creation
            new Token(
            {
                code: rng,
                account: user._id,
                action: 'pass'
            })
            .save()
            .then(() => 
            {
                // Retrieve this token and use its ID in the email verification link
                // Be careful: the user may have requested a token several times, so retrieve the most recent of them (so not findOne(), but find() + length - 1)
                Token.find({ account: user._id, action: 'pass' })
                .then(tokens => 
                {
                    link_create_password = `${homepage}/password/${encodeURIComponent(tokens[tokens.length - 1].code)}/${encodeURIComponent(id_hashed_account)}`;

                    smtp_trans = nodemailer.createTransport(
                    {
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth:
                        {
                            type: 'OAuth2',
                            user: gmail_user,
                            serviceClient: key.client_id,
                            privateKey: key.private_key
                        }
                    });

                    mail_options = 
                    {
                        from: `"Sand Compass" <${gmail_user}>`,
                        to: `"${user.username}" <${email_address}>`,
                        subject: title_password_email(lang),
                        html: '' + 
                        '<html>' + 
                            '<body>' + 
                                '<hr />' + 
                                `<h1 style="text-align: center;">${hello_user(lang, user.username)}</h1>` + 
                                '<hr />' + 

                                `<p style="text-align: center;">${click_password_link(lang, link_create_password)}</p>` +
                            '</body>' + 
                        '</html>'
                    };

                    smtp_trans.sendMail(mail_options, (err, response) => 
                    {
                        if (err)
                            res.status(400).json({ is_success: false, message: failure_try_again(lang), error: err });
                        else
                            res.status(200).json({ is_success: true, message: success_password_email(lang) });
                    });
                })
                .catch(err => res.status(400).json({ is_sucess: false, message: failure_try_again(lang), error: err }));
            })
            .catch(err => res.status(400).json({ is_sucess: false, message: failure_try_again(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_sucess: false, message: failure_try_again(lang), error: err }));
};

const retrieve_all_newsletters = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;

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
                    Newsletter.find()
                    .then(newsletters => res.status(200).json({ is_success: true, data: newsletters, message: nbr_loaded_newsletters(lang, newsletters.length) }))
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

const send_newsletter = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;

    const newsletter = 
    {
        _id: req.body.newsletter._id, // null if newsletter is new
        object: req.body.newsletter.object,
        html_message: req.body.newsletter.html_message,
        language: parseInt(req.body.newsletter.language, 10),
        do_send: req.body.newsletter.do_send
    };
    let is_input_valid = true;

    let has_an_error_occured = false;
    let smtp_trans = null;
    let mail_options = null;
    let email_addresses = [];

    // There's no need to check for the validity of newsletter._id, as it's used in findOne(), so if it's not valid it will simply not work
    // "object" and "html_message" must be non-empty strings
    // "language" must be an integer between 0 and 2
    // "do_send" must be a boolean
    if (!newsletter.object || typeof newsletter.object !== 'string' 
        || !Number.isInteger(newsletter.language) || newsletter.language < 0 || newsletter.language > 2 
        || typeof newsletter.do_send !== 'boolean')
        is_input_valid = false;

    // Input is invalid
    if (!is_input_valid)
    {
        res.status(400).json({ is_success: false, message: failure_try_again(lang) });
        return;
    }

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure_try_again(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted

                    // Look for the "in-progress" newsletter in DB
                    Newsletter.findOne({ _id: newsletter._id, is_sent: false })
                    .then(element => 
                    {
                        // The newsletter was indeed previously saved in DB
                        if (element)
                        {
                            // Abort, as the newsletter has actually already been sent
                            if (element.is_sent)
                            {
                                res.status(400).json({ is_success: false, message: failure_try_again(lang) });
                                return;
                            }

                            // Update the newsletter in DB
                            Newsletter.updateOne({ _id: element._id }, 
                            {
                                object: newsletter.object,
                                html_message: newsletter.html_message,
                                date: Date.now(),
                                language: newsletter.language
                            })
                            .catch(() => has_an_error_occured = true)
                        }
                        // This newsletter is written on the spot
                        else
                        {
                            // Create the newsletter in DB
                            new Newsletter(
                            {
                                object: newsletter.object,
                                html_message: newsletter.html_message,
                                language: newsletter.language
                            })
                            .save()
                            .catch(() => has_an_error_occured = true);
                        }

                        if (has_an_error_occured)
                        {
                            res.status(400).json({ is_success: false, message: failure_try_again(lang) });
                        }
                        else if (!newsletter.do_send)
                        {
                            res.status(200).json({ is_success: true, message: success_newsletter_saved_and_not_sent(lang) });
                        }
                        // Send the newsletter, and upon success update its date and its "is_sent" attribute to true
                        else
                        {
                            User.find({ newsletter: true, language: newsletter.language })
                            .then(users => 
                            {
                                if (!users.length)
                                    res.status(404).json({ is_success: false, message: failure_newsletter_saved_but_no_lang_subscriber(lang) });
                                else
                                {
                                    smtp_trans = nodemailer.createTransport(
                                    {
                                        host: 'smtp.gmail.com',
                                        port: 465,
                                        secure: true,
                                        auth:
                                        {
                                            type: 'OAuth2',
                                            user: gmail_user,
                                            serviceClient: key.client_id,
                                            privateKey: key.private_key
                                        }
                                    });

                                    mail_options = 
                                    {
                                        from: `"Sand Compass" <${gmail_user}>`,
                                        to: [],
                                        subject: newsletter.object,
                                        html: '<html><body>' + markdown.toHTML(newsletter.html_message) + '</body></html>'
                                    };

                                    for (const user of users)
                                        email_addresses.push(`"${user.username}" <${user.email_address}>`);
                                    mail_options.bcc = email_addresses;

                                    smtp_trans.sendMail(mail_options, (error, response) => 
                                    {
                                        if (error)
                                            res.status(400).json({ is_success: false, message: failure_newsletter_saved_but_not_sent(lang), error: error });
                                        else
                                        {
                                            // The newsletter has been sent
                                            // In DB, update the newsletter's date and switch its "is_sent" attribute to true

                                            Newsletter.find()
                                            .then(newsletters => 
                                            {
                                                if (!newsletters.length)
                                                    res.status(404).json({ is_success: false, message: failure_newsletter_sent_but_none_found(lang) });
                                                else
                                                {
                                                    Newsletter.updateOne(element ? { _id: element._id } : { _id: newsletters[newsletters.length - 1]._id }, 
                                                    {
                                                        is_sent: true,
                                                        date: Date.now()
                                                    })
                                                    .then(() => res.status(200).json({ is_success: true, message: success_newsletter_sent(lang) }))
                                                    .catch(err => res.status(400).json({ is_success: false, message: failure_newsletter_sent_but_not_declared_as_sent(lang), error: err }));
                                                }
                                            })
                                            .catch(err => res.status(400).json({ is_success: false, message: failure_newsletter_sent_but_not_declared_as_sent(lang), error: err }));
                                        }
                                    });
                                }
                            })
                            .catch(err => res.status(400).json({ is_success: false, message: failure_newsletter_saved_but_not_sent(lang), error: error }));
                        }
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure_try_again(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure_try_again(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure_try_again(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_try_again(lang), error: err }));
};

module.exports = 
{
    send_visitor_mail_to_admin,
    send_mail_at_account_registration,
    send_mail_at_newsletter_subscription,
    send_mail_at_email_update,
    send_mail_for_new_password,
    retrieve_all_newsletters,
    send_newsletter
};

