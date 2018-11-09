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
			.catch((result) => {
				console.log("reject: " + result);
			});
	}

	server.post('/register', getSignUp);

	function getSignUp(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.registerUser(database, data, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
			});
	}

	server.get('/flights', getFlights);

	function getFlights(req, res, next) {
		requestsDB.getAllFlights(database, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
			});
	}

	server.post('/user/change', changeUserInfo);

	function changeUserInfo(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.editUserInfo(database, data, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
			});
	}

	server.post('/user/get', getUserInfo);

	function getUserInfo(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		requestsDB.getUser(database, data, next)
			.then((result) => {
				console.log("responce");
				res.send(JSON.stringify(result));
			})
			.catch((result) => {
				console.log("reject: " + result);
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
			.catch((result) => {
				console.log("reject: " + result);
			});
	}
};