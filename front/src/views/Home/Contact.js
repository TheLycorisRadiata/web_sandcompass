import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import {
    contact, something_to_say, 
    personal, professional, optional_business_name, 
    name, email_address, message, select_subject, 
    opt_projects, opt_cosmic_dust, opt_persistence, opt_another_project, 
    opt_misc, opt_this_website, opt_legal_stuff, opt_other, 
    cancel, send 
} from '../../assets/functions/lang';
import SocialMedia from '../../assets/components/SocialMedia';
import { backend } from '../../../package.json';

const Contact = () => 
{
    const ct = useContext(AppContext);
    const [is_visitor_pro, set_is_visitor_pro] = useState(false);

    const handle_contact = (e) => 
    {
        // Radio buttons: e.target[0].checked + e.target[1].checked
        let business_name = e.target[2].value;
        let name = e.target[3].value;
        let email_address = e.target[4].value;
        let subject = e.target[5].value;
        let message = e.target[6].value;

        if (!is_visitor_pro)
        {
            business_name = '';
            name = e.target[2].value;
            email_address = e.target[3].value;
            subject = e.target[4].value;
            message = e.target[5].value;
        }

        e.preventDefault();

        if (name !== '' && email_address !== '' && subject !== 'default' && message !== '')
        {
            fetch(`${backend}/mailing/${ct.lang}/contact`,
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
                    business_name: business_name,
                    name: name,
                    email_address: email_address,
                    subject: subject,
                    message: message
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                /* If unsuccessful, the fields remain filled as to allow the user to try sending the message again */
                if (json.is_success)
                {
                    set_is_visitor_pro(false);
                    e.target[0].checked = true;
                    e.target[1].checked = false;
                    e.target[2].value = '';
                    e.target[3].value = '';
                    e.target[4].value = 'default';
                    e.target[5].value = '';
                }
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <main>
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
                    <input type="text" name="name" placeholder={name(ct.lang)} autoComplete="on" required autoFocus />
                    <input type="email" name="email_address" placeholder={email_address(ct.lang)} autoComplete="on" required />

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

                    <textarea name="message" placeholder={message(ct.lang)} autoComplete="new-password" required></textarea>

                    <div>
                        <input type="reset" className="button" value={cancel(ct.lang)} onClick={() => set_is_visitor_pro(false)} />
                        <input type="submit" className="button" value={send(ct.lang)} />
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Contact;

