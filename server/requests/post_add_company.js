exports.addCompany = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addTicket");
        let response = { status: "added" };
        let sql = `
          INSERT INTO company (name, rating) VALUES (?, ?)`;
        database.query(sql, [data.name, data.rating], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }
        });

        resolve(response);
    });
};