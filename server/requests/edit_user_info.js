exports.checkUserAccess = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		console.log("checkUserAccess");
		let sql = `
		SELECT 
			id_user AS idUser 
		FROM user 
			WHERE login = ? AND password = ?`;
		database.query(sql, [data.login, data.password], (err, result) => {
			if (err) {
				let response = { status: "err in query" };
				reject(response);
			}

			console.log(result[0].idUser);

			resolve(result);
		});
	});
};

exports.editUserInfo = function (database, idUser, data, next) {
	return new Promise(async (resolve, reject) => {
		console.log("editUserInfo");
		console.log(idUser);
		console.log(data.login);
		console.log(data.password);
		console.log(data.dateOfBirth);
		console.log(data.status);
		let data = "12.12.12";
		let img = "http://img";
		let response = { status: "user_updated" };
		let updateSql =
			`UPDATE user SET 
				password = ?
				, first_name = ?
				, last_name = ?
				, status = ?
				, date_of_birth = ?
				, address = ?
				, sex = ?
				, url_image = ?
			WHERE id_user = ?`;
		database.query(updateSql, [
				data.newPassword,
				data.firstName,
				data.lastName,
				data.status,
                data,
				data.address,
				data.sex,
                img,
                idUser
			],
			(err, result) => {
			if (err) {
				response = { status: "err in query" };
				reject(response);
			}

			resolve(response);
		});
	});
};