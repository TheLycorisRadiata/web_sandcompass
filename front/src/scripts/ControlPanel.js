import {useState} from 'react';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-regular-svg-icons';
import '../styles/ControlPanel.css';

const icon_window_close = <FontAwesomeIcon icon={faWindowClose} />

const ControlPanel = (props) => 
{
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [back_title, set_back_title] = useState('');
    const [back_message, set_back_message] = useState('');
    const [back_status_code, set_back_status_code] = useState('');

    const handle_logout = () => 
    {
        fetch('http://localhost:3001/connection/logout/admin')
        .then(res => res.json())
        .then(() => props.close_access(false));
    };

    const handle_click = () => 
    {
        fetch('http://localhost:3001/connection/login/admin',
        {       
            method: 'post',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                field_login_username: username,
                field_login_password: password
            })
        })
        .then(res => res.json())
        .then(json => 
        {
            set_back_title(json.title);
            set_back_message(json.message);

            if (json.status >= 400)
            {
                set_back_status_code('back_error');
                props.grant_access(false);
            }
            else
            {
                set_back_status_code('back_ok');
                props.grant_access(true);
            }
        });

        set_username('');
        set_password('');
    };

    const handle_key_press = (e) => 
    {
        if (e.key === 'Enter')
            handle_click();
    };

    return (
        <main>
            {props.is_access_granted && 
            <>
                <div id="btn_logout_admin"><span title="Log Out" onClick={handle_logout}>{icon_window_close}</span></div>

                <h1>Control Panel</h1>

                <div id="go_to_blogeditor" className="page_numbers"><Link to="/controlpanel/blogeditor">Blog Editor</Link></div>
            </>}

            {!props.is_access_granted &&
            <>
                <h1>Control Panel</h1>

                <form>
                    <input type="text" id="field_login_username" name="field_login_username" value={username} onChange={e => set_username(e.target.value)} placeholder="Username" 
                        onKeyPress={handle_key_press} autoFocus autoComplete="on" required />
                    <input type="password" id="field_login_password" name="field_login_password" value={password} onChange={e => set_password(e.target.value)} placeholder="Password" 
                        onKeyPress={handle_key_press} autoComplete="on" required />
                    <input type="button" id="btn_login" name="btn_login" value="Log In" onClick={handle_click} />
                </form>

                {back_title !== '' && back_message !== '' && 
                <>
                    <div id="back_talks">
                        <strong id={back_status_code}>{back_title}</strong><br />
                        {back_message}

                        {back_status_code === 'back_ok' && <div id="go_to_blogeditor" className="page_numbers"><Link to="/controlpanel/blogeditor">Blog Editor</Link></div>}
                    </div>
                </>}
            </>}
        </main>
    );
};

export default ControlPanel;

