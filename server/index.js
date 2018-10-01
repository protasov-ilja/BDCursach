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

var admins = [
	{
		login: "Ilya",
		password: "qw1"
	},

	{
		login: "Anton",
		password: "qw2"
	}
];

var users  = [
	{
		login: "Bob",
		password: "qw3"
	},

	{
		login: "Vasya",
		password: "qw4"
	}
];

function ValidateUsers(arr, login, password)
{
	for (var i = 0; i < arr.length; ++i)
	{
		if ((arr[i].login === login) && (arr[i].password === password))
		{
			return true;
		}
	}

	return false;
}

function AddNewUser(newUser)
{
	users[users.length] = {
		login: newUser.login,
		password: newUser.password
	};

	console.log(users[users.length - 1]);
}

var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'us-cdbr-iron-east-01.cleardb.net',
	user     : 'b6e1ae55117306',
	password : 'f5bffc76',
	database : 'heroku_785b375f435f04a'
});

connection.connect(function() {
	console.log("Connected!");
});

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

	res.send("empty_get");
});

app.post('/login', function (req, res) {
	console.log('post request');
	var data;
	if (ValidateUsers(admins, req.body.login, req.body.password)) {
		data = {status:"admin"};
	}
	else if (ValidateUsers(users, req.body.login, req.body.password)) {
		data = {status:"user"};
	}
	else {
		data = {status:"unknown"};
	}

	console.log(data);
	res.send(JSON.stringify(data));
});

app.post('/register', function (req, res) {
	console.log('post request');
	var data;
	if ((ValidateUsers(admins, req.body.login, req.body.password)) || (ValidateUsers(users, req.body.login, req.body.password)))
	{
		data = { status:"already_exists"};
	}
	else
	{
		data = { status:"user_added" };
		AddNewUser(req.body);
	}

	console.log(data);
	res.send(JSON.stringify(data));
});

app.post('/', function (req, res) {
	console.log('post request');
	res.send("empty_post");
});

app.listen(port, function() {
	console.log('ready on port 8080');
});