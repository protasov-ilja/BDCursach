exports.changeTicketsStatus = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("changeTicketsStatus");
        for (const ticket of data.tickets) {
            let sql = `
              UPDATE ticket 
              SET is_booked = ?
              WHERE id_ticket = ?`;
            database.query(sql, [data.isBooked, ticket.idTicket], (err, result) => {
                if (err) {
                    let response = { status: "err in query" };
                    reject(response);
                }
            });
        }

        let response = { idBookingForTickets: data.idBooking };
        resolve(response);
    });
};

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

        database.query(sql, [data.idFlight, data.idClass, data.price, data.description, data.placeNumber], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }
        });

        resolve(response);
    });
};

exports.getAllTicketsForFlight = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "empty" };
        let sql = `
		SELECT 
			ticket.id_ticket AS idTicket,
			ticket.price AS price,
			ticket.place_number AS placeNumber,
		  	class.name AS name,
		   	class.description AS classDescription,
		    ticket.decription AS ticketDescription
		FROM ticket 
			LEFT JOIN class ON class.id_class = ticket.id_class 
		WHERE ticket.id_flight = ? AND ticket.is_booked = FALSE`;
        database.query(sql, [data.idFlight], (err, result) => {
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

exports.getAllTicketsForAdmin = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "empty" };
        let sql = `
		SELECT 
			ticket.id_ticket AS idTicket,
			ticket.price AS price,
			ticket.place_number AS placeNumber,
		  	class.name AS name,
		   	class.description AS classDescription,
		    ticket.decription AS ticketDescription
		FROM ticket 
			LEFT JOIN class ON class.id_class = ticket.id_class 
		WHERE ticket.id_flight = ?`;
        database.query(sql, [data.idFlight], (err, result) => {
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


exports.checkTicketStatus = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "already_booked" };
        let sql = `
		SELECT 
			ticket.id_ticket AS idTicket
		FROM ticket 
			LEFT JOIN class ON class.id_class = ticket.id_class 
		WHERE ticket.id_ticket = ? AND ticket.is_booked = FALSE`;
        database.query(sql, [data.idTicket, data.idFlight], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }

            if (result.length !== 0) {
                response = { status: "not_booked" };
                resolve(response);
            } else {
                resolve(response);
            }
        });
    });
};

