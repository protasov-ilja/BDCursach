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
				response = { status: "err in query" };
				reject(response);
			}

			if (result.length !== 0) {
				response = { status: result[0].status };
				resolve(response);
			} else {
				resolve(response);
			}
		});
	});
};