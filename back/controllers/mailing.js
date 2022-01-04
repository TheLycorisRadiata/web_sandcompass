const nodemailer = require('nodemailer');
const User = require('../models/user');
const Token = require('../models/token');
const Newsletter = require('../models/newsletter');
const { homepage } = require('../package.json');

const send_visitor_mail_to_admin = (req, res) => 
{
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
    const full_name = req.body.last_name.toUpperCase() + ' ' + req.body.first_name;
    const email_address = req.body.email_address.toLowerCase();
    const subject = req.body.subject === 'subject_work_cosmic_dust' ? 'Projects - Book: Cosmic Dust' 
        : req.body.subject === 'subject_work_persistence' ? 'Projects - Game: Persistence' 
        : req.body.subject === 'subject_work_other' ? 'Projects - Another project' 
        : req.body.subject === 'subject_website' ? 'Misc - This website' 
        : req.body.subject === 'subject_legal' ? 'Misc - Legal stuff' 
        : req.body.subject === 'subject_other' ? 'Misc - Other' 
        : 'NO SUBJECT SELECTED';
    const message = req.body.message;

    // Instantiation of the SMTP server
    const smtp_trans = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:
        {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    // Email
    const mail_options = 
    {
        from: `"${full_name}" <${email_address}>`,
        to: process.env.GMAIL_USER,
        subject: 'Contact form | ' + subject,
        html: '' +
        '<html>' +
            '<body>' +
                '<hr />' +
                `<p style="font-weight: bold;">${is_pro}${full_name} (${email_address})${business_name} says:</p>` +
                '<hr />' +

                `<p>${message}</p>` +
            '</body>' +
        '</html>'
    };

    // Prevent a visitor from using either the admin's or the mailing's email addresses
    User.findOne({ is_admin: true })
    .then(admin =>
    {
        if ((admin && email_address === admin.email_address.toLowerCase()) || email_address === process.env.GMAIL_USER.toLowerCase())
            res.status(400).json({ is_success: false, message: 'Error: Try again.' });
        else
        {
            // Send the email
            smtp_trans.sendMail(mail_options, (error, response) => 
            {
                if (error)
                    res.status(400).json({ is_success: false, message: 'Error: Try again.', error: error });
                else
                    res.status(200).json({ is_success: true, message: 'Message sent.' });
            });
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: Try again.', error: err }));
};

const send_mail_at_account_registration = (req, res) => 
{
    const email_address = req.body.email_address.toLowerCase();

    let smtp_trans = null;
    let mail_options = null;

    let paragraph_newsletter = '';
    let link_verify_email = '';

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
        {
            res.status(400).json({ is_success: false, message: 'Error: The account validation email couldn\'t be sent.' });
            return;
        }

        link_referral = homepage + '/user/signup/' + user._id;

        paragraph_newsletter = (user.newsletter ? 
            `<p>You're subscribed to the newsletter, which allows you to be updated on the projects' progress.` : 
            `<p>If you desire to be updated on the projects' progress, subscribe to the newsletter from your Sand Compass account.`) 

        // Create the token for email verification
        new Token(
        {
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
                link_verify_email = homepage + '/token/' + tokens[tokens.length - 1]._id;

                smtp_trans = nodemailer.createTransport(
                {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth:
                    {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS
                    }
                });

                mail_options = 
                {
                    from: `"Sand Compass" <${process.env.GMAIL_USER}>`,
                    to: email_address,
                    subject: 'Welcome to Sand Compass',
                    html: '' + 
                    '<html>' + 
                        '<body>' + 
                            '<hr />' + 
                            `<h1 style="text-align: center;">Welcome to Sand Compass, ${user.username}!</h1>` + 
                            '<hr />' + 

                            `<p>To be assured you're behind this registration, you're invited to <a href="${link_verify_email}">click here</a> to verify your email address.</p>` + 

                            paragraph_newsletter + 

                            '<p>Thank you for the attention you express towards Sand Compass! If you wish to help projects get along, speak about Sand Compass around you and on social media.</p>' + 
                            '<p>You can also help by letting a message on the website with a remark, question or suggestion.</p>' +
                        '</body>' + 
                    '</html>'
                };

                smtp_trans.sendMail(mail_options, (err, response) => 
                {
                    if (err)
                        res.status(400).json({ is_success: false, message: 'Error: The account validation email couldn\'t be sent.', error: err });
                    else
                        res.status(200).json({ is_success: true, message: 'You\'ve just been sent an email! It contains a clickable link to verify your email address.' });
                });
            })
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The account validation email couldn\'t be sent.', error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The account validation email couldn\'t be sent.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The account validation email couldn\'t be sent.', error: err }));
};

// This controller is only if the account has been previously created but without a newsletter subscription
const send_mail_at_newsletter_subscription = (req, res) => 
{
    const email_address = req.body.email_address.toLowerCase();

    let smtp_trans = null;
    let mail_options = null;

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
        {
            res.status(404).json({ is_success: false, message: 'Error: The newsletter email couldn\'t be sent.' });
            return;
        }

        link_referral = homepage + '/user/signup/' + user._id;

        smtp_trans = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:
            {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        mail_options = 
        {
            from: `"Sand Compass" <${process.env.GMAIL_USER}>`,
            to: email_address,
            subject: 'You\'re now subscribed to the newsletter',
            html: '' + 
            '<html>' + 
                '<body>' + 
                    '<hr />' + 
                    `<h1 style="text-align: center;">Hello, ${user.username}!</h1>` + 
                    '<hr />' + 

                    `<p>You're subscribed to the newsletter, which allows you to be updated on the projects' progress.` + 

                    '<p>Thank you for the attention you express towards Sand Compass! If you wish to help projects get along, speak about Sand Compass around you and on social media.</p>' + 
                    '<p>You can also help by letting a message on the website with a remark, question or suggestion.</p>' +
                '</body>' + 
            '</html>'
        };

        smtp_trans.sendMail(mail_options, (err, response) => 
        {
            if (err)
                res.status(400).json({ is_success: false, message: 'Error: The newsletter email couldn\'t be sent.', error: err });
            else
                res.status(200).json({ is_success: true, message: 'You\'ve just been sent an email.' });
        });
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The newsletter email couldn\'t be sent.', error: err }));
};

// This controller is only if the email address has been updated from the account editor
const send_mail_at_email_update = (req, res) => 
{
    const email_address = req.body.email_address.toLowerCase();
    
    let smtp_trans = null;
    let mail_options = null;

    let link_verify_email = '';

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
            res.status(404).json({ is_success: false, message: 'Error: The verification email for your email address couldn\'t be sent.' });

        // Create the token for email verification
        new Token(
        {
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
                link_verify_email = homepage + '/token/' + tokens[tokens.length - 1]._id;

                smtp_trans = nodemailer.createTransport(
                {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth:
                    {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS
                    }
                });

                mail_options = 
                {
                    from: `"Sand Compass" <${process.env.GMAIL_USER}>`,
                    to: email_address,
                    subject: 'Verify your email address',
                    html: '' + 
                    '<html>' + 
                        '<body>' + 
                            '<hr />' + 
                            `<h1 style="text-align: center;">Hello, ${req.body.username}!</h1>` + 
                            '<hr />' + 

                            `<p>You've just communicated "${email_address}" as your new email address. <a href="${link_verify_email}">Click here</a> to verify it.</p>` +
                        '</body>' + 
                    '</html>'
                };

                smtp_trans.sendMail(mail_options, (err, response) => 
                {
                    if (err)
                        res.status(400).json({ is_success: false, message: 'Error: The verification email for your email address couldn\'t be sent.', error: err });
                    else
                        res.status(200).json({ is_success: true, message: 'You\'ve just been sent an email on your new email address! It contains a clickable link to verify your email address.' });
                });
            })
            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The verification email for your email address couldn\'t be sent.', error: err }));
        })
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The verification email for your email address couldn\'t be sent.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The verification email for your email address couldn\'t be sent.', error: err }));
};

const send_mail_for_new_password = (req, res) => 
{
    const email_address = req.body.email_address.toLowerCase();

    let smtp_trans = null;
    let mail_options = null;

    let link_create_password = '';

    User.findOne({ email_address: email_address })
    .then(user => 
    {
        if (!user)
            res.status(404).json({ is_success: false, message: 'Error: No account matches this email address.' });
        else if (!user.verified_user)
            res.status(401).json({ is_success: false, message: 'The email address has to be verified first.', send_verif_email: true});
        else
        {
            // Create the token for password creation
            new Token(
            {
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
                    link_create_password = homepage + '/password/' + tokens[tokens.length - 1]._id;

                    smtp_trans = nodemailer.createTransport(
                    {
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth:
                        {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASS
                        }
                    });

                    mail_options = 
                    {
                        from: `"Sand Compass" <${process.env.GMAIL_USER}>`,
                        to: email_address,
                        subject: user.hashed_password ? 'Password modification' : 'Pasword creation',
                        html: '' + 
                        '<html>' + 
                            '<body>' + 
                                '<hr />' + 
                                `<h1 style="text-align: center;">Hello, ${user.username}!</h1>` + 
                                '<hr />' + 

                                `<p style="text-align: center;"><a href="${link_create_password}">Click here</a> to ${user.hashed_password ? 'modify' : 'create'} your password.</p>` +
                            '</body>' + 
                        '</html>'
                    };

                    smtp_trans.sendMail(mail_options, (err, response) => 
                    {
                        if (err)
                            res.status(400).json({ is_success: false, message: 'Error: Try again.', error: err });
                        else
                            res.status(200).json({ is_success: true, message: 'You\'ve just been sent an email! It contains a clickable link to set your password.' });
                    });
                })
                .catch(err => res.status(400).json({ is_sucess: false, message: 'Error: Try again.', error: err }));
            })
            .catch(err => res.status(400).json({ is_sucess: false, message: 'Error: Try again.', error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_sucess: false, message: 'Error: Try again.', error: err }));
};

const retrieve_all_newsletters = (req, res) => 
{
    Newsletter.find()
    .then(newsletters => res.status(200).json({ is_success: true, data: newsletters, message: newsletters.length + ' newsletters loaded.' }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error occured. See the log.', error: err }));
};

const send_newsletter = (req, res) => 
{
    const newsletter = req.body.newsletter;
    let has_an_error_occured = false;
    let smtp_trans = null;
    let mail_options = null;
    let email_addresses = [];

    // Look for the "in-progress" newsletter in DB
    Newsletter.findOne({ _id: newsletter._id, is_sent: false })
    .then(element => 
    {
        // The newsletter was indeed previously saved in DB
        if (element)
        {
            // Update the newsletter in DB
            Newsletter.updateOne({ _id: element._id }, 
            {
                title: newsletter.title,
                html_message: newsletter.html_message,
                date: Date.now()
            })
            .catch(() => has_an_error_occured = true)
        }
        // This newsletter is written on the spot
        else
        {
            // Create the newsletter in DB
            new Newsletter(
            {
                title: newsletter.title,
                html_message: newsletter.html_message
            })
            .save()
            .catch(() => has_an_error_occured = true);
        }

        if (has_an_error_occured)
        {
            res.status(400).json({ is_success: false, message: 'Error: Try again.' });
        }
        else if (!newsletter.do_send)
        {
            res.status(200).json({ is_success: true, message: 'The newsletter is saved, but not sent yet.' });
        }
        // Send the newsletter, and upon success update its date and its "is_sent" attribute to true
        else
        {
            User.find({ newsletter: true })
            .then(users => 
            {
                if (!users.length)
                    res.status(404).json({ is_success: false, message: 'Error: The newsletter is saved, but couldn\'t be sent because no account is subscribed to the newsletter.' });
                else
                {
                    smtp_trans = nodemailer.createTransport(
                    {
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth:
                        {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASS
                        }
                    });

                    mail_options = 
                    {
                        from: `"Sand Compass" <${process.env.GMAIL_USER}>`,
                        subject: newsletter.title,
                        html: '<html><body>' + newsletter.html_message + '</body></html>'
                    };

                    for (const user of users)
                        email_addresses.push(user.email_address);
                    mail_options.to = email_addresses;

                    smtp_trans.sendMail(mail_options, (error, response) => 
                    {
                        if (error)
                            res.status(400).json({ is_success: false, message: 'Error: The newsletter is saved, but couldn\'t be sent.', error: error });
                        else
                        {
                            // The newsletter has been sent
                            // In DB, update the newsletter's date and switch its "is_sent" attribute to true

                            Newsletter.find()
                            .then(newsletters => 
                            {
                                if (!newsletters.length)
                                    res.status(404).json({ is_success: false, message: 'Error: The newsletter has been sent, but strangely no newsletter could be found in database.' });
                                else
                                {
                                    Newsletter.updateOne(element ? { _id: element._id } : { _id: newsletters[newsletters.length - 1]._id }, 
                                    {
                                        is_sent: true,
                                        date: Date.now()
                                    })
                                    .then(() => res.status(200).json({ is_success: true, message: 'The newsletter has been sent.' }))
                                    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The newsletter is sent, but couldn\'t be declared as "sent" in database.', error: err }));
                                }
                            })
                            .catch(err => res.status(400).json({ is_success: false, message: 'Error: The newsletter is sent, but couldn\'t be declared as "sent" in database.', error: err }));
                        }
                    });
                }
            })
            .catch(err => res.status(400).json({ is_success: false, message: 'Erreur : La newsletter est sauvegardée, mais elle n\'a pas pu être envoyée. Re-essayez.', error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: Try again.', error: err }));
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

