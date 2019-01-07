exports.getBookingForUser = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("checkUserAccess");
        let sql = `
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