exports.addFlights = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addFlights");
        let response = { status: "added" };

        let sql = `
            INSERT INTO flight (id_plane, id_airport, point_of_departure, point_of_destination, time_of_departure, time_of_destination)
            VALUES (?, ?, ?, ?, ?, ?)`;
        for (let flight of data.flights) {
            database.query(sql, [flight.idPlane, flight.idAirport, flight.pointOfDeparture, flight.pointOfDestination, flight.timeOfDeparture, flight.timeOfDestination], (err, result) => {
                if (err) {
                    response = { status: "err in query" };
                    reject(response);
                }
            });
        }

        resolve(response);
    });
};

exports.addFlight = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addFlight");
        let response = { status: "added" };
        console.log(data.idPlane, data.idAirport, data.pointOfDeparture, data.pointOfDestination, data.timeOfDeparture, data.timeOfDestination);
        let sql = `
            INSERT INTO flight (id_plane, id_airport, point_of_departure, point_of_destination, time_of_departure, time_of_destination)
            VALUES (?, ?, ?, ?, ?, ?)`;
            database.query(sql, [data.idPlane, data.idAirport, data.pointOfDeparture, data.pointOfDestination, data.timeOfDeparture, data.timeOfDestination], (err, result) => {
                if (err) {
                    response = { status: "err in query" };
                    reject(response);
                }

                resolve(response);
            });
    });
};