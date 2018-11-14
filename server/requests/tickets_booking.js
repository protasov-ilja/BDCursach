
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
                let response = { status: "err in query" };
                console.log("err in query");
                reject(response);
            }

            resolve(result);
        });
    });
};

exports.createBooking = function(database, idUser, data, next) {
  return new Promise(async (resolve, reject) => {
      console.log("createBooking");
      let sql = `INSERT INTO booking (date, id_user, number_card, status) VALUES (NOW(), ?, ?, ?)`;
      database.query(sql, [idUser, "123123", "booked"], (err, result) => {
          if (err) {
              let response = { status: "err in query" };
              reject(response);
          }

          let newSql = `SELECT LAST_INSERT_ID()`;
          database.query(newSql, (err, newResult) => {
              if (err) {
                  let response = { status: "err in query" };
                  reject(response);
              }

              console.log(newResult[0]);
              resolve(newResult);
          });
      });
  })
};

exports.createTicketsInBooking = function(database, idBooking, data, next) {
    return new Promise(async (resolve, reject) => {
        console.log("createBooking");
        for (let i = 0; i < data.tickets.length; ++i)
        {
            let sql = `INSERT INTO ticket_in_booking (id_ticket, id_booking, price, first_name_of_user, last_name_of_user, sex, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
            database.query(sql, [data.tickets[i].idTicket, idBooking, data.tickets[i].price, data.tickets[i].firstName, data.tickets[i].lastName, data.tickets[i].sex], (err, result) => {
                if (err) {
                    let response = { status: "err in query" };
                    reject(response);
                }
            });
        }

        resolve();
    })
};