module.exports = (server, database) => {
	const signIn = require("../requests/sign_in_user");
	const signUp = require("../requests/sign_up_user");
	const flights = require("../requests/all_flights");
	const changeUserInfo = require("../requests/edit_user_info");
	const getUserInfo = require("../requests/get_user_info");
	const ticketsForFlight = require("../requests/all_tickets_for_flight");
	const ticketsBooking = require("../requests/tickets_booking");
	const searchFlightsByCity = require("../requests/search_flights");
	const addingTickets = require("../requests/add_tickets");
	const addingFlights = require("../requests/add_flights");

	server.post('/login', getSignIn); // +
    server.post('/register', getSignUp); // +
    server.get('/flights', getFlights); // + next TODO показ билетов, которые еще не забронированы
    server.post('/user/change', postChangeUserInfo); // + next TODO images url sending
    server.post('/user/get', postGetUserInfo); // + next TODO images url parsing
    server.get('/flight/tickets', getTicketsForFlight); // + next TODO показ билетов, которые еще не забронированы
    server.post('/book-tickets', postBookTickets); // TODO !waiting for build!
    server.post('/admin/add-tickets', postAddTickets);
    server.post('/admin/add-ticket', postAddTicket);
	server.post('/admin/add-flight', postAddFlight);
    server.post('/admin/add-flights', postAddFlights);
	// server.post('/flight/confirm', postConfirmBooking); // TODO
	server.get('/search-flights-by-two-cities', getSearchFlightsTwo);
    server.get('/search-flights-by-city', getSearchFlightsOne);
    server.post('/delete/flight');
    server.post('/delete/ticket');

    function getSignIn(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        signIn.loginUser(database, data, next)
            .then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = { status: "error" };
                res.send(JSON.stringify(response));
            });
    }

	function getSignUp(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		signUp.checkUserExistenceBeforeAdding(database, data, next)
			.then((userState) => {
				if (!userState.isFound) {
					console.log("response1");
					signUp.registerUser(database, data, next)
						.then((result) => {
							console.log("response2");
							res.send(JSON.stringify(result));
						})
						.catch((error) => {
							console.log("reject: " + error);
                            let response = { status: "error" };
                            res.send(JSON.stringify(response));
						});
				} else {
					let response = { status: "already_exists" };
					res.send(JSON.stringify(response));
				}
			})
			.catch((error) => {
				console.log("reject: " + error);
			});
	}

	function getFlights(req, res, next) {
		flights.getAllFlights(database, next)
			.then((result) => {
				console.log("response");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
                let response = { status: "error" };
                res.send(JSON.stringify(response));
			});
	}

	function postChangeUserInfo(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		for (let ob of data) {
			console.log(ob);
		}

		console.log(data.login);
		console.log(data.password);

		changeUserInfo.checkUserAccess(database, data, next)
			.then((result) => {
				console.log("response1");
				console.log("length" + result.length);
				if (result.length !== 0) {
					changeUserInfo.editUserInfo(database, result[0].idUser, data, next)
						.then((newResult) => {
							console.log("response2");
							res.send(JSON.stringify(newResult));
						})
						.catch((error) => {
							console.log("reject: " + error);
                            let response = { status: "error" };
                            res.send(JSON.stringify(response));
						});
				} else {
					let response = { status: "not_such_user" };
					res.send(JSON.stringify(response));
				}
			})
			.catch((error) => {
				console.log("reject: " + error);
                let response = { status: "error" };
                res.send(JSON.stringify(response));
			});
	}

	function postGetUserInfo(req, res, next) {
		const data = req.body;
		if (!req.body) {
			res.send("error no body");
		}

		getUserInfo.getUser(database, data, next)
			.then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
			.catch((error) => {
				console.log("reject: " + error);
                let response = { status: "error" };
                res.send(JSON.stringify(response));
			});
	}

	function getTicketsForFlight(req, res, next) {
		const data = req.query;
		if (!req.query) {
			res.send("error no query");
		}

		ticketsForFlight.getAllTicketsForFlight(database, data, next)
			.then((result) => {
				console.log("response");
				res.send(JSON.stringify(result));
			})
			.catch((error) => {
				console.log("reject: " + error);
                let response = { status: "error" };
                res.send(JSON.stringify(response));
			});
	}

    function postBookTickets(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        for (let i of data.tickets) {
            console.log(i.idTicket, i.price, i.firstName, i.lastName, i.sex);
        }

        ticketsBooking.checkUserAccess(database, data, next)
            .then((result) => {
                console.log("response1");
				if (result.length !== 0) {
				    data.idUser = result[0].idUser;
                    ticketsBooking.createBooking(database, data, next)
						.then((newResult) => {
						    data.idBooking = newResult;
							ticketsBooking.createTicketsInBooking(database, data, next)
								.then((resp) => {
                                    console.log("response3");
                                    res.send(JSON.stringify(resp));
								})
								.catch((error) => {
                                    console.log("reject: " + error);
                                    let response = { status: "error" };
                                    res.send(JSON.stringify(response));
                                });
						})
                        .catch((error) => {
                            console.log("reject: " + error);
                            let response = { status: "error" };
                            res.send(JSON.stringify(response));
                        });
				} else {
                    let response = { status : "not_found" };
                    res.send(JSON.stringify(response));
				}
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = { status: "error" };
                res.send(JSON.stringify(response));
            });
    }

    function postAddFlights(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingFlights.addFlights(database, data, next)
            .then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }


    function postAddFlight(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingFlights.addFlight(database, data, next)
            .then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function postAddTickets(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingTickets.addTickets(database, data, next)
            .then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function postAddTicket(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingTickets.addTicket(database, data, next)
            .then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function getSearchFlightsTwo(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        searchFlightsByCity.searchFlights(database, data, next)
            .then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function getSearchFlightsOne(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        searchFlightsByCity.searchFlightsByCity(database, data, next)
            .then((result) => {
                console.log("response");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }
};