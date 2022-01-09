import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { send_registration_email } from '../../assets/functions/mailing';
import AccountEditor from '../../assets/components/AccountEditor';
import { backend } from '../../../package.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const UserPanel = (props) => 
{
    const [email_address, set_email_address] = useState('');
    const [password, set_password] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [access_message, set_access_message] = useState('');

    const handle_submit = async () => 
    {
        let send_verif_email = false;

        if (email_address !== '' && password !== '')
        {
            await fetch(backend + `/user/login/${email_address}/${password}`)
            .then(res => res.json())
            .then(json => 
            {
                send_verif_email = json.send_verif_email;

                if (json.message !== '')
                    console.log(json.message);
                if (json.error)
                    console.log(json.error);
                set_access_message(json.message);
                props.set_is_access_granted(json.is_success);
                props.set_account_data(json.account_data);
                if (send_verif_email)
                    alert(json.message);
            })
            .catch(err => console.log(err));

            if (send_verif_email && window.confirm('Do you wish for the verification email to be sent again?'))
                send_registration_email(email_address);
        }
    };

    const handle_key_press = (e) => 
    {
        if (e.key === 'Enter')
            handle_submit();
    };

    const handle_password_visibility = (e) => 
    {
        e.preventDefault();
        set_is_password_shown(is_password_shown ? false : true);
    };

    return (
        <main>
            <h1 className="title">{!props.is_access_granted ? 'Log In' : 'User Account'}</h1>
            {!props.is_access_granted ? 
                <form>
                    <input type="email" name="email_address" placeholder="Email address" autoComplete="on" autoFocus  
                        value={email_address} onChange={e => set_email_address(e.target.value)} onKeyPress={handle_key_press} />
                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder="Password" autoComplete="on"
                            value={password} onChange={e => set_password(e.target.value)} onKeyPress={handle_key_press} />
                        <span className="btn_eye" onClick={handle_password_visibility}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>
                    <input type="button" className="button" value="Log In" onClick={handle_submit} />
                    {access_message !== '' && <p>{access_message}</p>}
                    <p><Link to="/password">Password forgotten?</Link></p>
                    <p><Link to="/user/signup">Not yet registered?</Link></p>
                </form>
            :
                <AccountEditor account_data={props.account_data} set_account_data={props.set_account_data} />}
        </main>
    );
};

export default UserPanel;

