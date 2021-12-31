import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { url_api } from '../../config.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const ControlPanel = () => 
{
    const [email_address, set_email_address] = useState('');
    const [password, set_password] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [access_message, set_access_message] = useState('');
    const [is_access_granted, set_is_access_granted] = useState(false);

    const handle_submit = () => 
    {
        if (email_address === '' || password === '')
        {
            set_access_message('The email address and the password are both needed.');
        }
        else
        {
            fetch(url_api + '/user/admin/login',
            {
                method: 'post',
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
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                set_access_message(json.message);
                set_is_access_granted(json.is_success);
            });
        }
    };

    const handle_key_press = e => 
    {
        if (e.key === 'Enter')
            handle_submit();
    };

    const handle_password_visibility = e =>
    {
        e.preventDefault();
        set_is_password_shown(is_password_shown ? false : true);
    };

    return (
        <main>
            {is_access_granted ?
            <>
                <h1>Control Panel</h1>
                <div id="go_to_blogeditor" className="page_numbers"><Link to="/controlpanel/blogeditor">Blog Editor</Link></div>
            </>
            :
            <>
                <h1>Control Panel</h1>

                <form>
                    <input type="text" name="email_address" placeholder="Email address" value={email_address} onChange={e => set_email_address(e.target.value)} 
                        onKeyPress={handle_key_press} autoComplete="on" required autoFocus />

                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={e => set_password(e.target.value)} 
                            onKeyPress={handle_key_press} autoComplete="on" required />
                        <span className="btn_eye" onClick={handle_password_visibility}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>

                    <input type="button" name="btn_login" value="Log In" onClick={handle_submit} />
                    <p>{access_message}</p>
                </form>
            </>}
        </main>
    );
};

export default ControlPanel;

