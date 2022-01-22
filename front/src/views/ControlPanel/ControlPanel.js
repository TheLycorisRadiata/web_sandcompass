import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { control_panel, email_address } from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faFileAlt, faComment, faQuoteRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import AccountEditor from '../../assets/components/AccountEditor';
import ArticlesByAuthor from '../../assets/components/ArticlesByAuthor';
import { backend } from '../../../package.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
const icon_stats = <FontAwesomeIcon icon={faFileAlt} />;
const icon_faq = <FontAwesomeIcon icon={faComment} />;
const icon_blog = <FontAwesomeIcon icon={faQuoteRight} />;
const icon_newsletter = <FontAwesomeIcon icon={faEnvelope} />;

const ControlPanel = (props) => 
{
    const ct = useContext(AppContext);

    const [field_email_address, set_field_email_address] = useState('');
    const [password, set_password] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [access_message, set_access_message] = useState('');

    const handle_submit = () => 
    {
        if (field_email_address === '' || password === '')
        {
            set_access_message('The email address and the password are both needed.');
        }
        else
        {
            fetch(backend + `/user/admin/login/${field_email_address}/${password}`)
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

    useEffect(() => 
    {
        if (props.is_access_granted)
        {
            ct.set_lang(props.account_data.language);
            localStorage.setItem('lang', JSON.stringify({ index: props.account_data.language }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.is_access_granted]);

    return (
        <main>
            <h1 className="title">{control_panel(ct.lang)}</h1>
            {!props.is_access_granted ?
            <>
                <form>
                    <input type="text" name="email_address" placeholder={email_address(ct.lang)} value={field_email_address} onChange={e => set_field_email_address(e.target.value)} 
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
                <div id="control_panel_buttons">
                    <button className="button"><Link to="/admin/stats"><span className="icon">{icon_stats}</span> Statistics</Link></button>
                    <button className="button"><Link to="/admin/faq"><span className="icon">{icon_faq}</span> FAQ Editor</Link></button>
                    <button className="button"><Link to="/admin/blog"><span className="icon">{icon_blog}</span> Blog Editor</Link></button>
                    <button className="button"><Link to="/admin/newsletter"><span className="icon">{icon_newsletter}</span> Newsletter Editor</Link></button>
                </div>

                <span className="divider"></span>
                <AccountEditor account_data={props.account_data} set_account_data={props.set_account_data} />
                <span className="divider"></span>
                <ArticlesByAuthor author={props.account_data._id} categories={props.categories} />
            </>}
        </main>
    );
};

export default ControlPanel;

