const config = require('./config');
const temp = require('./tempfiles');
const dbRequests = require('./requests/requests');

let express = require('express');
let bodyParser = require('body-parser');


let server = express();
let database = config.db.get;

database.connect((err) => {
	if (err) {
		console.log("can't connect to database " + err);
	}

	console.log('You are now connected...')
});

// body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

//set static path
//server.use(express.static(path.join(__dirname, 'public')));

server.listen(config.port, () => {
	console.log(`ready on port ${config.port}`);
});

server.get('/adduser', (req, res) => {
	if(!database.state === 'disconnected') {
		let sql = `SELECT id_user, login, password FROM user WHERE password = '123' AND login = 'user'`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("err: get/");
			}

			console.log(result);
			res.send(result);
		})
	}

	res.send("empty_get");
});

server.post('/login', (req, res) => {
	console.log('post request');
	let data;
	if (ValidateUsers(temp.admins, req.body.login, req.body.password)) {
		data = {status:"admin"};
	}
	else if (ValidateUsers(temp.users, req.body.login, req.body.password)) {
		data = {status:"user"};
	}
	else {
		data = {status:"unknown"};
	}

	console.log(data);

	res.send(JSON.stringify(data));
});

server.post('/register', (req, res) => {
	console.log('post request');
	let data;
	if ((ValidateUsers(temp.admins, req.body.login, req.body.password)) || (ValidateUsers(temp.users, req.body.login, req.body.password)))
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

server.post('/', (req, res) => {
	console.log('post request');
	res.send("empty_post");
});

server.get('api/courese/:id', (req, res) =>
{
	res.send(req.params.id); // params in an object
});

function ValidateUsers(arr, login, password)
{
	for (let i = 0; i < arr.length; ++i)
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

server.use(function(err, req, res, next) {
	let errData = {
			status:"error",
			message: err.message
		};

	console.log(errData);
	res.send(JSON.stringify(errData));
});

//dbRequests.addUser();


