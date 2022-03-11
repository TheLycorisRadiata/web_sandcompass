import { confirm_resend_verification_email } from './lang';
import package_info from '../../../package.json';

const send_registration_email = async (ct, email_address) => 
{
    await fetch(`${package_info.api}/mailing/${ct.lang}/register`,
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
        ct.open_pop_up('alert', json.message);
    });
    //.catch(err => console.log(err));
};

const send_newsletter_email = async (ct, user_id, email_address) => 
{
    await fetch(`${package_info.api}/mailing/${ct.lang}/newsletter`,
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
        ct.open_pop_up('alert', json.message);
    });
    //.catch(err => console.log(err));
};

const send_verification_email = async (ct, user_id, email_address, username) => 
{
    await fetch(`${package_info.api}/mailing/${ct.lang}/email`,
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
            username: username
        })
    })
    .then(res => res.json())
    .then(json => 
    {
        //console.log(json.message);
        //if (json.error)
            //console.log(json.error);
        ct.open_pop_up('alert', json.message);
    });
    //.catch(err => console.log(err));
};

const send_password_email = async (ct, email_address) => 
{
    await fetch(`${package_info.api}/mailing/${ct.lang}/password`,
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
        ct.open_pop_up('alert', json.message);

        if (json.send_verif_email && window.confirm(confirm_resend_verification_email(ct.lang)))
            send_registration_email(ct.lang, email_address);
    });
    //.catch(err => console.log(err));
};

export
{
    send_registration_email,
    send_newsletter_email,
    send_verification_email,
    send_password_email
};

