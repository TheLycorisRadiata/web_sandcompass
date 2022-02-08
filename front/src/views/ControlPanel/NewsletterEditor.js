import { useState, useContext } from 'react';
import Parser from 'html-react-parser';
import { AppContext } from '../../App';
import {
    newsletter_editor, access_denied, refresh_newsletters, 
    select_newsletter, write_new_newsletter, sent, not_sent, 
    confirm, send_newsletter, object, message, 
    select_language, dynamic_language, english, french, japanese, 
    info_language, info_object, info_date, info_message, 
    disclaimer_obj_and_msg, disclaimer_language 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { date_in_letters, time } from '../../assets/functions/time';
import package_info from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_fetch = <FontAwesomeIcon icon={faRedoAlt} />;

const NewsletterEditor = (props) => 
{
    const ct = useContext(AppContext);

    const [newsletters, set_newsletters] = useState([]);
    const [selected_newsletter, set_selected_newsletter] = useState('default');
    const [field_object, set_field_object] = useState('');
    const [html_message, set_html_message] = useState('<hr /><h1 style="text-align: center;">Hello world!</h1><hr /><p>Lorem ipsum</p>');
    const [language, set_language] = useState('default');
    const [checkbox, set_checkbox] = useState(false);

    const fetch_newsletters = (trigger_alert) => 
    {
        fetch(`${package_info.api}/mailing/${ct.lang}/newsletter/all`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);
            if (trigger_alert)
                alert(json.message);
            set_newsletters(json.data);
        })
        .catch(err => console.log(err));
    };
    
    const clear_form = () => 
    {
        set_selected_newsletter('default');
        set_field_object('');
        set_html_message('<hr /><h1 style="text-align: center;">Hello world!</h1><hr /><p>Lorem ipsum</p>');
        set_language('default');
        set_checkbox(false);
    };

    const handle_select = e => 
    {
        const option = e.target.value;

        if (option === 'new')
            clear_form();
        else if (option !== 'default')
        {
            set_field_object(newsletters[option].object);
            set_html_message(newsletters[option].html_message);
            set_language(newsletters[option].language);
            set_checkbox(false);
        }

        set_selected_newsletter(option);
    };

    const handle_submit = e => 
    {
        // e.target[0].value --> selected_newsletter
        const newsletter = 
        {
            object: e.target[1].value,
            html_message: e.target[2].value,
            language: e.target[3].value,
            do_send: e.target[4].checked,
            _id: selected_newsletter === 'new' ? null : newsletters[selected_newsletter]._id
        };

        e.preventDefault();

        if (newsletter.object === '' || newsletter.html_message === '')
            alert(disclaimer_obj_and_msg(ct.lang));
        else if (newsletter.language === 'default')
            alert(disclaimer_language(ct.lang));
        else
        {
            fetch(`${package_info.api}/mailing/${ct.lang}/newsletter/send`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newsletter: newsletter })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                alert(json.message);
                
                if (json.is_success)
                {
                    clear_form();
                    fetch_newsletters(false);
                }
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <main>
            <h1 className="title">{newsletter_editor(ct.lang)}</h1>
            {!props.is_access_granted ?
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <div id="newsletter_editor">
                <button className="button" title={refresh_newsletters(ct.lang)} onClick={() => fetch_newsletters(true)}><span className="icon">{icon_fetch}</span></button>
    
                <form onSubmit={handle_submit}>
                    <select defaultValue="default" onChange={handle_select}>
                        <option value="default" disabled>{select_newsletter(ct.lang)}</option>
                        <option value="new">{write_new_newsletter(ct.lang)}</option>
                        {newsletters.map((e, i) => 
                            <option key={"newsletter_" + i} value={i}>[{dynamic_language(ct.lang, e.language)}] {e.is_sent ? sent(ct.lang) : not_sent(ct.lang)} {e.object}</option>)}
                    </select>

                    {selected_newsletter === 'default' ?
                        null
                    : selected_newsletter === 'new' || !newsletters[selected_newsletter].is_sent ?
                        <>
                            <input type="text" name="object" placeholder={object(ct.lang)} title={object(ct.lang)} value={field_object} onChange={e => set_field_object(e.target.value)} />
                            <textarea placeholder={message(ct.lang)} title={message(ct.lang)} value={html_message} onChange={e => set_html_message(e.target.value)}></textarea>

                            <div id="preview_newsletter">{Parser(html_message)}</div>

                            <select value={language} onChange={e => set_language(e.target.value)}>
                                <option value="default" disabled>{select_language(ct.lang)}</option>
                                <option value="0">{english(ct.lang)}</option>
                                <option value="1">{french(ct.lang)}</option>
                                <option value="2">{japanese(ct.lang)}</option>
                            </select>

                            <div className="div_pointer">
                                <input type="checkbox" name="send" id="send" checked={checkbox} onChange={() => set_checkbox(checkbox ? false : true)} />
                                <label htmlFor="send">{send_newsletter(ct.lang)}</label>
                            </div>

                            <input type="submit" className="button" value={confirm(ct.lang)} />
                        </>
                    : 
                        <div>
                            <p><strong>{info_language(ct.lang)}</strong>{dynamic_language(ct.lang, newsletters[selected_newsletter].language)}</p>
                            <p><strong>{info_object(ct.lang)}</strong>{newsletters[selected_newsletter].object}</p>
                            <p><strong>{info_date(ct.lang)}</strong>{date_in_letters(ct.lang, newsletters[selected_newsletter].date)} at {time(newsletters[selected_newsletter].date, true)}</p>
                            <p><strong>{info_message(ct.lang)}</strong></p>
                            <div id="preview_newsletter">{Parser(newsletters[selected_newsletter].html_message)}</div>
                        </div>}
                </form>
            </div>}
        </main>
    );
};

export default NewsletterEditor;

