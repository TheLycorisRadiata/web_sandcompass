import '../styles/ControlPanel.css';

const ControlPanel = () => 
{
	return (
		<main>
			<h1>Control Panel</h1>
			<input type="text" id="field_login_username" name="field_login_username" placeholder="Username" required />
			<input type="password" id="field_login_password" name="field_login_password" placeholder="Password" required />
			<input type="button" id="btn_login" name="btn_login" value="Log In" />
		</main>
	);
};

export default ControlPanel;

