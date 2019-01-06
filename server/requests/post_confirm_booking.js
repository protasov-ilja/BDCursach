exports.confirmBooking = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("confirmBooking");
        let status = "payed";
        let sql = `
		UPDATE booking
			SET status = ?
		    WHERE id_booking = ?`;
        database.query(sql, [status, data.idBooking], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            resolve(status);
        });
    });
};