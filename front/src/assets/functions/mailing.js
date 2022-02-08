import { confirm_resend_verification_email } from './lang';
import package_info from '../../../package.json';

const send_registration_email = async (lang, email_address) => 
{
    await fetch(`${package_info.api}/mailing/${lang}/register`,
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
        //console.log(json.message);
        //if (json.error)
            //console.log(json.error);
        alert(json.message);
    })
    .catch(err => console.log(err));
};

const send_newsletter_email = async (lang, user_id, email_address) => 
{
    await fetch(`${package_info.api}/mailing/${lang}/newsletter`,
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
        //console.log(json.message);
        //if (json.error)
            //console.log(json.error);
        alert(json.message);
    })
    .catch(err => console.log(err));
};

const send_verification_email = async (lang, user_id, email_address, first_name) => 
{
    await fetch(`${package_info.api}/mailing/${lang}/email`,
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
        //console.log(json.message);
        //if (json.error)
            //console.log(json.error);
        alert(json.message);
    })
    .catch(err => console.log(err));
};

const send_password_email = async (lang, email_address) => 
{
    await fetch(`${package_info.api}/mailing/${lang}/password`,
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
        //console.log(json.message);
        //if (json.error)
            //console.log(json.error);
        alert(json.message);

        if (json.send_verif_email && window.confirm(confirm_resend_verification_email(lang)))
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

