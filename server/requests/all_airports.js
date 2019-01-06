exports.getAllAirports = function (database, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "empty" };
        let sql = `
          SELECT
              airport.id_airport AS idAirport,
              airport.name,
              airport.location
          FROM airport`;
        database.query(sql, (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }

            if (result.length !== 0) {
                resolve(result);
            } else {
                resolve(response);
            }
        });
    });
};