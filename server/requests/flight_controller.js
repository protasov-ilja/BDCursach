exports.deleteFlight = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("deleteFlight");
        let sql = `
          DELETE
          FROM flight 
          WHERE id_flight = ?`;

        database.query(sql, [data.idFlight], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }
        });

        let response = { status: "deleted" };
        resolve(response);
    });
};