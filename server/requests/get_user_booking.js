exports.bookingForUser = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("bookingForUser");
        let sql = `
		        booking.id_booking AS idBooking
              , booking.status AS status
              , booking.number_card AS cardNumber
              , booking.date AS date
             
          FROM booking
                LEFT JOIN user USING (id_user)
                
            WHERE login = ? AND password = ?
            `;
        // GROUP BY id_booking
        // LEFT JOIN ticket_in_booking USING (id_booking)  , SUM(ticket_in_booking.price) AS bookingPrice
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