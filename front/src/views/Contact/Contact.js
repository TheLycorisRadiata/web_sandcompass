import SocialMedia from '../../assets/components/SocialMedia';
import './Contact.css';

const Contact = () => 
{
    return (
        <main>
            <h1>Contact</h1>

            <SocialMedia />

            <section id="contact_form">
                <h2>Something to say?</h2>
                <form method="post" action="">
                    <p>
                        <label htmlFor="visitor_name">Your name:</label>
                        <input type="text" name="visitor_name" id="visitor_name" placeholder="John Smith" autoFocus autoComplete="on" required />
                    </p>
                    <p>
                        <label htmlFor="visitor_email">Your email address:</label>
                        <input type="email" name="visitor_email" id="visitor_email" placeholder="john.smith@email.com" autoComplete="on" required />
                    </p>
                    <p>
                        <label htmlFor="message_subject">Subject:</label>
                        <select name="message_subject" id="message_subject" defaultValue="default" autoComplete="off" required>
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
                    </p>
                    <p>
                        <label htmlFor="message_content">Message:</label><br />
                        <textarea name="message_content" id="message_content" rows="10" cols="50" required autoComplete="off" 
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis hendrerit massa, eget egestas elit ultrices at."></textarea>
                    </p>
                    <p>
                        <input type="reset" name="btn_reset" id="btn_reset" value="Cancel" />
                        <input type="submit" name="btn_send" id="btn_send" value="Send" />
                    </p>
                </form>
            </section>
        </main>
    );
};

export default Contact;

