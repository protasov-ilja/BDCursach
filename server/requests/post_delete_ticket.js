exports.deleteTicket = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addFlights");
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