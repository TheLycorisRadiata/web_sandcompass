import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    token_title_email, token_instruction_email,
    token_title_password, token_instruction_password, 
    oops, success, error_occured 
} from '../../assets/functions/lang';
import { useState, useLayoutEffect } from 'react';
import { backend } from '../../../package.json';

const ExecuteToken = () => 
{
    const ct = useContext(AppContext);

    const [title, set_title] = useState('');
    const [message, set_message] = useState('');
    const [is_token_expired, set_is_token_expired] = useState(false);

    useLayoutEffect(() => 
    {
        const path_parts = window.location.pathname.split('/');     
        const last_part = path_parts[path_parts.length - 1];
        const id_token = last_part !== '' && last_part !== 'signup' ? last_part : '';

        fetch(`${backend}/token/${ct.lang}/${id_token}`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);
            set_message(json.message);

            if (!json.is_success)
            {
                set_title(oops(ct.lang));
                set_is_token_expired(true);
            }
            else
                set_title(success(ct.lang));
        })
        .catch(err => 
        {
            console.log(err);
            set_title(error_occured(ct.lang));
            set_is_token_expired(true);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main id="tokens">
            <h1 className="title">{title}</h1>
            <p className="txt_centered">{message}</p>

            {is_token_expired && 
            <>
                <span className="divider"></span>
                <div>
                    <p><strong>{token_title_email(ct.lang)}</strong><br />{token_instruction_email(ct.lang)}</p>
                    <p><strong>{token_title_password(ct.lang)}</strong><br />{token_instruction_password(ct.lang)}</p>
                </div>
                <span className="divider"></span>
            </>}
        </main>
    );
};

export default ExecuteToken;

