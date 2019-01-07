const config = require('./config');

let express = require('express');
let bodyParser = require('body-parser');

let server = express();
let database = config.db.get;

database.connect((err) => {
	if (err) {
		console.log("can't connect to database " + err);
	}

	console.log('You are now connected...');
});

// body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

//set static path
//server.use(express.static(path.join(__dirname, 'public')));

server.listen(config.port, () => {
	console.log(`ready on port ${config.port}`);
	require("./routes/routes")(server, database);
});

server.get('/', (req, res) => {
	console.log("get_request");
	res.send("empty_get");
});

server.post('/', (req, res) => {
	console.log('post request');
	res.send("empty_post");
});

server.get('api/courese/:id', (req, res) =>
{
	res.send(req.params.id); // params in an object
});


server.use(function(err, req, res, next) {
	let errData = {
			status:"error",
			message: err.message
		};

	console.log(errData);
	res.send(JSON.stringify(errData));
});


