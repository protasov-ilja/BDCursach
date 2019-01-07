
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


