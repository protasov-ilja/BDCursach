exports.checkUserExistenceBeforeAdding = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { isFound : false };
		let sql = `
		SELECT 
			login 
		FROM user 
			WHERE login = ?`;
		database.query(sql, [data.login], (err, result) => {
			if (err) {
				response = { status: "err in query" };
				reject(response);
			}

			if (result.length !== 0) {
				let response = { isFound : true };
				resolve(response);
			}

			resolve(response)
		});
	});
};

exports.registerUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "user_added" };
		let addedSql = `INSERT INTO user (
				login,
				password,
				first_name,
				last_name,
				status,
				date_of_birth,
				address,
				sex,
				url_image) 
			VALUES (
				?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		database.query(addedSql, [
			data.login,
			data.password,
			data.firstName,
			data.lastName,
			data.status,
			data.dateOfBirth,
			data.address,
			data.sex,
			data.urlImage
		], (err, newResult) => {
			if (err) {
				response = { status: "err in query when added" };
				reject(response);
			}

			resolve(response);
		});
	});
};