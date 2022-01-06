import { useState, useLayoutEffect } from 'react';
import { backend } from '../../../package.json';

const ExecuteToken = () => 
{
    const [title, set_title] = useState('');
    const [message, set_message] = useState('');
    const [is_token_expired, set_is_token_expired] = useState(false);

    useLayoutEffect(() => 
    {
        const path_parts = window.location.pathname.split('/');     
        const last_part = path_parts[path_parts.length - 1];
        const id_token = last_part !== '' && last_part !== 'signup' ? last_part : '';

        fetch(backend + '/token/' + id_token)
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);
            set_message(json.message);

            if (!json.is_success)
            {
                set_title('Oops...');
                set_is_token_expired(true);
            }
            else
                set_title('Success!');
        })
        .catch(err => 
        {
            console.log(err);
            set_title('A problem occured');
            set_is_token_expired(true);
        });
    }, []);

    return (
        <main>
            <h1 className="title">{title}</h1>
            <p className="txt_centered">{message}</p>

            {is_token_expired && 
            <>
                <hr />
                <br />
                <p><strong>Link to verify the email address</strong><br />Try to log in. If your email address is not yet verified, a pop-up asks whether you wish to receive a new link.</p>
                <p><strong>Link to modify the password</strong><br />Click on "Password forgotten?".</p>
                <hr />
            </>}
        </main>
    );
};

export default ExecuteToken;

