import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AccountEditor from '../../assets/components/AccountEditor';
import Stats from '../../assets/components/Stats';
import BlogEditor from '../../assets/components/BlogEditor';
import NewsletterEditor from '../../assets/components/NewsletterEditor';
import FaqEditor from '../../assets/components/FaqEditor';
import { backend } from '../../../package.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const ControlPanel = (props) => 
{
    const [email_address, set_email_address] = useState('');
    const [password, set_password] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [access_message, set_access_message] = useState('');

    const handle_submit = () => 
    {
        if (email_address === '' || password === '')
        {
            set_access_message('The email address and the password are both needed.');
        }
        else
        {
            fetch(backend + `/user/admin/login/${email_address}/${password}`)
            .then(res => res.json())
            .then(json => 
            {
                if (json.message !== '')
                    console.log(json.message);
                if (json.error)
                    console.log(json.error);
                set_access_message(json.message);
                props.set_account_data(json.account_data);
                props.set_is_access_granted(json.is_success);
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
            <h1 className="title">Control Panel</h1>
            {!props.is_access_granted ?
            <>
                <form>
                    <input type="text" name="email_address" placeholder="Email address" value={email_address} onChange={e => set_email_address(e.target.value)} 
                        onKeyPress={handle_key_press} autoComplete="on" required autoFocus />

                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={e => set_password(e.target.value)} 
                            onKeyPress={handle_key_press} autoComplete="on" required />
                        <span className="btn_eye" onClick={handle_password_visibility}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>

                    <input type="button" className="button" name="btn_login" value="Log In" onClick={handle_submit} />
                    {access_message !== '' && <p>{access_message}</p>}
                    <p><Link to="/password">Password forgotten?</Link></p>
                </form>
            </>
            :
            <>
                <hr />
                <AccountEditor account_data={props.account_data} set_account_data={props.set_account_data} />
                <hr />
                <Stats />
                <hr />
                <BlogEditor account_data={props.account_data} articles={props.articles} set_articles={props.set_articles} categories={props.categories} set_categories={props.set_categories} />
                <hr />
                <NewsletterEditor />
                <hr />
                <FaqEditor questions={props.questions} set_questions={props.set_questions} />
            </>}
        </main>
    );
};

export default ControlPanel;

