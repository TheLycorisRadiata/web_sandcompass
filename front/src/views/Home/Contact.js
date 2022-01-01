import { useState } from 'react';
import SocialMedia from '../../assets/components/SocialMedia';
import { url_api } from '../../config.json';

const Contact = () => 
{
    const [is_visitor_pro, set_is_visitor_pro] = useState(false);

    const handle_contact = (e) => 
    {
        // Radio buttons: e.target[0].checked + e.target[1].checked
        let business_name = e.target[2].value;
        let last_name = e.target[3].value;
        let first_name = e.target[4].value;
        let email_address = e.target[5].value;
        let subject = e.target[6].value;
        let message = e.target[7].value;

        if (!is_visitor_pro)
        {
            business_name = '';
            last_name = e.target[2].value;
            first_name = e.target[3].value;
            email_address = e.target[4].value;
            subject = e.target[5].value;
            message = e.target[6].value;
        }

        e.preventDefault();

        if (last_name !== '' && first_name !== '' && email_address !== '' && subject !== 'default' && message !== '')
        {
            fetch(url_api + '/mailing/contact',
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
                    last_name: last_name,
                    first_name: first_name,
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
                    e.target[4].value = '';
                    e.target[5].value = 'default';
                    e.target[6].value = '';
                }
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <main>
            <h1>Contact</h1>

            <SocialMedia />

            <section id="contact_form">
                <h2>Something to say?</h2>
                <form onSubmit={handle_contact}>
                    <div>
                        <input type="radio" name="visitor_type" value="personal" id="btn_pers" defaultChecked onClick={() => set_is_visitor_pro(false)} />
                        <label htmlFor="btn_pers">{' '}Particulier</label>
                    </div>
                    <div>
                        <input type="radio" name="visitor_type" value="professional" id="btn_pro" onClick={() => set_is_visitor_pro(true)} />
                        <label htmlFor="btn_pro">{' '}Professionnel</label>
                    </div>
                    {is_visitor_pro && <input type="text" name="business_name" placeholder="Business name (optional)" autoComplete="on" />}
                    <input type="text" name="last_name" placeholder="Last name" autoComplete="on" required autoFocus />
                    <input type="text" name="first_name" placeholder="First name" autoComplete="on" required />
                    <input type="email" name="email_address" placeholder="Email address" autoComplete="on" required />

                    <select name="subject" defaultValue="default" autoComplete="new-password" required>
                        <option disabled value="default">Select a subject</option>
                        <optgroup label="Projects">
                            <option value="subject_work_cosmic_dust">Book: Cosmic Dust</option>
                            <option value="subject_work_persistence">Game: Persistence</option>
                            <option value="subject_work_other">Another project</option>
                        </optgroup>
                        <optgroup label="Miscellaneous">
                            <option value="subject_website">This website</option>
                            <option value="subject_legal">Legal stuff</option>
                            <option value="subject_other">Other</option>
                        </optgroup>
                    </select>

                    <textarea name="message" placeholder="Message" autoComplete="new-password" required></textarea>

                    <div>
                        <input type="reset" className="btn" value="Cancel" onClick={() => set_is_visitor_pro(false)} />
                        <input type="submit" className="btn" value="Send" />
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Contact;

