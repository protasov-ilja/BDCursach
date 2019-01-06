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