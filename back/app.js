const express = require('express');
const router_blog = require('./routes/blog');
const router_connection = require('./routes/connection');

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

/* API routes */
app.use('/api/blog', router_blog);
app.use('/api/connection', router_connection);

/* Static service of the front-end app's files */
//app.use(express.static('./public'));

/* Home page route */
//app.get('/*', (req, res) => res.sendFile('./public/index.html', { root: '.' }));

module.exports = app;

