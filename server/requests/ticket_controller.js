
exports.deleteTickets = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("deleteTickets");
        let sql = `
          DELETE
          FROM ticket 
          WHERE id_flight = ?`;

        database.query(sql, [data.idFlight], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }
        });

        resolve();
    });
};

exports.deleteTicket = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("deleteTicket");
        let sql = `
          DELETE
          FROM ticket 
          WHERE id_ticket = ?`;

        database.query(sql, [data.idTicket], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            let response = { status: "deleted" };
            resolve(response);
        });
    });
};