exports.loginUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "unknown" };
		let sql = `
		SELECT 
			login, 
			password, 
			status 
		FROM user 
			WHERE password = '${data.password}' AND login = '${data.login}'`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log(database.escape(data.password));
				console.log("err: get/");
				response = { status: "err: query" };
				reject(response);
			}

			if (result.length !== 0) {
				console.log("log: " + result[0].login + " pas: " + result[0].password + " stat: " + result[0].status);
				response = { status: result[0].status };
				console.log(result);
				resolve(response);
			} else {
				reject(response);
			}
		});
	});
};

exports.registerUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "already_exists" };
		let sql = `
		SELECT 
			login 
		FROM user 
			WHERE login = '${database.escape(data.login)}'`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("error_in_sql");
				response = { status: "error_in_sql" };
				reject(response);
			}

			if (result.length !== 0) {
				reject(response);
			} else {
				let addedSql = `INSERT INTO user (
					login,
					password,
					first_name,
					last_name,
					status,
					date_of_birth,
					address,
					sex) 
				VALUES (
					'${database.escape(data.login)}',
					'${database.escape(data.password)}',
					'${database.escape(data.firstName)}',
					'${database.escape(data.lastName)}',
					'${database.escape(data.status)}',
					'${database.escape(data.dateOfBirth)}',
					'${database.escape(data.address)}',
					'${database.escape(data.sex)}')`;
				database.query(addedSql, (err, newResult) => {
					if (err) {
						response = { status: "error_in_sql_when_added" };
						console.log("error_in_sql_when_added" );
						reject(response);
					}

					response = { status: "user_added" };
					resolve(response);
				});
			}
		});
	});
};

exports.getAllFlights = function (database, next) {
	return new Promise(async (resolve, reject) => {
		console.log('getAllFlights');
		let response = { status: "empty" };
		let sql = `SELECT * FROM flight`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("err in get all flights");
				reject(response);
			}

			if (result.length !== 0) {
				for (let i = 0; i < result.length; ++i) {
					console.log(i + "-i: " + result[i]);
				}

				resolve(result);
			} else {
				reject(response);
			}
		});
	});
};

exports.editUserInfo = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "not_such_user" };
		let sql = `
		SELECT 
			id_user 
		FROM user 
			WHERE login = '${database.escape(data.login)}'`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("err in editUserInfo sql user");
				response = { status: "err_in_sql" };
				reject(response);
			} else {
				if (result.length !== 0) {
					let updateSql =
						`UPDATE user SET 
						password = '${database.escape(data.password)}'
						, first_name = '${database.escape(data.firstName)}'
						, last_name = '${database.escape(data.lastName)}'
						, status = '${database.escape(data.status)}'
						, date_of_birth = '${database.escape(data.dateOfBirth)}'
						, address = '${database.escape(data.address)}'
						, sex = '${database.escape(data.sex)}'
						WHERE id_user = '${database.escape(result[0].id_user)}'`;
					database.query(updateSql, (err, newResult) => {
						if (err) {
							console.log("err in update user");
							reject("err");
						} else {
							response = { status: "user_updated" };
							resolve(response);
						}
					});
				} else {
					console.log("err user not found");
					reject(response);
				}
			}
		});
	});
};

exports.getAllTicketsForFlight = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		console.log('getAllTicketsForFlight');
		let response = { status: "empty" };
		let sql = `
		SELECT 
			ticket.id_ticket AS idTicket,
			ticket.price AS price,
		  	class.name AS name,
		   	class.description AS classDescription,
		    ticket.decription AS ticketDescription
		FROM ticket 
			LEFT JOIN class ON class.id_class = ticket.id_class 
		WHERE ticket.id_flight = ${database.escape(data.idFlight)}`;
		database.query(sql, (err, result) => {
			if (err) {
				console.log("err in getAllTicketsForFlight");
				response = { status: "err_in_sql" };
				reject(response);
			} else {
				if (result.length !== 0) {
					for (let i = 0; i < result.length; ++i) {
						console.log(i + "-i: " + result[i]);
					}

					resolve(result);
				} else {
					console.log(data);
					console.log(data.idFlight);
					reject(response);
				}
			}
		});
	});
};