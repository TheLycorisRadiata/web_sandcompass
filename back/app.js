const express = require('express');
const router_connection = require('./routes/connection.route.js');
const router_blog = require('./routes/blog.route.js');

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

app.use('/connection', router_connection);
app.use('/blog', router_blog);

app.get('/*', (req, res) => 
{
	res.status(404).json({ status: 404, title: 'Page Not Found', message: 'I\'m sorry, this page doesn\'t exist.' });
});

module.exports = app;

