const express = require('express');
const router_blog = require('./routes/blog');
const router_mailing = require('./routes/mailing');
const router_user = require('./routes/user');
const router_rank = require('./routes/rank');
const router_currency = require('./routes/currency');

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
app.use('/api/mailing', router_mailing);
app.use('/api/user', router_user);
app.use('/api/rank', router_rank);
app.use('/api/currency', router_currency);

/* Static service of the front-end app's files */
//app.use(express.static('./public'));

/* Home page route */
//app.get('/*', (req, res) => res.sendFile('./public/index.html', { root: '.' }));

module.exports = app;

