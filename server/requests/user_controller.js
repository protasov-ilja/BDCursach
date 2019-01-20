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
                console.log("err in query");
                reject(response);
            }

            console.log(result.length);
            if (result.length !== 0) {
                resolve(result);
            } else {
                let response = {status: "not_found"};
                reject(response);
            }
        });
    });
};

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

            resolve(response);
        });
    });
};

exports.registerUser = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        let urlImageStr = getRandomUrlImage();
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
            new Date(data.dateOfBirth),
            data.address,
            data.sex,
            urlImageStr
        ], (err, newResult) => {
            if (err) {
                response = { status: "err in query when added" };
                reject(response);
            }

            resolve(response);
        });
    });
};

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
            result[0].dateOfBirth = new Date(result[0].dateOfBirth);
            if (result.length !== 0) {
                resolve(result[0]);
            } else {
                resolve(response);
            }
        });
    });
};

exports.editUserInfo = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("editUserInfo");
        console.log(data.idUser);
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
                new Date(data.dateOfBirth),
                data.address,
                data.sex,
                data.urlImage,
                data.idUser
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

function getRandomUrlImage() {
    let imgArr = [
        "https://goo.gl/BMHL8e",
        "https://goo.gl/FNMCyC",
        "https://goo.gl/LYtfjU",
        "https://goo.gl/6iuvg7",
        "https://goo.gl/oYDRf6",
        "https://goo.gl/p2wnGJ",
        "https://goo.gl/qjpj2L"
    ];

    return  imgArr[Math.floor(Math.random() * imgArr.length)];
}
