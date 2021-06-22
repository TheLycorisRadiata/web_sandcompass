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

app.get('/*', (req, res) => 
{
	res.status(404).json({ message: 'Page not found.' });
});

module.exports = app;

