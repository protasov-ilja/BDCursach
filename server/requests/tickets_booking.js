
exports.checkUserAccess = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("checkUserAccess");
        let sql = `
		SELECT 
			id_user AS idUser 
		FROM user 
			WHERE login = ? AND password = ?`;
        database.query(sql, [data.login, data.password], (err, result) => {
            if (err) {
                let response = "err in query";
                console.log("err in query");
                reject(response);
            }

            console.log(result.length);
            for (let obj in result) {
                console.log(obj.idUser);
            }

            resolve(result);
        });
    });
};

exports.createBooking = function(database, idUser, next) {
  return new Promise(async (resolve, reject) => {
      console.log("createBooking");
      let status = "booked";
      console.log(idUser, card, status);
      let sql = `INSERT INTO booking (date, id_user, number_card, status) VALUES (NOW(), ?, ?, ?)`;
      database.query(sql, [idUser, card, status], (err, result) => {
          if (err) {
              let response = "err in query";
              reject(response);
          }

          let newSql = `SELECT LAST_INSERT_ID() AS newId`;
          database.query(newSql, (err, newResult) => {
              if (err) {
                  let response = "err in query";
                  reject(response);
              }

              console.log(newResult[0].newId);
              resolve(newResult[0].newId);
          });
      });
  });
};

exports.createTicketsInBooking = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("createTicketsInBooking");
        let sql = `
          INSERT INTO ticket_in_booking (id_ticket, id_booking, price, first_name_of_user, last_name_of_user, sex, date_of_birth) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`;
        for (let ticket of data.tickets) {
            console.log(ticket.idTicket, data.idBooking, ticket.price, ticket.firstName, ticket.lastName, ticket.sex, ticket.dateOfBirth);
            database.query(sql, [ticket.idTicket, data.idBooking, ticket.price, ticket.firstName, ticket.lastName, ticket.sex, ticket.dateOfBirth], (err, result) => {
                if (err) {
                    let response = { status: "err in query" };
                    reject(response);
                }
            });
        }

        let response = { idBooking: idBooking };
        resolve(response);
    });
};