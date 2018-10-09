
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