exports.addFlights = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("addFlights");
        let response = { status: "added" };
        let sql = `
            INSERT INTO flight (id_plane, id_airport, point_of_departure, point_of_destination, time_of_departure, time_of_destination)
            VALUES (?, ?, ?, ?, ?, ?)`;

        for (let flight of data.flights) {
            if (checkDateForExictence(flight.timeOfDeparture, flight.timeOfDestination)) {
                response = { status: "err departure > destination time" };
                reject(response);
            }

            await database.query(sql, [flight.idPlane, flight.idAirport, flight.pointOfDeparture, flight.pointOfDestination, new Date(flight.timeOfDeparture), new Date(flight.timeOfDestination)], (err, result) => {
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
        if (checkDateForExictence(data.timeOfDeparture, data.timeOfDestination)) {
            response = { status: "err departure > destination time" };
            reject(response);
        }

        let sql = `
            INSERT INTO flight (id_plane, id_airport, point_of_departure, point_of_destination, time_of_departure, time_of_destination)
            VALUES (?, ?, ?, ?, ?, ?)`;
        await database.query(sql, [data.idPlane, data.idAirport, data.pointOfDeparture, data.pointOfDestination, new Date(data.timeOfDeparture), new Date(data.timeOfDestination)], (err, result) => {
            if (err) {
                response = { status: "err in query" };
                reject(response);
            }

            return resolve(response);
        });
    });
};

function checkDateForExictence(dateOfDeparture, dateOfDestination) {
    return (new Date(dateOfDeparture) > new Date(dateOfDestination));
}