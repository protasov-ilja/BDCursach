exports.getAllPlanes = function (database, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "empty" };
        let sql = `
          SELECT
              plane.id_plane AS idPlane,
              plane.type AS type,
              plane.id_company AS idCompany
          FROM plane`;
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