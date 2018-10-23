module.exports = (server, database) => {
	const requestsDB = require("../requests/requests");

	server.post("/v1/signUp", getSignUp);

	// function getSignUp(req, res, next) {
	// 	const data = JSON.parse(req.body);
	// 	if (!utils.isset(data.email, data.password)) {
	// 		return next(new errs.InvalidArgumentError("Not enough body data"));
	// 	}
	// 	requestsDB.addUser(database, data, next)
	// 		.then(() => {
	// 			res.send("success");
	// 		})
	// 		.catch(() => {
	// 			res.send("email is already exist");
	// 		});
	// }

	server.post('/login', getSignIn);

	function getSignIn(req, res, next) {
		console.log('login');
		const data = req.body;
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
};