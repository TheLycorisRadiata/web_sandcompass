import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    log_in, user_account, disclaimer_email_and_password, confirm_resend_verification_email, 
    email_address, password, stay_logged_in_for_30_days, password_forgotten, not_yet_registered 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { send_registration_email } from '../../assets/functions/mailing';
import AccountEditor from '../../assets/components/AccountEditor';
import ArticlesByAuthor from '../../assets/components/ArticlesByAuthor';
import package_info from '../../../package.json';

const icon_logout = <FontAwesomeIcon icon={faSquareXmark} />;
const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const UserPanel = (props) => 
{
    const ct = useContext(AppContext);

    const [field_email_address, set_field_email_address] = useState('');
    const [field_password, set_field_password] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [stay_logged_in, set_stay_logged_in] = useState(false);
    const [access_message, set_access_message] = useState('');

    const handle_submit = async () => 
    {
        let send_verif_email = false;

        if (field_email_address === '' || field_password === '')
            set_access_message(disclaimer_email_and_password(ct.lang));
        else
        {
            await fetch(`${package_info.api}/user/${ct.lang}/login/${field_email_address}/${field_password}/${stay_logged_in}`)
            .then(res => res.json())
            .then(json => 
            {
                send_verif_email = json.send_verif_email;

                //if (json.message !== '')
                    //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                set_access_message(json.message);
                props.set_account_data(json.account_data);
                props.set_is_access_granted(json.is_success);
                if (send_verif_email)
                    alert(json.message);

                if (json.token_stay_logged_in)
                {
                    document.cookie = 'token=' + encodeURIComponent(json.token_stay_logged_in) + '; path=/; domain=' + encodeURIComponent(package_info.domain) + '; samesite=lax; secure; max-age=3600';
                    document.cookie = 'id=' + encodeURIComponent(json.id) + '; path=/; domain=' + encodeURIComponent(package_info.domain) + '; samesite=lax; secure; max-age=3600';
                }
            });
            //.catch(err => console.log(err));

            if (send_verif_email && window.confirm(confirm_resend_verification_email(ct.lang)))
                send_registration_email(ct.lang, field_email_address);
        }
    };

    const handle_key_press = (e) => 
    {
        if (e.key === 'Enter')
            handle_submit();
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

    const logout = () => 
    {
        // Make a request so login tokens can be deleted
        fetch(`${package_info.api}/token/${ct.lang}/login/${props.account_data?._id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(json => 
        {
            //if (json.message !== '')
                //console.log(json.message);
            //if (json.error)
                //console.log(json.error);
        });

        // Reset user data
        props.set_is_access_granted(false);
        props.set_account_data(null);
    };

    return (
        <main>
            <h1 className="title">{!props.is_access_granted ? log_in(ct.lang) : user_account(ct.lang)}</h1>
            {!props.is_access_granted ? 
                <form>
                    <input type="email" name="email_address" placeholder={email_address(ct.lang)} autoComplete="on" autoFocus  
                        value={field_email_address} onChange={e => set_field_email_address(e.target.value)} onKeyPress={handle_key_press} />

                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder={password(ct.lang)} autoComplete="on"
                            value={field_password} onChange={e => set_field_password(e.target.value)} onKeyPress={handle_key_press} />
                        <span className="btn_eye" onClick={() => set_is_password_shown(!is_password_shown)}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>

                    <div className="div_pointer">
                        <input type="checkbox" name="stay_logged_in" id="stay_logged_in" value={stay_logged_in} onChange={() => set_stay_logged_in(!stay_logged_in)} />
                        <label htmlFor="stay_logged_in">{stay_logged_in_for_30_days(ct.lang)}</label>
                    </div>

                    <input type="button" className="button" value={log_in(ct.lang)} onClick={handle_submit} />

                    {access_message !== '' && <p>{access_message}</p>}
                    <p><Link to="/password">{password_forgotten(ct.lang)}</Link></p>
                    <p><Link to="/user/signup">{not_yet_registered(ct.lang)}</Link></p>
                </form>
            :
                <>
                    <span id="btn_logout" className="a" onClick={logout}>{icon_logout}</span>

                    <AccountEditor account_data={props.account_data} set_account_data={props.set_account_data} user_rank={props.user_rank} set_user_rank={props.set_user_rank} />
                    <span className="divider"></span>
                    <ArticlesByAuthor author={props.account_data._id} categories={props.categories} />
                </>}
        </main>
    );
};

export default UserPanel;

