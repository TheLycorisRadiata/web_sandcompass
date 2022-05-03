import { useState, useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    password_creation, oops, error_occured, disclaimer_password, 
    email_address, new_password, repeat_password, 
    create_password, go_back_log_in 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { handle_required_field } from '../../assets/functions/parsing';
import { send_password_email } from '../../assets/functions/mailing';
import package_info from '../../../package.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const Password = () => 
{
    const ct = useContext(AppContext);
    const history = useHistory();

    // HTML standard meta tags
    document.title = password_creation(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', create_password(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', password_creation(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', create_password(ct.lang));

    const [is_access_granted, set_is_access_granted] = useState(false);
    const [field_email_address, set_field_email_address] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [response_message, set_response_message] = useState('');

    useLayoutEffect(() => 
    {
        const path_parts = window.location.pathname.split('/');
        const id_token = path_parts[path_parts.length - 2]; // one before last
        const id_account = path_parts[path_parts.length - 1]; // last

        if (id_token !== '' && id_token !== 'password' && id_account !== '' && id_account !== 'password')
        {
            fetch(`${package_info.api}/token/${ct.lang}/${id_token}/${id_account}`)
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                set_response_message(json.message);

                //if (json.error)
                    //console.log(json.error);

                if (json.is_success)
                {
                    set_field_email_address(json.email_address);
                    set_is_access_granted(true);
                }
            })
            .catch(err => 
            {
                //console.log(err);
                set_response_message(oops(ct.lang) + ' ' + error_occured(ct.lang));
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handle_click_password_eye = () => 
    {
        const eye_button1 = document.getElementById('eye1');
        const eye_button2 = document.getElementById('eye2');
        const eye1_required_class = eye_button1.classList.contains('required');
        const eye2_required_class = eye_button2.classList.contains('required');

        set_is_password_shown(!is_password_shown);

        // "!is_password_shown" because the state is not yet updated
        eye_button1.className = !is_password_shown ? 'btn_eye_open' : 'btn_eye_closed';
        if (eye1_required_class)
            eye_button1.classList.add('required');

        eye_button2.className = !is_password_shown ? 'btn_eye_open' : 'btn_eye_closed';
        if (eye2_required_class)
            eye_button2.classList.add('required');
    };

    const set_password = async (password, id_token, id_account) => 
    {
        const res = await fetch(`${package_info.api}/user/${ct.lang}/password`,
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                id_token: decodeURIComponent(id_token),
                id_account: decodeURIComponent(id_account),
                email_address: field_email_address,
                password: password
            })
        });

        return res.json();
    };

    const handle_submit = async (e) => 
    {
        const path_parts = window.location.pathname.split('/');
        const id_token = path_parts[path_parts.length - 2]; // one before last
        const id_account = path_parts[path_parts.length - 1]; // last

        const field_password = e.target[0].value;
        const field_repeat_password = e.target[1].value;

        let is_any_required_field_empty = false;
        let res = null;

        e.preventDefault();

        if (!is_access_granted)
        {
            handle_required_field('email_address');
            if (e.target[0].value !== '')
                await send_password_email(ct, e.target[0].value);
        }
        else
        {
            if (!handle_required_field('password'))
                is_any_required_field_empty = true;
            if (!handle_required_field('repeat_password'))
                is_any_required_field_empty = true;

            if (is_any_required_field_empty)
                return;

            if (field_password === field_repeat_password)
            {
                document.querySelector('input[name="password"').classList.remove('required');
                document.querySelector('input[name="repeat_password"').classList.remove('required');
                document.getElementById('eye1').classList.remove('required');
                document.getElementById('eye2').classList.remove('required');
            }
            else
            {
                document.querySelector('input[name="password"').classList.add('required');
                document.querySelector('input[name="repeat_password"').classList.add('required');
                document.getElementById('eye1').classList.add('required');
                document.getElementById('eye2').classList.add('required');

                ct.popup('alert', ct.lang, disclaimer_password(ct.lang));
                return;
            }

            res = await set_password(field_password, id_token, id_account);

            //(res.message);
            set_response_message(res.message);
            //if (res.error)
                //console.log(res.error);

            if (res.is_success)
                history.push('/user');
        }
    };

    return (
        <main>
            <h1 className="title">{password_creation(ct.lang)}</h1>
            <form onSubmit={handle_submit}>
                {!is_access_granted ? 
                    <input type="email" name="email_address" placeholder={email_address(ct.lang)} autoFocus />
                :
                <>
                    <p className="txt_bold" id="p_password">{field_email_address}</p>

                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder={new_password(ct.lang)} autoComplete="new-password" autoFocus />
                        <span id="eye1" className="btn_eye_closed" onClick={handle_click_password_eye}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>
                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="repeat_password" placeholder={repeat_password(ct.lang)} autoComplete="new-password" />
                        <span id="eye2" className="btn_eye_closed" onClick={handle_click_password_eye}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>
                </>}

                <input type="submit" className="button" value={create_password(ct.lang)} />
                {response_message !== '' && <p>{response_message}</p>}
                <p><span className="a" onClick={() => history.push('/user')}>{go_back_log_in(ct.lang)}</span></p>
            </form>
        </main>
    );
};

export default Password;

