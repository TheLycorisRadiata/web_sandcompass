import { useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import {
    statistics, access_denied, log_out, refresh_stats, click_for_stats, admin_not_counted, 
    info_verified_users, info_newsletter_subscribers, info_english_users, info_french_users, info_japanese_users, 
    simple_stat, slash_stat, percentage_on_all_users, percentage_on_verified_users 
} from '../../assets/functions/lang';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faSquareXmark, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_logout = <FontAwesomeIcon icon={faSquareXmark} />;
const icon_fetch = <FontAwesomeIcon icon={faRedoAlt} />;

const Stats = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = statistics(ct.lang) + ' | Mofumofu';
    document.querySelector('meta[name="description"]').setAttribute('content', access_denied(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', statistics(ct.lang) + ' | Mofumofu');
    document.querySelector('meta[property="og:description"]').setAttribute('content', access_denied(ct.lang));

    const [stats, set_stats] = useState(null);

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

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

    const handle_click = e => 
    {
        const id_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const id_account = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        e.preventDefault();

        fetch(`${package_info.api}/user/${ct.lang}/stats/all/${id_token}/${id_account}`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);

            if (json.is_success)
                set_stats(json.data);
        });
        //.catch(err => console.log(err));
    };

    return (
        <main>
            <h1 className="title">{statistics(ct.lang)}</h1>
            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <div id="stats">
                <span id="btn_logout" className="a" title={log_out(ct.lang)} onClick={logout}>{icon_logout}</span>

                <button className="button" title={refresh_stats(ct.lang)} onClick={handle_click}><span className="icon">{icon_fetch}</span></button>

                <ul>
                    {!stats ? 
                    <>
                        <li>{click_for_stats(ct.lang)}</li>
                        <li>{admin_not_counted(ct.lang)}</li>
                    </>
                    : !stats.accounts.verified_user ? 
                    <>
                        <li><strong>{info_verified_users(ct.lang)}</strong>{slash_stat(ct.lang, 0, stats.accounts.total)}</li>
                        <li><strong>{info_newsletter_subscribers(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.newsletter)}</li>
                        <li><strong>{info_english_users(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.language.english)}</li>
                        <li><strong>{info_french_users(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.language.french)}</li>
                        <li><strong>{info_japanese_users(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.language.japanese)}</li>
                    </>
                    :
                    <>
                        <li title={percentage_on_all_users(ct.lang, stats.accounts.verified_user * 100 / stats.accounts.total)}>
                            <strong>{info_verified_users(ct.lang)}</strong>{slash_stat(ct.lang, stats.accounts.verified_user, stats.accounts.total)}</li>
                        <li title={percentage_on_verified_users(ct.lang, stats.accounts.newsletter * 100 / stats.accounts.verified_user)}>
                            <strong>{info_newsletter_subscribers(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.newsletter)}</li>
                        <li title={percentage_on_verified_users(ct.lang, stats.accounts.language.english * 100 / stats.accounts.verified_user)}>
                            <strong>{info_english_users(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.language.english)}</li>
                        <li title={percentage_on_verified_users(ct.lang, stats.accounts.language.french * 100 / stats.accounts.verified_user)}>
                            <strong>{info_french_users(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.language.french)}</li>
                        <li title={percentage_on_verified_users(ct.lang, stats.accounts.language.japanese * 100 / stats.accounts.verified_user)}>
                            <strong>{info_japanese_users(ct.lang)}</strong>{simple_stat(ct.lang, stats.accounts.language.japanese)}</li>
                    </>}
                </ul>
            </div>}
        </main>
    );
};

export default Stats;

