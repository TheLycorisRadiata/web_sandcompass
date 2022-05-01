import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import {
    contact, social_media, something_to_say, 
    personal, professional, optional_business_name, 
    name, email_address, write_message_with_markdown, markdown_cheat_sheet_link, message, select_subject, 
    opt_projects, opt_cosmic_dust, opt_persistence, opt_another_project, 
    opt_misc, opt_this_website, opt_legal_stuff, opt_other, 
    cancel, send 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SocialMedia from '../../assets/components/SocialMedia';
import package_info from '../../../package.json';

// Markdown editor
import Yamde from 'yamde';

const icon_info = <FontAwesomeIcon icon={faInfoCircle} />;

const Contact = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = contact(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', social_media(ct.lang) + ' - ' + contact(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', contact(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', social_media(ct.lang) + ' - ' + contact(ct.lang));

    const [is_visitor_pro, set_is_visitor_pro] = useState(false);
    const [use_markdown, set_use_markdown] = useState(false);
    const [message_content, set_message_content] = useState('');

    const reset_state = () => 
    {
        set_is_visitor_pro(false);
        set_use_markdown(false);
        set_message_content('');
    };

    const handle_contact = (e) => 
    {
        // Radio buttons: e.target[0].checked + e.target[1].checked
        let field_business_name = e.target[2].value;
        let field_name = e.target[3].value;
        let field_email_address = e.target[4].value;
        let field_subject = e.target[5].value;

        if (!is_visitor_pro)
        {
            field_business_name = '';
            field_name = e.target[2].value;
            field_email_address = e.target[3].value;
            field_subject = e.target[4].value;
        }

        e.preventDefault();

        if (field_name !== '' && field_email_address !== '' && field_subject !== 'default' && message_content !== '')
        {
            fetch(`${package_info.api}/mailing/${ct.lang}/contact`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    is_pro: is_visitor_pro,
                    business_name: field_business_name,
                    name: field_name,
                    email_address: field_email_address,
                    subject: field_subject,
                    message: message_content
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                ct.popup('alert', ct.lang, json.message);

                /* If unsuccessful, the fields remain filled as to allow the user to try sending the message again */
                if (json.is_success)
                {
                    reset_state();
                    e.target[0].checked = true;
                    e.target[1].checked = false;
                    e.target[2].value = '';
                    e.target[3].value = '';
                    e.target[4].value = 'default';
                    e.target[5].checked = false;
                    e.target[6].value = '';
                }
            });
            //.catch(err => console.log(err));
        }
    };

    return (
        <main id="contact">
            <h1 className="title">{contact(ct.lang)}</h1>

            <SocialMedia />

            <section>
                <h2 className="sub_title">{something_to_say(ct.lang)}</h2>
                <form onSubmit={handle_contact}>
                    <div className="div_pointer">
                        <input type="radio" name="visitor_type" value="personal" id="btn_pers" defaultChecked onClick={() => set_is_visitor_pro(false)} />
                        <label htmlFor="btn_pers">{personal(ct.lang)}</label>
                    </div>
                    <div className="div_pointer">
                        <input type="radio" name="visitor_type" value="professional" id="btn_pro" onClick={() => set_is_visitor_pro(true)} />
                        <label htmlFor="btn_pro">{professional(ct.lang)}</label>
                    </div>
                    {is_visitor_pro && <input type="text" name="business_name" placeholder={optional_business_name(ct.lang)} autoComplete="on" />}
                    <input type="text" name="name" placeholder={name(ct.lang)} defaultValue={props.username} autoComplete="on" required autoFocus />
                    <input type="email" name="email_address" placeholder={email_address(ct.lang)} defaultValue={props.email} autoComplete="on" required />

                    <select name="subject" defaultValue="default" autoComplete="new-password" required>
                        <option disabled value="default">{select_subject(ct.lang)}</option>
                        <optgroup label={opt_projects(ct.lang)}>
                            <option value="subject_work_cosmic_dust">{opt_cosmic_dust(ct.lang)}</option>
                            <option value="subject_work_persistence">{opt_persistence(ct.lang)}</option>
                            <option value="subject_work_other">{opt_another_project(ct.lang)}</option>
                        </optgroup>
                        <optgroup label={opt_misc(ct.lang)}>
                            <option value="subject_website">{opt_this_website(ct.lang)}</option>
                            <option value="subject_legal">{opt_legal_stuff(ct.lang)}</option>
                            <option value="subject_other">{opt_other(ct.lang)}</option>
                        </optgroup>
                    </select>

                    <div className="div_pointer" id="checkbox_markdown">
                        <input type="checkbox" name="use_markdown" id="use_markdown" value={use_markdown} onChange={() => set_use_markdown(!use_markdown)} />
                        <label htmlFor="use_markdown">{write_message_with_markdown(ct.lang)}</label>
                        <a href={markdown_cheat_sheet_link(ct.lang)} rel="nofollow noreferrer" target="_blank"><span className="icon">{icon_info}</span></a>
                    </div>

                    {use_markdown ? 
                        <div className="markdown_editor">
                            <Yamde value={message_content} handler={set_message_content} theme="light" />
                        </div>
                    :
                        <textarea name="message" placeholder={message(ct.lang)} autoComplete="new-password" required 
                            value={message_content} onChange={e => set_message_content(e.target.value)}></textarea>}

                    <div>
                        <input type="reset" className="button" value={cancel(ct.lang)} onClick={reset_state} />
                        <input type="submit" className="button" value={send(ct.lang)} />
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Contact;

