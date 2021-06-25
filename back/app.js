const express = require('express');

const app = express();

const cors = (req, res, next) =>
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
};

app.use(cors);
app.use(express.json());

app.get('/', (req, res) => 
{
	res.status(200).json({ message: 'Hello world!' });
});

app.post('/', (req, res) => 
{
	const valid_username = 'playground';
	const valid_password = 'bocal';

	if (req.body.field_login_username == '' && req.body.field_login_password == '')
	{
		res.status(401).json({ status: 401, title: 'Access Denied', message: 'Don\'t you have too much faith in me? I know that my telepathic skills are well-renowned, but I still need some information, buddy.'});
	}
	else if (req.body.field_login_username == '')
	{
		res.status(401).json({ status: 401, title: 'Access Denied', message: 'You\'re talking to me? You\'re talking to me? Wait, who\'s talking?'});
	}
	else if (req.body.field_login_password == '')
	{
		res.status(401).json({ status: 401, title: 'Access Denied', message: 'Alakazam! Open, sesame! Alohomora! Nope... Nothing. I think you still need the good ol\' password. Are you sure you\'re a wizard? Definitely not a gentoomen wizard, that\'s for sure, if you\'re stuck at my piss poor login screen.'});
	}
	else if (req.body.field_login_username.toLowerCase() != valid_username && req.body.field_login_password != valid_password)
	{
		res.status(401).json({ status: 401, title: 'Access Denied', message: 'Nope. Sorry buddy. Your username and password are both incorrect. Now, if you can\'t process further, let me tell you about fishes... Did you know that I am a Pisces? Oh, on the subject of fishes, we could also go speak about Jesus. I don\'t know much about Jesus. Do you? Why was he linked to fishes? I think it had to do with secret Christian gatherings, and they... Carved fishes, a fish? Onto walls to mark these secret places and guide their brethens into safety. Or something. My memory is quite fuzzy on this. Speaking of fuzzy, I really want to learn machine learning...' });
	}
	else if (req.body.field_login_username.toLowerCase() != valid_username)
	{
		res.status(401).json({ status: 401, title: 'Access Denied', message: 'Wrong username. Or is it wrong name? Was it your name, that you entered? If it was mine, I have to tell you that it won\'t work, as I\'m not a person (ermahgerd robot uprising eipfjzĵâzaxẑ) (yes the bank that\'s been used to teach me speech is quite old) (and yes, another bracketed sentence). I think, maybe... What if... The username is actually not, a username?'});
	}
	else if (req.body.field_login_password != valid_password)
	{
		res.status(401).json({ status: 401, title: 'Access Denied', message: 'Your password is incorrect. And now you can\'t try again. Nah just kidding, I have all day. I mean, I don\'t. Someday, the files on the server will corrupt, the server itself will crumble, and no one will be there to remember where the copy is, maybe the copy itself will be gone. Civilisation will be gone. So we don\'t have all day, but... I think that today will go just fine. What am I talking about again? Oh, you don\'t know the password. Then you shall not pass.'});
	}
	else
	{
		res.status(200).json({ status: 200, title: 'Access Granted', message: 'Welcome home... You.' });
	}
});

app.get('/*', (req, res) => 
{
	res.status(404).json({ status: 404, title: 'Page Not Found', message: 'I\'m sorry, this page doesn\'t exist.' });
});

module.exports = app;

