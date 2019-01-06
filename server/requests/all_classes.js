exports.getAllClasses = function (database, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "empty" };
        let sql = `
          SELECT
                 class.id_class AS idClass,
                 class.name,
                 class.description
          FROM class`;
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