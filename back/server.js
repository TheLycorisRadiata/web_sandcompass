const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const colors = require('colors');
const hostname = 'localhost';
const port = process.env.PORT || 3001;

app.set('port', port);
const server = http.createServer(app);

mongoose.connect('mongodb://localhost/sandcompass', 
{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('> Server connected to database'.blue))
.catch((err) => 
{
	console.log('> Error: Server couldn\'t connect to database'.red);
	console.log(err.message);
	process.exit(1);
});

server.listen(port, hostname, () => 
{
	console.log(`> Server running at http://${hostname}:${port}/`.blue);
});

