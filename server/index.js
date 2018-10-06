const config = require('./config');

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

var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var database = config.db.get;

database.connect(function(err) {
	if (err) {
		console.log(err);
		throw err;
	}

	console.log('You are now connected...')
});


server.use(bodyParser.json());

server.listen(config.port, function() {
	console.log(`ready on port ${config.port}`);
});

server.get('/', function (req, res, next) {
	console.log('get request');
	if(database.state === 'disconnected'){
		database.connect(function(err) {
			if (err) {
				console.log(err);
				throw err;
			}

			console.log('You are now connected...')
		});
	}
	else
	{
		var sql = 'CREATE TABLE IF NOT EXISTS people(id int primary key, name varchar(255), age int, address text)';
		database.query(sql, function(err, result) {
			if (err) {
				return next(new errs.BadGatewayError(err))
			}
		})
	}

	res.send("empty_get");
});

server.post('/login', function (req, res) {
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

server.post('/register', function (req, res) {
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

server.post('/', function (req, res) {
	console.log('post request');
	res.send("empty_post");
});
