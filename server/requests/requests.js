exports.addUser = function(database, data, next) {
	return new Promise(async (resolve, reject) => {
		let sql = `SELECT * FROM user WHERE email = '${data.email}'`;
		database.query(sql, function (err, result) {
			if (err) {
				console.log(err);
			}

			if (result.length !== 0) {
				return reject(false);
			}
		});

		sql = `INSERT INTO user VALUES (null, '', '', 1, '', '${data.password}', '${data.email}', '')`;
		database.query(sql, function (err) {
			if (err) {
				console.log(err);
			}

			return resolve(true);
		});
	});
};

exports.loginUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = {status:"unknown"};
		let sql = `SELECT login, password, status FROM user WHERE password = '${data.password}' AND login = '${data.login}'`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("err: get/");
			}
			else {
				if (result.length !== 0) {
					console.log("log: " + result[0].login + " pas: " + result[0].password + " stat: " + result[0].status);
					response = {status: result[0].status};
					console.log(result);

					//res.send(JSON.stringify(data));
					resolve(JSON.stringify(response));
				} else {
					reject(JSON.stringify(response));
					//res.send(JSON.stringify(data));
				}
			}
		});
	});
};