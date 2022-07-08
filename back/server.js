require('dotenv').config();
const http = require('http');
const colors = require('colors');
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3001;
app.set('port', port);
const server = http.createServer(app);
const is_db_local = !process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/sandcompass', 
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`> The server is connected to the ${is_db_local ? 'local' : 'online'} database`.blue))
.catch((err) => 
{
    console.log('> The server couldn\'t connect to the database'.red);
    console.log(err.message);
    process.exit(1);
});

server.listen(port);
server.on('error', () => console.log('> An error occurred with the server'.red));
server.on('listening', () => console.log(`> The server is running on port ${port}`.blue));

