exports.checkUserAccess = function (database, data, next) {
	return new Promise(async (resolve, reject) => {
		console.log("checkUserAccess");
		let sql = `
		SELECT 
			id_user AS idUser 
		FROM user 
			WHERE id_user = ?`;
		database.query(sql, [data.idUser], (err, result) => {
			if (err) {
				let response = { status: "err in query" };
				reject(response);
			}

			resolve(result);
		});
	});
};

exports.editUserInfo = function (database, idUser, data, next) {
	return new Promise(async (resolve, reject) => {
		console.log("editUserInfo");
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
			WHERE id_user = '${idUser}'`;
		database.query(updateSql, [
				data.newPassword,
				data.firstName,
				data.lastName,
				data.status,
				data.dateOfBirth,
				data.address,
				data.sex,
				data.urlImage
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