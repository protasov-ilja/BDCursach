module.exports = (server, database) => {
	const requestsDB = require("../requests/requests");

	server.post('/login', getSignIn);

	function getSignIn(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.loginUser(database, data, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}

	server.post('/register', getSignUp);

	function getSignUp(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.checkUserExistenceBeforeAdding(database, data, next)
			.then((userState) => {
				if (!userState.isFound) {
					console.log("responce1");
					requestsDB.registerUser(database, data, next)
						.then((result) => {
							console.log("responce2");
							res.send(JSON.stringify(result));
						})
						.catch((error) => {
							console.log("reject: " + error);
						});
				} else {
					let response = { status: "already_exists" };
					res.send(JSON.stringify(response));
				}
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}

	server.get('/flights', getFlights);

	function getFlights(req, res, next) {
		requestsDB.getAllFlights(database, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}

	server.post('/user/change', postChangeUserInfo);

	function postChangeUserInfo(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.editUserInfo(database, data, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}

	server.post('/user/get', postGetUserInfo);

	function postGetUserInfo(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.getUser(database, data, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}

	server.get('/flight/tickets', getTicketsForFlight);

	function getTicketsForFlight(req, res, next) {
		console.log('getTicketsForFlight');
		const data = req.query;
		if (!req.query) {
			res.send("error no query");
		}

		requestsDB.getAllTicketsForFlight(database, data, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}
};