import {useState} from 'react';
import {Link} from 'react-router-dom'
import '../styles/ControlPanel.css';

const ControlPanel = (props) => 
{
	const [username, set_username] = useState('');
	const [password, set_password] = useState('');
	const [back_title, set_back_title] = useState('');
	const [back_message, set_back_message] = useState('');
	const [back_status_code, set_back_status_code] = useState('');

	const handle_click = () => 
	{
		fetch('http://localhost:3001/connection/login/admin',
		{       
			method: 'post',
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
			{
				field_login_username: username,
				field_login_password: password
			})
		})
		.then(res => res.json())
		.then(json => 
		{
			set_back_title(json.title);
			set_back_message(json.message);

			if (json.status >= 400)
			{
				set_back_status_code('back_error');
				props.grant_access(false);
			}
			else
			{
				set_back_status_code('back_ok');
				props.grant_access(true);
			}
		});

		set_username('');
		set_password('');
	};

	const handle_key_press = (e) => 
	{
		if (e.key === 'Enter')
			handle_click();
	};

	return (
		<main>
			<h1>Control Panel</h1>

			<form>
				<input type="text" id="field_login_username" name="field_login_username" value={username} onChange={e => set_username(e.target.value)} placeholder="Username" 
					onKeyPress={handle_key_press} autoFocus autoComplete="on" required />
				<input type="password" id="field_login_password" name="field_login_password" value={password} onChange={e => set_password(e.target.value)} placeholder="Password" 
					onKeyPress={handle_key_press} autoComplete="on" required />
				<input type="button" id="btn_login" name="btn_login" value="Log In" onClick={handle_click} />
			</form>

			{back_title !== '' && back_message !== '' && 
			<>
				<p id="back_talks">
					<strong id={back_status_code}>{back_title}</strong><br />
					{back_message}

					{back_status_code === 'back_ok' && 
					<p id="go_to_blogeditor" className="page_numbers"><Link to="/controlpanel/blogeditor">Blog Editor</Link></p>}
				</p>

			</>}
		</main>
	);
};

export default ControlPanel;

