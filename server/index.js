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



var express = require('express');
var bodyParser = require('body-parser');
var app = express();

let port = process.env.PORT;
if (port == null || port == "") {
	port = 8000;
}

app.use(bodyParser.json());

app.get('/', function (req, res){
	console.log('get request');
	var resString = 'Hello, ' + new Date();
	res.send(resString);
});

app.post('/', function (req, res) {
	console.log('post request');
	var postResponde = 'Hello, ' + req.body.user;
	res.send(postResponde);
});

app.listen(port, function() {
	console.log('ready on port 8080');
});