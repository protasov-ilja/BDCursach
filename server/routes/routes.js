module.exports = (server, database) => {
	const requestsDB = require("../requests/requests");

	server.post("/v1/signUp", getSignUp);

	function getSignUp(req, res, next) {
		const data = JSON.parse(req.body);
		if (!utils.isset(data.email, data.password)) {
			return next(new errs.InvalidArgumentError("Not enough body data"));
		}
		requestsDB.addUser(database, data, next)
			.then(() => {
				res.send("success");
			})
			.catch(() => {
				res.send("email is already exist");
			});
	}

	server.post('/login', getSignIn);

	function getSignIn(req, res, next) {
		console.log('login');
		const data = req.body;
		requestsDB.loginUser(database, data, next)
			.then((result, errMassage) => {
				console.log("responce: " + result);
				if (errMassage !== null)
				{
					console.log("errMassage: " + errMassage);
					res.send(errMassage);
				}
				else
				{
					res.send(result);
				}
			})
			.catch(() => {
				res.send("err");
			});
	}
};