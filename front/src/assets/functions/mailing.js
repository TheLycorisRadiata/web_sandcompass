import { backend } from '../../../package.json';

const send_registration_email = async (email_address) => 
{
    await fetch(backend + '/mailing/register',
    {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_address: email_address })
    })
    .then(res => res.json())
    .then(json => 
    {
        console.log(json.message);
        if (json.error !== undefined)
            console.log(json.error);
        alert(json.message);
    })
    .catch(err => console.log(err));
};

const send_newsletter_email = async (user_id, email_address) => 
{
    await fetch(backend + '/mailing/newsletter',
    {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
            user_id: user_id,
            email_address: email_address
        })
    })
    .then(res => res.json())
    .then(json => 
    {
        console.log(json.message);
        if (json.error !== undefined)
            console.log(json.error);
        alert(json.message);
    })
    .catch(err => console.log(err));
};

const send_verification_email = async (user_id, email_address, first_name) => 
{
    await fetch(backend + '/mailing/email',
    {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
            user_id: user_id,
            email_address: email_address,
            first_name: first_name
        })
    })
    .then(res => res.json())
    .then(json => 
    {
        console.log(json.message);
        if (json.error !== undefined)
            console.log(json.error);
        alert(json.message);
    })
    .catch(err => console.log(err));
};

const send_password_email = async (email_address) => 
{
    await fetch(backend + '/mailing/password',
    {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
            email_address: email_address
        })
    })
    .then(res => res.json())
    .then(json => 
    {
        console.log(json.message);
        if (json.error !== undefined)
            console.log(json.error);
        alert(json.message);

        if (json.send_verif_email && window.confirm('Do you wish for the verification email to be sent again?'))
            send_registration_email(email_address);
    })
    .catch(err => console.log(err));
};

export
{
    send_registration_email,
    send_newsletter_email,
    send_verification_email,
    send_password_email
};

