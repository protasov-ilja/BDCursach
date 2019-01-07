exports.addPlane = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addTicket");
        let response = { status: "added" };
        let sql = `
          INSERT INTO plane (type, id_company) VALUES (?, ?)`;
        database.query(sql, [data.type, data.idCompany], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }
        });

        resolve(response);
    });
};