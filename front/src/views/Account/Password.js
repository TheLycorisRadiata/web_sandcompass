import { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { send_password_email } from '../../assets/functions/mailing';
import { backend } from '../../../package.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const Password = () => 
{
    const history = useHistory();

    const [is_access_granted, set_is_access_granted] = useState(false);
    const [email_address, set_email_address] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [response_message, set_response_message] = useState('');

    useLayoutEffect(() => 
    {
        const path_parts = window.location.pathname.split('/');     
        const last_part = path_parts[path_parts.length - 1];
        const id_token = last_part !== '' && last_part !== 'password' ? '/' + last_part : null;

        if (id_token)
        {
            fetch(backend + '/token' + id_token)
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                set_response_message(json.message);

                if (json.error)
                    console.log(json.error);

                if (json.email_address)
                {
                    set_email_address(json.email_address);
                    set_is_access_granted(true);
                }
            })
            .catch(err => 
            {
                console.log(err);
                set_response_message('Oops... A problem occured.');
            });
        }
    }, []);

    const set_password = async (password) => 
    {
        const res = await fetch(backend + '/user/password',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                email_address: email_address,
                password: password
            })
        });

        return res.json();
    };

    const handle_submit = async (e) => 
    {
        const field_password = e.target[0].value;
        const field_repeat_password = e.target[1].value;

        let res = null;

        e.preventDefault();

        if (!is_access_granted)
        {
            if (e.target[0].value !== '')
                await send_password_email(e.target[0].value);
        }
        else if (field_password !== '' && field_repeat_password !== '')
        {
            if (field_password !== field_repeat_password)
            {
                alert('The same password is asked in both fields.');
                return;
            }

            res = await set_password(field_password);

            console.log(res.message);
            set_response_message(res.message);
            if (res.error)
                console.log(res.error);

            if (res.is_success)
                history.push('/user');
        }
    };

    const handle_password_visibility = (e) => 
    {
        e.preventDefault();
        set_is_password_shown(is_password_shown ? false : true);
    };

    return (
        <main>
            <h1 className="title">Password Creation</h1>
            <form onSubmit={handle_submit}>
                {!is_access_granted ? 
                    <input type="email" name="email_address" placeholder="Email address" required />
                :
                <>
                    <p className="txt_bold">{email_address}</p>

                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder="New password" required />
                        <span className="btn_eye" onClick={handle_password_visibility}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>
                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="repeat_password" placeholder="Repeat the password" required />
                        <span className="btn_eye" onClick={handle_password_visibility}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>
                </>}

                <input type="submit" className="button" value="Create password" />
                {response_message !== '' && <p>{response_message}</p>}
                <p><span className="a" onClick={() => history.push('/user')}>Retourner à la page de connexion</span></p>
            </form>
        </main>
    );
};

export default Password;

