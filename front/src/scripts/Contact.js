import '../styles/Contact.css';
import Logo_Patreon from '../images/logo_patreon.png';
import Logo_YouTube from '../images/logo_youtube.png';
import Logo_GitHub from '../images/logo_github.png';
import Logo_Reddit from '../images/logo_reddit.png';

const Contact = () => 
{
	return (
		<main>
			<h1>Contact</h1>

			<section id="contact_socials">
				<h2>Social Media</h2>
				<ul>
					<li className="logo">
						<a href="https://www.patreon.com/thelycorisradiata" rel="noreferrer" target="_blank">
							<img src={Logo_Patreon} alt="Logo Patreon" title="My Patreon page" /></a>
					</li>
					<li className="logo">
						<a href="https://www.youtube.com/channel/UCowO_RtloSQ3qnKmvymsBRA" rel="noreferrer" target="_blank">
							<img src={Logo_YouTube} alt="Logo YouTube" title="My YouTube channel" /></a>
					</li>
					<li className="logo">
						<a href="https://github.com/thelycorisradiata" rel="noreferrer" target="_blank">
							<img src={Logo_GitHub} alt="Logo Github" title="My GitHub account" /></a>
					</li>
					<li className="logo">
						<a href="https://www.reddit.com/user/thelycorisradiata" rel="noreferrer" target="_blank">
							<img src={Logo_Reddit} alt="Logo Reddit" title="My Reddit account" /></a>
					</li>
				</ul>
			</section>

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
						<select name="message_subject" id="message_subject" autoComplete="off" required>
							<option disabled selected>Select a subject</option>
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

