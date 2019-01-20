exports.bookingForUser = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("bookingForUser");
        let sql = `
        SELECT
		        booking.id_booking AS idBooking
              , booking.status AS status
              , booking.number_card AS cardNumber
              , booking.date AS date
              , SUM(ticket_in_booking.price) AS bookingPrice
          FROM booking
                LEFT JOIN user USING (id_user)
                LEFT JOIN ticket_in_booking USING (id_booking)
            WHERE login = ? AND password = ?
            GROUP BY id_booking`;

        database.query(sql, [data.login, data.password], (err, result) => {
            if (err) {
                let response = "err in query";
                console.log("err in query");
                reject(response);
            }

            resolve(result);
        });
    });
};

exports.confirmBooking = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("confirmBooking");
        let response = { status: "payed" };
        let sql = `
		UPDATE booking
			SET status = 'payed'
		    WHERE id_booking = ?`;
        database.query(sql, [data.idBooking], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }

            resolve(response);
        });
    });
};

exports.getBookingTickets = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("getBookingTickets");
        let sql = `SELECT 
                          id_ticket AS idTicket
          FROM ticket_in_booking 
          WHERE id_booking = ?`;
        database.query(sql, [data.idBooking], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            data.tickets = result;
            for (const ticket of result) {
                console.log(ticket.idTicket);
            }

            resolve();
        });
    });
};

exports.deleteAllTicketsFromBooking = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("deleteAllTicketsFromBooking");
        let sql = `DELETE 
                   FROM ticket_in_booking
                  WHERE id_booking = ?`;

        database.query(sql, [data.idBooking], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            let response = { status: "deleted" };
            resolve(response);
        });
    });
};

exports.rejectBooking = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("rejectBooking");
        let sql = `UPDATE booking 
          SET status = 'rejected'
          WHERE id_booking = ?`;

        database.query(sql, [data.idBooking], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            resolve();
        });
    });
};

exports.createBooking = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("createBooking");
        let status = "booked";
        console.log(data.idUser, data.card, status);
        let sql = `INSERT INTO booking (date, id_user, number_card, status) VALUES (NOW(), ?, ?, ?)`;
        database.query(sql, [data.idUser, data.card, status], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            let newSql = `SELECT LAST_INSERT_ID() AS newId`;
            database.query(newSql, (err, newResult) => {
                if (err) {
                    let response = { status: "err in query" };
                    reject(response);
                }

                console.log(newResult[0].newId);
                resolve(newResult[0].newId);
            });
        });
    });
};

exports.createTicketsInBooking = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("createTicketsInBooking");
        for (const ticket of data.tickets) {
            let sql = `
              INSERT INTO ticket_in_booking (id_ticket, id_booking, price, first_name_of_user, last_name_of_user, sex, date_of_birth) 
              VALUES (?, ?, ?, ?, ?, ?, ?)`;
            console.log(ticket.idTicket, data.idBooking, ticket.price, ticket.firstName, ticket.lastName, ticket.sex, new Date(ticket.dateOfBirth));
            database.query(sql, [ticket.idTicket, data.idBooking, ticket.price, ticket.firstName, ticket.lastName, ticket.sex, new Date(ticket.dateOfBirth)], (err, result) => {
                if (err) {
                    let response = { status: "err in query" };
                    reject(response);
                }
            });
        }

        resolve();
    });
};

exports.getTicketsInBooking = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("getTicketsInBooking");
        let sql = `
          SELECT 
              id_ticket AS idTicket,
              id_booking AS idBooking,
              price,
              first_name_of_user AS firstName,
              last_name_of_user AS lastName,
              sex,
              date_of_birth AS dateOfBirth              
          FROM ticket_in_booking 
          WHERE id_booking = ?`;
        database.query(sql, [data.idBooking], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            resolve(result);
        });
    });
};