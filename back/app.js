const express = require('express');
const { whitelist } = require('./package.json');
const router_language = require('./routes/language');
const router_file = require('./routes/file');
const router_blog = require('./routes/blog');
const router_faq = require('./routes/faq');
const router_mailing = require('./routes/mailing');
const router_user = require('./routes/user');
const router_token = require('./routes/token');
const router_rank = require('./routes/rank');
const router_currency = require('./routes/currency');

const app = express();

const cors = (req, res, next) =>
{
    const current_origin = req.protocol + '://' + req.hostname + (req.hostname !== 'localhost' ? '' : ':3000');

    if (whitelist.includes(current_origin))
    {
        res.setHeader('Access-Control-Allow-Origin', current_origin);
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    }

    next();
};

app.use(cors);
app.use(express.json({ limit: '50mb' }));

/* API routes */
app.use('/api/language', router_language);
app.use('/api/file', router_file);
app.use('/api/blog', router_blog);
app.use('/api/faq', router_faq);
app.use('/api/mailing', router_mailing);
app.use('/api/user', router_user);
app.use('/api/token', router_token);
app.use('/api/rank', router_rank);
app.use('/api/currency', router_currency);

/* Static service of the front-end app's files */
//app.use(express.static('./public'));

/* Home page route */
//app.get('/*', (req, res) => res.sendFile('./public/index.html', { root: '.' }));

module.exports = app;

