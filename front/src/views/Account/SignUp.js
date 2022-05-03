import { useState, useContext } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    sign_up, 
    email_address, repeat_email, password, username, 
    sub_newsletter, disclaimer_email, cancel, confirm, 
    accept_login_cookie 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { handle_required_field, parse_username } from '../../assets/functions/parsing';
import { send_registration_email } from '../../assets/functions/mailing';
import package_info from '../../../package.json';

const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

const SignUp = (props) => 
{
    const ct = useContext(AppContext);
    const history = useHistory();

    // HTML standard meta tags
    document.title = sign_up(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', sub_newsletter(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', sign_up(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', sub_newsletter(ct.lang));

    const [message, set_message] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);

    const handle_click_password_eye = () => 
    {
        const eye_button = document.getElementById('eye1');
        const required_class = eye_button.classList.contains('required');

        set_is_password_shown(!is_password_shown);

        // "!is_password_shown" because the state is not yet updated
        eye_button.className = !is_password_shown ? 'btn_eye_open' : 'btn_eye_closed';
        if (required_class)
            eye_button.classList.add('required');
    };

    const reset_required_fields = () => 
    {
        document.querySelector('input[name="email_address"]').classList.remove('required');
        document.querySelector('input[name="repeat_email_address"]').classList.remove('required');
        document.querySelector('input[name="password"]').classList.remove('required');
        document.getElementById('eye1').classList.remove('required');
        document.querySelector('input[name="username"]').classList.remove('required');
    };

    const handle_reset = () => reset_required_fields();

    const handle_registration = async (e) =>
    {
        const email_address = e.target[0].value;
        const repeat_email_address = e.target[1].value;
        const chosen_password = e.target[2].value;
        const newsletter = e.target[4].checked;

        let username = e.target[3].value;
        let obj_parse_username;
        let is_any_required_field_empty = false;
        let user_accepts_cookie = false;

        e.preventDefault();

        if (!handle_required_field('email_address'))
            is_any_required_field_empty = true;
        if (!handle_required_field('repeat_email_address'))
            is_any_required_field_empty = true;
        if (!handle_required_field('password'))
            is_any_required_field_empty = true;
        if (!handle_required_field('username'))
            is_any_required_field_empty = true;

        if (!is_any_required_field_empty)
        {
            if (email_address === repeat_email_address)
            {
                document.querySelector('input[name="email_address"]').classList.remove('required');
                document.querySelector('input[name="repeat_email_address"]').classList.remove('required');
            }
            else
            {
                document.querySelector('input[name="email_address"]').classList.add('required');
                document.querySelector('input[name="repeat_email_address"]').classList.add('required');
                set_message(disclaimer_email(ct.lang));
                return;
            }

            obj_parse_username = await parse_username(ct, username);
            if (!obj_parse_username.user_approves)
                return;
            else
                username = obj_parse_username.parsed_username;

            user_accepts_cookie = await ct.popup('confirm', ct.lang, accept_login_cookie(ct.lang));
            if (user_accepts_cookie)
            {
                fetch(`${package_info.api}/user/${ct.lang}/create`,
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
                        password: chosen_password,
                        username: username,
                        newsletter: newsletter,
                        language: ct.lang
                    })
                })
                .then(res => res.json())
                .then(json => 
                {
                    //console.log(json.message);
                    set_message(json.message);
                    if (json.is_success)
                    {
                        e.target[0].value = '';
                        e.target[1].value = '';
                        e.target[2].value = '';
                        e.target[3].value = '';
                        e.target[4].checked = false;

                        send_registration_email(ct, email_address);
                        history.push('/');
                    }
                });
                //.catch(err => console.log(err));
            }
        }
    };

    return (
        <main id="sign_up">
            <h1 className="title">{sign_up(ct.lang)}</h1>
            <p className="txt_centered">{message}</p><p></p>
            <form onSubmit={handle_registration}>
                <input type="email" name="email_address" placeholder={email_address(ct.lang)} autoComplete="on" autoFocus />
                <input type="email" name="repeat_email_address" placeholder={repeat_email(ct.lang)} autoComplete="on" />

                <div className="field_password">
                    <input type={is_password_shown ? "text" : "password"} name="password" placeholder={password(ct.lang)} autoComplete="new-password" />
                    <span id="eye1" className="btn_eye_closed" onClick={handle_click_password_eye}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                </div>

                <input type="text" name="username" placeholder={username(ct.lang)} autoComplete="on" />
                <div className="div_pointer">
                    <input type="checkbox" id="newsletter" name="newsletter" defaultChecked={props.location.state?.user_wants_newsletter} />
                    <label htmlFor="newsletter">{sub_newsletter(ct.lang, false)}</label>
                </div>

                <div>
                    <input type="reset" className="button" value={cancel(ct.lang)} onClick={handle_reset} />
                    <input type="submit" className="button" value={confirm(ct.lang)} />
                </div>
            </form>
        </main>
    );
};

/*
    The component is exported with "withRouter" so props.location.state can be read.
    This props state is either sent from the newsletter button on the Home page, or not at all which would make it "undefined".
*/
export default withRouter(SignUp);

