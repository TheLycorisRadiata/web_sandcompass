const nodemailer = require('nodemailer');

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
    const business_name = req.body.business_name === '' ? '' : ' of the company ' + req.body.business_name;
    const full_name = req.body.last_name.toUpperCase() + ' ' + req.body.first_name;
    const email_address = req.body.email_address;
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
        service: 'gmail',
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
        text: `${full_name} (${email_address})${business_name} says:\n\n${message}`
    };

    // Send the email
    smtp_trans.sendMail(mail_options, (error, response) => 
    {
        if (error)
            res.status(400).json({ message: 'Error: The message couldn\'t be sent', error: error });
        else
            res.status(200).json({ message: 'Message sent' });
    });
};

module.exports = 
{
    send_visitor_mail_to_admin
};

