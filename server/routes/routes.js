module.exports = (server, database) => {
    const signIn = require("../requests/sign_in_user");
    const signUp = require("../requests/sign_up_user");

    const changeUserInfo = require("../requests/edit_user_info");
    const getUserInfo = require("../requests/get_user_info");

    const ticketsForFlight = require("../requests/all_tickets_for_flight");
    const searchFlightsByCity = require("../requests/search_flights");

    const addingTickets = require("../requests/add_tickets");
    const addingFlights = require("../requests/add_flights");
    const addingPlanes = require("../requests/post_add_plane");
    const addingClasses = require("../requests/post_add_class");
    const addingAirports = require("../requests/post_add_airport");
    const addingCompanies = require("../requests/post_add_company");

    const userBooking = require("../requests/get_user_booking");
    const ticketsBooking = require("../requests/tickets_booking");
    const changeBookingStatus = require("../requests/post_confirm_booking");
    const rejection = require("../requests/post_reject_booking");

    const flights = require("../requests/all_flights");
    const airports = require("../requests/all_airports");
    const planes = require("../requests/all_planes");
    const classes = require("../requests/all_classes");
    const companies = require("../requests/all_companies");

    const ticketController = require("../requests/ticket_controller");
    const flightController = require("../requests/flight_controller");


    server.post('/login', postSignIn);
    server.post('/register', postSignUp);
    server.post('/user/change', postChangeUserInfo); // TODO images url sending
    server.post('/user/get', postGetUserInfo); // TODO images url parsing

    server.post('/book-tickets', postBookTickets);
    server.post('/booking/confirm', postConfirmBooking);

    server.post('/admin/add-tickets', postAddTickets);
    server.post('/admin/add-ticket', postAddTicket);
    server.post('/admin/add-flight', postAddFlight);
    server.post('/admin/add-flights', postAddFlights);
    server.post('/class/add', postAddClass);
    server.post('/airport/add', postAddAirport);
    server.post('/plane/add', postAddPlane);
    server.post('/company/add', postAddCompany);

    server.post('/delete/flight', postDeleteFlight);
    server.post('/delete/ticket', postDeleteTicket);
    // server.post('/company/del' ,postDeleteCompany);
    // server.post('/airport/del', postDeleteAirport);
    // server.post('plane/del', postDeletePlane);

    server.post('/reject/booking', postRejectBooking);

    server.get('/flights', getFlights);
    server.get('/flight/tickets', getTicketsForFlight);
    server.get('/search-flights-by-two-cities', getSearchFlightsTwo);
    server.get('/search-flights-by-city', getSearchFlightsOne);
    server.get('/user/booking', getBookingsForUser);
    server.get('/planes', getPlanes);
    server.get('/classes', getClasses);
    server.get('/airports', getAirports);
    server.get('/companies', getCompanies);
    server.get('/ticket/check-status', getCheckTicket);

    function postSignIn(req, res, next) {
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
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function postSignUp(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        signUp.checkUserExistenceBeforeAdding(database, data, next)
            .then((userState) => {
                if (!userState.isFound) {
                    console.log("response1");
                    return signUp.registerUser(database, data, next);
                } else {
                    let response = {status: "already_exists"};
                    res.send(JSON.stringify(response));
                }
            })
            .then((result) => {
                console.log("response2");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
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
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function postChangeUserInfo(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }
        console.log(data.login);
        console.log(data.password);

        changeUserInfo.checkUserAccess(database, data, next)
            .then((result) => {
                console.log("response1");
                console.log("length" + result.length);
                if (result.length !== 0) {
                     return changeUserInfo.editUserInfo(database, result[0].idUser, data, next);
                } else {
                    let response = {status: "not_such_user"};
                    res.send(JSON.stringify(response));
                }
            })
            .then((newResult) => {
                console.log("response2");
                res.send(JSON.stringify(newResult));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
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
                let response = {status: "error"};
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
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function postBookTickets(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        ticketsBooking.checkUserAccess(database, data, next)
            .then((result) => {
                console.log("response1");
                if (result.length !== 0) {
                    data.idUser = result[0].idUser;
                    return ticketsBooking.createBooking(database, data, next);
                } else {
                    let response = {status: "not_found"};
                    res.send(JSON.stringify(response));
                }
            })
            .then((newResult) => {
                data.idBooking = newResult;
                return ticketsBooking.createTicketsInBooking(database, data, next);
            })
            .then(() => {
                console.log("response3");
                data.isBooked = true;
                return ticketsBooking.changeTicketsStatus(database, data, next);

            }).then((resp) => {
                console.log("response4");
                res.send(JSON.stringify(resp));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function postRejectBooking(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        ticketsBooking.checkUserAccess(database, data, next)
            .then((result) => {
                console.log("response1");
                if (result.length !== 0) {
                    data.idUser = result[0].idUser;
                    return rejection.getBookingTickets(database, data, next);
                } else {
                    let response = {status: "not_found"};
                    res.send(JSON.stringify(response));
                }
            })
            .then(() => {
                return rejection.deleteAllTicketsFromBooking(database, data, next);
            })
            .then((newResult) => {
                return rejection.rejectBooking(database, data, next);
            })
            .then(() => {
                console.log("response3");
                data.isBooked = false;
                return ticketsBooking.changeTicketsStatus(database, data, next);
            }).then((resp) => {
                console.log("response4");
                let response = {status: "rejected"};
                res.send(JSON.stringify(response));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = {status: "error"};
                res.send(JSON.stringify(response));
            });
    }

    function getCheckTicket(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        ticketsForFlight.checkTicketStatus(database, data, next)
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

    function postAddClass(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingClasses.addClass(database, data, next)
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

    function postAddAirport(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingAirports.addAirport(database, data, next)
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

    function postAddPlane(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingPlanes.addPlane(database, data, next)
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

    function postAddCompany(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        addingCompanies.addCompany(database, data, next)
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

    function postDeleteFlight(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        ticketController.deleteTickets(database, data, next)
            .then(() => {
                console.log("response1");
                return flightController.deleteFlight(database, data, next);
            })
            .then((result) => {
                console.log("response2");
                res.send(JSON.stringify(result));
            })
            .catch((error) => {
                console.log("reject: " + error);
                let response = { status: "error" };
                res.send(JSON.stringify(response));
            });
    }

    function postDeleteTicket(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        ticketController.deleteTicket(database, data, next)
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

    function postConfirmBooking(req, res, next) {
        const data = req.body;
        if (!req.body) {
            res.send("error no body");
        }

        console.log(req.body.idBooking);

        changeBookingStatus.confirmBooking(database, data, next)
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

    function getBookingsForUser(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        userBooking.bookingForUser(database, data, next)
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

    function getPlanes(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        planes.getAllPlanes(database, data, next)
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

    function getAirports(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        airports.getAllAirports(database, data, next)
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

    function getClasses(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        classes.getAllClasses(database, data, next)
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

    function getCompanies(req, res, next) {
        const data = req.query;
        if (!req.query) {
            res.send("error no query");
        }

        companies.getAllCompanies(database, data, next)
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