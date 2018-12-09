exports.getAllFlights = function (database, next) {
	return new Promise(async (resolve, reject) => {
		let response = { status: "empty" };
		let sql = `
          SELECT
              flight.id_flight AS idFlight,
              flight.id_plane AS idPlane,
              flight.id_airport AS idAirport,
              flight.point_of_departure AS pointOfDeparture,
              flight.point_of_destination AS pointOfDestination,
              flight.time_of_departure AS timeOfDeparture,
              flight.time_of_destination AS timeOfDestination,
              company.name AS companyName
          FROM flight
              LEFT JOIN plane ON plane.id_plane = flight.id_plane
              LEFT JOIN company ON company.id_company = plane.id_company`;
		database.query(sql, (err, result) => {
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