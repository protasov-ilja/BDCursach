exports.addTickets = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addTickets");
        let response = { status: "added" };
        let sql = `
          INSERT INTO ticket (id_flight, id_class, price, decription, place_number)
          VALUES (?, ?, ?, ?, ?)`;

        for (let ticket of data.tickets) {
            console.log(ticket.idFlight, ticket.idClass, ticket.price, ticket.description, ticket.placeNumber);
            database.query(sql, [ticket.idFlight, ticket.idClass, ticket.price, ticket.description, ticket.placeNumber], (err, result) => {
                if (err) {
                    response = { status: "err in query" };
                    reject(response);
                }
            });
        }

        resolve(response);
    });
};


exports.addTicket = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addTicket");
        let response = { status: "added" };
        let sql = `
            INSERT INTO ticket (id_flight, id_class, price, decription, place_number)
            VALUES (?, ?, ?, ?, ?)`;

        // console.log(ticket.idFlight, ticket.idClass, ticket.price, ticket.description, ticket.placeNumber);
        database.query(sql, [data.idFlight, data.idClass, data.price, data.description, data.placeNumber], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }
        });

        resolve(response);
    });
};