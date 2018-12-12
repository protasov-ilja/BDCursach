exports.getBookingForUser = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("checkUserAccess");
        let sql = `
		SELECT 
			booking.id_booking AS idBooking
          , booking.status AS status
          , booking.number_card AS cardNumber
          , booking.date AS date
		FROM booking 
			WHERE id_user = ?`;
        database.query(sql, [idUser], (err, result) => {
            if (err) {
                let response = "err in query";
                console.log("err in query");
                reject(response);
            }

            console.log(result.length);
            resolve(result);
        });
    });
};