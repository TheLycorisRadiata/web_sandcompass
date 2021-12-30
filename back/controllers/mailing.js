const nodemailer = require('nodemailer');
const User = require('../models/user');

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
            res.status(400).json({ is_success: false, message: 'Error: The message couldn\'t be sent.' });
        else
        {
            // Send the email
            smtp_trans.sendMail(mail_options, (error, response) => 
            {
                if (error)
                    res.status(400).json({ is_success: false, message: 'Error: The message couldn\'t be sent.', error: error });
                else
                    res.status(200).json({ is_success: true, message: 'Message sent.' });
            });
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The message couldn\'t be sent.', error: err }));
};

module.exports = 
{
    send_visitor_mail_to_admin
};

