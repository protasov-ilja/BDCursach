
// edit_user_info
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

            console.log(result[0].idUser);

            resolve(result);
        });
    });
};

// tickets booking
exports.checkUserAccess = function(database, data, next) {
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


