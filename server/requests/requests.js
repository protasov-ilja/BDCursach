exports.loginUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "unknown" };
		let sql = `
		SELECT 
			login, 
			password, 
			status 
		FROM user 
			WHERE password = ? AND login = ?`;
		database.query(sql, [data.password, data.login], (err, result) => {
			if (err) {
				response = { status: "err: query" };
				reject(response);
			}

			if (result.length !== 0) {
				response = { status: result[0].status };
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
			WHERE login = ?`;
		database.query(sql, [data.login], (err, result) => {
			if (err) {
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
					?, ?, ?, ?, ?, ?, ?, ?)`;
				database.query(addedSql, [data.login, data.password, data.firstName, data.lastName, data.status, data.dateOfBirth, data.address, data.sex], (err, newResult) => {
					if (err) {
						response = { status: "error_in_sql_when_added" };
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
		let response = { status: "empty" };
		let sql = `SELECT * FROM flight`;
		database.query(sql, (err, result) => {
			if (err) {
				reject(response);
			}

			if (result.length !== 0) {
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
			WHERE login = ?`;
		database.query(sql, [data.login], (err, result) => {
			if (err) {
				response = { status: "err_in_sql" };
				reject(response);
			} else {
				if (result.length !== 0) {
					let updateSql =
						`UPDATE user SET 
						password = ?
						, first_name = ?
						, last_name = ?
						, status = ?
						, date_of_birth = ?
						, address = ?
						, sex = ?
						WHERE id_user = '${result[0].id_user}'`;
					database.query(updateSql, [data.password, data.firstName, data.lastName, data.status, data.dateOfBirth, data.address, data.sex], (err, newResult) => {
						if (err) {
							reject("err");
						} else {
							response = { status: "user_updated" };
							resolve(response);
						}
					});
				} else {
					reject(response);
				}
			}
		});
	});
};

exports.getUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		console.log("getUser");
		let response = { status: "no_such_user" };
		let sql = `
		SELECT
			first_name AS firstName
			, last_name AS lastName
			, status AS status
			, date_of_birth AS dateOfBirth
			, address AS address
			, sex AS sex
		FROM user 
			WHERE password = ? AND login = ?`;
		database.query(sql, [data.password, data.login], (err, result) => {
			if (err) {
				response = { status: "err_query" };
				reject(response);
			}

			if (result.length !== 0) {
				resolve(result);
			} else {
				reject(response);
			}
		});
	});
};

exports.getAllTicketsForFlight = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
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
		WHERE ticket.id_flight = ?`;
		database.query(sql, [data.idFlight], (err, result) => {
			if (err) {
				response = { status: "err_in_sql" };
				reject(response);
			} else {
				if (result.length !== 0) {
					resolve(result);
				} else {
					reject(response);
				}
			}
		});
	});
};