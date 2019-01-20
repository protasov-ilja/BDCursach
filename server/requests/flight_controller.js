exports.deleteFlight = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("deleteFlight");
        let sql = `
          DELETE
          FROM flight 
          WHERE id_flight = ?`;

        database.query(sql, [data.idFlight], (err, result) => {
            if (err) {
                let response = { status: "err in query" };
                reject(response);
            }

            let response = { status: "deleted" };
            resolve(response);
        });
    });
};

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