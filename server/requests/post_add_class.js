exports.addClass = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addTicket");
        let response = { status: "added" };
        let sql = `
            INSERT INTO class (name, description) VALUES (?, ?)`;
        database.query(sql, [data.name, data.description], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }
        });

        resolve(response);
    });
};