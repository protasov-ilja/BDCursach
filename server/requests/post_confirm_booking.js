exports.confirmBooking = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("confirmBooking");
        let sql = `
		UPDATE booking
			SET status = 'payed'
		    WHERE id_booking = ?`;
        database.query(sql, [data.idBooking], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            resolve("payed");
        });
    });
};