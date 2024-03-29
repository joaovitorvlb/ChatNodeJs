const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
	res.render('index.html');
});

const mqtt = require('mqtt')

var mysql = require('mysql');

let messages = [];

io.on('connection', socket => {
	console.log(`Socket connection: ${socket.id}`);

	socket.emit('previowsMessages', messages);

	socket.on('sendMessage', data => {
		messages.push(data);
		console.log('oi');
		socket.broadcast.emit('receivedMessage', data);
		socket.emit('receivedMessage', data);
	});
});

server.listen(3001);