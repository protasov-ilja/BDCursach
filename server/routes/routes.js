module.exports = (server, database) => {
	const requestsDB = require("../requests/requests");

	server.post('/login', getSignIn);

	function getSignIn(req, res, next) {
		console.log('login');
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.loginUser(database, data, next)
			.then((result) => {
				console.log("responce: " + result);
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
				res.send(JSON.stringify(result));
			});
	}

	server.post('/register', getSignUp);

	function getSignUp(req, res, next) {
		console.log('register');
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.registerUser(database, data, next)
			.then((result) => {
				console.log("responce: " + result);
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
				res.send(JSON.stringify(result));
			});
	}

	server.get('/flights', getFlights);

	function getFlights(req, res, next) {
		console.log('flights');
		requestsDB.getAllFlights(database, next)
			.then((result) => {
				console.log("responce: " + result);
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
				res.send(JSON.stringify(result));
			});
	}

	server.post('/user/change-info', changeUserInfo);

	function changeUserInfo(req, res, next) {
		console.log('changeUserInfo');
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.editUserInfo(database, data, next)
			.then((result) => {
				console.log("responce: " + result);
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
				res.send(JSON.stringify(result));
			});
	}

	server.get('/flight/tickets', getTicketsForFlight);

	function getTicketsForFlight(req, res, next) {
		console.log('getTicketsForFlight');
		const data = req.header;
		if (!req.header()) {
			res.send("error no body");
		}

		requestsDB.getAllTicketsForFlight(database, data, next)
			.then((result) => {
				console.log("responce: " + result);
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
				res.send(JSON.stringify(result));
			});
	}
};