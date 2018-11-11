module.exports = (server, database) => {
	const signIn = require("../requests/sign_in_user");
	const signUp = require("../requests/sign_up_user");
	const flights = require("../requests/all_flights");
	const changeUserInfo = require("../requests/edit_user_info");
	const getUserInfo = require("../requests/get_user_info");
	const ticketsForFlight = require("../requests/all_tickets_for_flight");

	server.post('/login', getSignIn);
	function getSignIn(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		signIn.loginUser(database, data, next)
			.then((result) => {
				console.log("response");
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

		signUp.checkUserExistenceBeforeAdding(database, data, next)
			.then((userState) => {
				if (!userState.isFound) {
					console.log("response1");
					signUp.registerUser(database, data, next)
						.then((result) => {
							console.log("response2");
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
		flights.getAllFlights(database, next)
			.then((result) => {
				console.log("response");
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

		console.log(data.login);
		console.log(data.password);

		changeUserInfo.checkUserAccess(database, data, next)
			.then((result) => {
				console.log("response1");
				if (result.length !== 0) {
					changeUserInfo.editUserInfo(database, result[0].id_user, data, next)
						.then((newResult) => {
							console.log("response2");
							res.send(JSON.stringify(newResult));
						})
						.catch((error) => {
							console.log("reject: " + error);
						});
				} else {
					let response = { status: "not_such_user" };
					res.send(JSON.stringify(response));
				}
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

		getUserInfo.getUser(database, data, next)
			.then((result) => {
				console.log("response");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}

	server.get('/flight/tickets', getTicketsForFlight);
	function getTicketsForFlight(req, res, next) {
		const data = req.query;
		if (!req.query) {
			res.send("error no query");
		}

		ticketsForFlight.getAllTicketsForFlight(database, data, next)
			.then((result) => {
				console.log("response");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}
};