exports.getUser = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "no_such_user" };
		let sql = `
		SELECT
			id_user AS idUser
			, first_name AS firstName
			, last_name AS lastName
			, status
			, date_of_birth AS dateOfBirth
			, address
			, sex
			, url_image AS urlImage
		FROM user 
			WHERE password = ? AND login = ?`;
		database.query(sql, [data.password, data.login], (err, result) => {
			if (err) {
				response = { status: "err in query" };
				reject(response);
			}

			console.log(result[0].dateOfBirth);

			if (result.length !== 0) {
				resolve(result[0]);
			} else {
				resolve(response);
			}
		});
	});
};