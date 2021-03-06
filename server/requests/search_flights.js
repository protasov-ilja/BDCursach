exports.searchFlights = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "no_flights" };
        let sql = `
          SELECT
                 flight.id_flight AS idFlight
              , flight.id_plane AS idPlane
              , flight.id_airport AS idAirport
              , flight.point_of_departure AS pointOfDeparture
              , flight.point_of_destination AS pointOfDestination
              , flight.time_of_departure AS timeOfDeparture
              , flight.time_of_destination AS timeOfDestination
              , company.name AS companyName
          FROM flight
            LEFT JOIN plane ON plane.id_plane = flight.id_plane
            LEFT JOIN company ON company.id_company = plane.id_company
			WHERE point_of_departure LIKE ? AND point_of_destination LIKE ?`;

        let pointOfDepartureSearched = data.pointOfDeparture + "%";
        let pointOfDestinationSearched = data.pointOfDestination + "%";

        database.query(sql, [pointOfDepartureSearched, pointOfDestinationSearched], (err, result) => {
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

exports.searchFlightsByCity = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        let response = { status: "no_flights" };
        let sql = `
		SELECT
              flight.id_flight AS idFlight
			, flight.id_plane AS idPlane
			, flight.id_airport AS idAirport
			, flight.point_of_departure AS pointOfDeparture
			, flight.point_of_destination AS pointOfDestination
			, flight.time_of_departure AS timeOfDeparture
			, flight.time_of_destination AS timeOfDestination
            , company.name AS companyName
		FROM flight
            LEFT JOIN plane ON plane.id_plane = flight.id_plane
            LEFT JOIN company ON company.id_company = plane.id_company
			WHERE point_of_departure LIKE ? OR point_of_destination LIKE ?`;

        let pointOfDepartureSearched = data.city + "%";
        let pointOfDestinationSearched = data.city + "%";

        database.query(sql, [pointOfDepartureSearched, pointOfDestinationSearched], (err, result) => {
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