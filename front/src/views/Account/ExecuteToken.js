import { useState, useLayoutEffect } from 'react';
import { backend } from '../../../package.json';

const ExecuteToken = () => 
{
    const [title, set_title] = useState('');
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
            set_title(json.message);

            if (!json.is_success)
                set_is_token_expired(true);
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
            <h1>{title}</h1>
            <div className="section_body">
                {is_token_expired && 
                <>
                    <hr />
                    <br />
                    <p><strong>Link to verify the email address</strong><br />Try to log in. If your email address is not yet verified, a pop-up asks whether you wish to receive a new link.</p>
                    <p><strong>Link to modify the password</strong><br />Click on "Password forgotten?".</p>
                    <hr />
                </>}
            </div>
        </main>
    );
};

export default ExecuteToken;

