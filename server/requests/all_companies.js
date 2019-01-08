
exports.getAllCompanies = function (database, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "empty" };
        let sql = `
          SELECT
              company.id_company AS idCompany,
              company.name AS name,
              company.rating AS rating
          FROM company`;
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