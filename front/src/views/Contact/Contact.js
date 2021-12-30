import SocialMedia from '../../assets/components/SocialMedia';
import './Contact.css';
import { url_api } from '../../config.json';

const Contact = () => 
{
    const handle_contact = (e) => 
    {
        e.preventDefault();

        if (e.target[1].value !== '' && e.target[2].value !== '' && e.target[3].value !== '' && e.target[4].value !== 'default' && e.target[5].value !== '')
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
                    business_name: e.target[0].value,
                    last_name: e.target[1].value,
                    first_name: e.target[2].value,
                    email_address: e.target[3].value,
                    subject: e.target[4].value,
                    message: e.target[5].value
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                window.alert(json.message);

                /* json.error only exists if there's an error, and in such a case, the fields remain filled in order to allow the user to try sending the message again */
                if (json.error)
                    console.log(json.error);
                else
                {
                    e.target[0].value = '';
                    e.target[1].value = '';
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
            <h1>Contact</h1>

            <SocialMedia />

            <section id="contact_form">
                <h2>Something to say?</h2>
                <form onSubmit={handle_contact}>
                    <input type="text" name="business_name" placeholder="Business name (optional)" autoFocus autoComplete="on" />
                    <input type="text" name="last_name" placeholder="Last name" autoComplete="on" required />
                    <input type="text" name="first_name" placeholder="First name" autoComplete="on" required />
                    <input type="email" name="email_address" placeholder="Email address" autoComplete="on" required />

                    <select name="subject" defaultValue="default" autoComplete="off" required>
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

                    <textarea name="message" placeholder="Message" autoComplete="off" required></textarea>

                    <div>
                        <input type="reset" className="btn" value="Cancel" />
                        <input type="submit" className="btn" value="Send" />
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Contact;

