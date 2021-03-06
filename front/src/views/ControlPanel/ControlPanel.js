import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    control_panel, default_desc, email_address, password, stay_logged_in_for_30_days, log_in, log_out, password_forgotten, disclaimer_email_and_password, 
    statistics, faq_editor, product_manager, blog_editor, newsletter_editor 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faEye, faEyeSlash, faFileAlt, faComment, faCartShopping, faQuoteRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import AccountEditor from '../../assets/components/AccountEditor';
import ArticlesByAuthor from '../../assets/components/ArticlesByAuthor';
import { handle_required_field } from '../../assets/functions/parsing';
import package_info from '../../../package.json';

const icon_logout = <FontAwesomeIcon icon={faSquareXmark} />;
const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
const icon_stats = <FontAwesomeIcon icon={faFileAlt} />;
const icon_faq = <FontAwesomeIcon icon={faComment} />;
const icon_product = <FontAwesomeIcon icon={faCartShopping} />;
const icon_blog = <FontAwesomeIcon icon={faQuoteRight} />;
const icon_newsletter = <FontAwesomeIcon icon={faEnvelope} />;

const ControlPanel = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = control_panel(ct.lang) + ' | Mofumofu';
    document.querySelector('meta[name="description"]').setAttribute('content', default_desc(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', control_panel(ct.lang) + ' | Mofumofu');
    document.querySelector('meta[property="og:description"]').setAttribute('content', default_desc(ct.lang));

    const [field_email_address, set_field_email_address] = useState('');
    const [field_password, set_field_password] = useState('');
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [stay_logged_in, set_stay_logged_in] = useState(false);
    const [access_message, set_access_message] = useState('');

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

    const handle_submit = () => 
    {
        let is_any_required_field_empty = false;
        if (!handle_required_field('email_address'))
            is_any_required_field_empty = true;
        if (!handle_required_field('password'))
            is_any_required_field_empty = true;

        if (is_any_required_field_empty)
            set_access_message(disclaimer_email_and_password(ct.lang));
        else
        {
            fetch(`${package_info.api}/user/${ct.lang}/admin/login/${field_email_address}/${field_password}/${stay_logged_in}`)
            .then(res => res.json())
            .then(json => 
            {
                //if (json.message !== '')
                    //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                set_access_message(json.message);
                props.set_account_data(json.account_data);
                props.set_is_access_granted(json.is_success);

                if (json.token_stay_logged_in_30_days)
                {
                    document.cookie = 'token=' + encodeURIComponent(json.token_stay_logged_in_30_days) + '; path=/; domain=' 
                        + encodeURIComponent(package_info.domain) + '; samesite=lax; secure; max-age=2592000';

                    document.cookie = 'id=' + encodeURIComponent(json.id) + '; path=/; domain=' 
                        + encodeURIComponent(package_info.domain) + '; samesite=lax; secure; max-age=2592000';
                }
                else if (json.token_stay_logged_in_2h)
                {
                    document.cookie = 'token=' + encodeURIComponent(json.token_stay_logged_in_2h) + '; path=/; domain=' 
                        + encodeURIComponent(package_info.domain) + '; samesite=lax; secure; max-age=3600';

                    document.cookie = 'id=' + encodeURIComponent(json.id) + '; path=/; domain=' 
                        + encodeURIComponent(package_info.domain) + '; samesite=lax; secure; max-age=3600';
                }
            });
        }

    };

    const handle_key_press = e => 
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
            document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.is_access_granted]);

    const logout = () => 
    {
        const id_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const id_account = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        // Make a request so login tokens can be deleted
        fetch(`${package_info.api}/token/${ct.lang}/login/${id_token}/${id_account}/${props.account_data?._id}`,
        {
            method: 'DELETE'
        })
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
            <h1 className="title">{control_panel(ct.lang)}</h1>
            {!props.is_access_granted ?
            <>
                <form>
                    <input type="text" name="email_address" placeholder={email_address(ct.lang)} value={field_email_address} onChange={e => set_field_email_address(e.target.value)} 
                        onKeyPress={handle_key_press} autoComplete="on" autoFocus />

                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder={password(ct.lang)} value={field_password} onChange={e => set_field_password(e.target.value)} 
                            onKeyPress={handle_key_press} autoComplete="on" />
                        <span id="eye1" className="btn_eye_closed" onClick={handle_click_password_eye}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>

                    <div className="div_pointer">
                        <input type="checkbox" name="stay_logged_in" id="stay_logged_in" value={stay_logged_in} onChange={() => set_stay_logged_in(!stay_logged_in)} />
                        <label htmlFor="stay_logged_in">{stay_logged_in_for_30_days(ct.lang)}</label>
                    </div>

                    <input type="button" className="button" name="btn_login" value={log_in(ct.lang)} onClick={handle_submit} />
                    {access_message !== '' && <p>{access_message}</p>}
                    <p><Link to="/password">{password_forgotten(ct.lang)}</Link></p>
                </form>
            </>
            :
            <>
                <span id="btn_logout" className="a" title={log_out(ct.lang)} onClick={logout}>{icon_logout}</span>

                <div id="control_panel_buttons">
                    <Link to="/admin/stats"><button className="button"><span className="icon">{icon_stats}</span> {statistics(ct.lang)}</button></Link>
                    <Link to="/admin/faq"><button className="button"><span className="icon">{icon_faq}</span> {faq_editor(ct.lang)}</button></Link>
                    <Link to="/admin/product"><button className="button"><span className="icon">{icon_product}</span> {product_manager(ct.lang)}</button></Link>
                    <Link to="/admin/blog"><button className="button"><span className="icon">{icon_blog}</span> {blog_editor(ct.lang)}</button></Link>
                    <Link to="/admin/newsletter"><button className="button"><span className="icon">{icon_newsletter}</span> {newsletter_editor(ct.lang)}</button></Link>
                </div>

                <span className="divider"></span>
                <AccountEditor account_data={props.account_data} set_account_data={props.set_account_data} rank={props.admin_rank} set_rank={props.set_admin_rank} />
                <span className="divider"></span>
                <ArticlesByAuthor author={props.account_data._id} categories={props.categories} />
            </>}
        </main>
    );
};

export default ControlPanel;

