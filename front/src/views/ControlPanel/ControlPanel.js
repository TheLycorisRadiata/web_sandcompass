import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import BlogEditor from './BlogEditor';
import { backend } from '../../../package.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const ControlPanel = (props) => 
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
            fetch(backend + '/user/admin/login',
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
            <h1>Control Panel</h1>
            {!is_access_granted ?
            <>
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
            </>
            :
            <>
                <BlogEditor articles={props.articles} set_articles={props.set_articles} categories={props.categories} set_categories={props.set_categories} />
            </>}
        </main>
    );
};

export default ControlPanel;

