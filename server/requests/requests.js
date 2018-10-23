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
		let response = { status: "unknown" };
		let sql = `SELECT login, password, status FROM user WHERE password = '${data.password}' AND login = '${data.login}'`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("err: get/");
				reject(response);
			}
			else {
				if (result.length !== 0) {
					console.log("log: " + result[0].login + " pas: " + result[0].password + " stat: " + result[0].status);
					response = { status: result[0].status };
					console.log(result);
					resolve(response);
				} else {
					reject(response);
				}
			}
		});
	});
};

exports.registerUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "already_exists" };
		let sql = `SELECT login FROM user WHERE login = '${data.login}'`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("err in register user");
				reject("err");
			} else {
				if (result.length !== 0) {
					resolve(JSON.stringify(response));
				} else {
					let addedSql = `insert into user (adress, date_of_birth, first_name, last_name, login, password, sex, status) values ('${data.address}', '${data.birth_date}', '${data.first_name}', '${data.last_name}', '${data.login}', '${data.password}', '${data.sex}', '${data.status}')`;
					database.query(addedSql, (err, newResult) => {
						if (err) {
							console.log("err in register user");
							reject("err");
						} else {
							response = { status: "user_added" };
							resolve(JSON.stringify(response));
						}
					});
				}
			}
		});
	});
};