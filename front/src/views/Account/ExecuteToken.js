import { useState, useEffect, useLayoutEffect } from 'react';
import {
    token_title_email, token_instruction_email,
    token_title_password, token_instruction_password, 
    oops, success, error_occured 
} from '../../assets/functions/lang';
import package_info from '../../../package.json';

const ExecuteToken = () => 
{
    const [lang, set_lang] = useState(0);
    const [title, set_title] = useState('');
    const [message, set_message] = useState('');
    const [is_token_expired, set_is_token_expired] = useState(false);

    // HTML standard meta tags + Open Graph meta tags
    if (title !== '')
    {
        document.title = title + ' | Mofumofu';
        document.querySelector('meta[property="og:title"]').setAttribute('content', title + ' | Mofumofu');
    }
    if (message !== '')
    {
        document.querySelector('meta[name="description"]').setAttribute('content', message);
        document.querySelector('meta[property="og:description"]').setAttribute('content', message);
    }

    useLayoutEffect(() => 
    {
        const path_parts = window.location.pathname.split('/');     
        const id_token = path_parts[path_parts.length - 2]; // one before last
        const id_account = path_parts[path_parts.length - 1]; // last
        let path_lang = path_parts[path_parts.length - 3];

        if (path_lang !== '' && path_lang !== 'token' && id_token !== '' && id_token !== 'token' && id_account !== '' && id_account !== 'token')
        {
            path_lang = parseInt(path_lang, 10);
            set_lang(path_lang);

            fetch(`${package_info.api}/token/${path_lang}/${id_token}/${id_account}`)
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                set_message(json.message);

                if (!json.is_success)
                {
                    set_title(oops(path_lang));
                    set_is_token_expired(true);
                }
                else
                    set_title(success(path_lang));
            })
            .catch(err => 
            {
                //console.log(err);
                set_title(error_occured(path_lang));
                set_is_token_expired(true);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main id="tokens">
            <h1 className="title">{title}</h1>
            <p className="txt_centered">{message}</p>

            {is_token_expired && 
            <>
                <span className="divider"></span>
                <div>
                    <p><strong>{token_title_email(lang)}</strong><br />{token_instruction_email(lang)}</p>
                    <p><strong>{token_title_password(lang)}</strong><br />{token_instruction_password(lang)}</p>
                </div>
                <span className="divider"></span>
            </>}
        </main>
    );
};

export default ExecuteToken;

