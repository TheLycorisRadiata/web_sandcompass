import { useHistory } from 'react-router-dom';
import { parse_username } from '../../assets/functions/parsing';
import { send_registration_email, send_newsletter_email } from '../../assets/functions/mailing';
import { backend } from '../../../package.json';

const SignUp = () => 
{
    const history = useHistory();

    const handle_registration = async (e) =>
    {
        const email_address = e.target[0].value;
        const repeat_email_address = e.target[1].value;
        const password = e.target[2].value;
        const newsletter = e.target[4].checked;

        let username = e.target[3].value;
        let obj_parse_username;

        e.preventDefault();

        if (email_address !== '' && repeat_email_address !== '' && password !== '' && username !== '')
        {
            if (email_address !== repeat_email_address)
            {
                alert('The same email address is asked in both fields.');
                return;
            }

            obj_parse_username = parse_username(username);
            if (!obj_parse_username.user_approves)
                return;
            else
                username = obj_parse_username.parsed_username;

            fetch(backend + '/user/create',
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
                    password: password,
                    username: username,
                    newsletter: newsletter
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                alert(json.message);
                if (json.is_success)
                {
                    e.target[0].value = '';
                    e.target[1].value = '';
                    e.target[2].value = '';
                    e.target[3].value = '';
                    e.target[4].checked = false;
                }

                // The account already existed and the user simply subscribed to the newsletter
                if (json.send_newsletter_email)
                    send_newsletter_email(json.user_id, email_address);
                // The account has just been created
                else if (json.is_success)
                    send_registration_email(email_address);

                if (json.is_success)
                    history.push('/');
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <main>
            <h1 className="title">Sign Up</h1>
            <form onSubmit={handle_registration}>
                <input type="email" name="email_address" placeholder="Email address" autoComplete="on" required autoFocus />
                <input type="email" name="repeat_email_address" placeholder="Repeat the email address" autoComplete="on" required />
                <input type="password" name="password" placeholder="Password" autoComplete="new-password" required />
                <input type="text" name="username" placeholder="Username" autoComplete="on" required />
                <div className="div_pointer">
                    <input type="checkbox" id="newsletter" name="newsletter" />
                    <label htmlFor="newsletter">Subscribe to the newsletter</label>
                </div>

                <div>
                    <input type="reset" className="button" value="Cancel" />
                    <input type="submit" className="button" value="Confirm" />
                </div>
            </form>
        </main>
    );
};

export default SignUp;

