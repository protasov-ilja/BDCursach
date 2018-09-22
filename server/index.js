// const config = require('./config'),
// 	express = require('express'),
// 	errs = require('express-errors'),
// 	mySqlClient = require("mysql"); // need sth TODO
//
// const server = express.createServer({
// 	name: config.name,
// 	version: config.version
// });
//
// server.use(express.plugins.acceptParser(server.acceptable));
// server.use(express.plugins.queryParser());
// server.use(express.plugins.bodyParser());

// 2v
// const express = require('express');
// const path = require('path');
// const port = process.env.PORT || 3000;
//
// const publicPath = path.join(__dirname, '../public');
//
// const app = express();
//
// app.use(express.static(publicPath));
//
// app.listen(port, () => {
// 	console.log(`Server has been started..  ${port}`)
// });

// 3v
// const express = require('express')
// const app = express()
// const port = 3000
//
// app.get(‘/’, (request, response) => {
// response.send('Hello from Express!')
// })
//
// app.listen(port, (err) => {
// 	if (err) {
// 		return console.log('something bad happened', err)
// 	}
//
// 	console.log('server is listening on ${port}')
// })

var admins = [];
admins[0] = {
	login: "Ilya",
	password: "qwerty123"
};

admins[1] = {
	login: "Anton",
	password: "qwerty321"
};

var users  = [];
users[0] = {
	login: "Bob",
	password: "qwerty1"
};

users[1] = {
	login: "Vasya",
	password: "qwerty2"
};


var express = require('express');
var bodyParser = require('body-parser');
var app = express();

let port = process.env.PORT;
if (port === null || port === "") {
	port = 8000;
}

app.use(bodyParser.json());

app.get('/', function (req, res) {
	console.log('get request');
	//var object_from_json = JSON.parse(req);
	var data;
	var postResponde = 'Hello, ' + req.body.login;
	if (req.body.login in admins)
	{
		data = {status:"admin"};
	}
	else if (req.body.login in users)
	{
		data = {status:"user"};
	}
	else
	{
		data = {status:"unknown"};
	}

	res.send(JSON.stringify(data));
	// var resString = 'Hello, ' + new Date();
});

app.post('/register', function (req, res) {
	console.log('post request');
	var data;
	var postResponde = 'Hello, ' + req.body.login;
	if (req.body in admins)
	{
		data = {status:"admin"};
	}
	else if (req.body in users)
	{
		data = {status:"user"};
	}
	else
	{
		data = {status:"unknown"};
	}

	res.send(JSON.stringify(data));
});

app.post('/login', function (req, res) {
	console.log('post request');
	var data;
	var postResponde = 'Hello, ' + req.body.login;
	if (req.body in admins)
	{
		data = {status:"admin"};
	}
	else if (req.body in users)
	{
		data = {status:"user"};
	}
	else
	{
		data = {status:"unknown"};
	}

	res.send(JSON.stringify(data));
});

app.post('/', function (req, res) {
	console.log('post request');
	var data;
	var postResponde = 'Hello, ' + req.body.login;
	if (req.body.login === "Ilya")
	{
		data = {status:"admin"};
	}
	else
	{
		data = {status:"user"} ;
	}

	res.send(JSON.stringify(data));
});

app.listen(port, function() {
	console.log('ready on port 8080');
});