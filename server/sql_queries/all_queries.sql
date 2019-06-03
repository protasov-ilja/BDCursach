1. getAllAirports
SELECT
    airport.id_airport AS idAirport,
    airport.name,
    airport.location
FROM airport;

2. getAllClasses
SELECT
    class.id_class AS idClass,
    class.name,
    class.description
FROM class;

3. getAllCompanies
SELECT
    company.id_company AS idCompany,
    company.name AS name,
    company.rating AS rating
FROM company;

4. getAllPlanes
SELECT
    plane.id_plane AS idPlane,
    plane.type AS type,
    plane.id_company AS idCompany
FROM plane;

5. bookingForUser
SELECT
    booking.id_booking AS idBooking
    , booking.status AS status
    , booking.number_card AS cardNumber
    , booking.date AS date
    , SUM(ticket_in_booking.price) AS bookingPrice
FROM booking
    LEFT JOIN user USING (id_user)
    LEFT JOIN ticket_in_booking USING (id_booking)
WHERE login = ? AND password = ?
GROUP BY id_booking;

6. confirmBooking
UPDATE booking
SET status = 'payed'
WHERE id_booking = ?;

7. getBookingTickets
SELECT
    id_ticket AS idTicket
FROM ticket_in_booking
WHERE id_booking = ?;

8. deleteAllTicketsFromBooking
DELETE
FROM ticket_in_booking
WHERE id_booking = ?;

9. rejectBooking
UPDATE booking
SET status = 'rejected'
WHERE id_booking = ?;

10. createBooking
INSERT INTO booking
    (date, id_user, number_card, status)
VALUES
(NOW(), ?, ?, ?);

SELECT LAST_INSERT_ID() AS newId;

11. createTicketsInBooking
INSERT INTO ticket_in_booking (
    id_ticket, id_booking,
    price, first_name_of_user,
    last_name_of_user, sex, date_of_birth)
VALUES (?, ?, ?, ?, ?, ?, ?);

12. getTicketsInBooking
SELECT
    id_ticket AS idTicket,
    id_booking AS idBooking,
    price,
    first_name_of_user AS firstName,
    last_name_of_user AS lastName,
    sex,
    date_of_birth AS dateOfBirth
FROM ticket_in_booking
WHERE id_booking = ?;

13. deleteFlight
DELETE
FROM flight
WHERE id_flight = ?;

14. getAllFlights
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
    LEFT JOIN company ON company.id_company = plane.id_company;

15. addFlight
INSERT INTO flight (id_plane, id_airport, point_of_departure, point_of_destination, time_of_departure, time_of_destination)
VALUES (?, ?, ?, ?, ?, ?);

16. addAirport
INSERT INTO airport (name, location) VALUES (?, ?);

17. addClass
INSERT INTO class (name, description) VALUES (?, ?);

18. addCompany
INSERT INTO company (name, rating) VALUES (?, ?);

19. addPlane
INSERT INTO plane (type, id_company) VALUES (?, ?);

20. searchFlights
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
WHERE point_of_departure LIKE ? AND point_of_destination LIKE ?;

21. changeTicketsStatus
UPDATE ticket
SET is_booked = ?
WHERE id_ticket = ?;

22. deleteTickets
DELETE
FROM ticket
WHERE id_flight = ?;

23. addTickets
INSERT INTO ticket (id_flight, id_class, price, decription, place_number)
VALUES (?, ?, ?, ?, ?);

24. getAllTicketsForFlight
SELECT
    ticket.id_ticket AS idTicket,
    ticket.price AS price,
    ticket.place_number AS placeNumber,
    class.name AS name,
    class.description AS classDescription,
    ticket.decription AS ticketDescription
FROM ticket
    LEFT JOIN class ON class.id_class = ticket.id_class
WHERE ticket.id_flight = ? AND ticket.is_booked = FALSE;

25. getAllTicketsForAdmin
SELECT
    ticket.id_ticket AS idTicket,
    ticket.price AS price,
    ticket.place_number AS placeNumber,
    class.name AS name,
    class.description AS classDescription,
    ticket.decription AS ticketDescription,
    ticket.is_booked AS isBooked
FROM ticket
    LEFT JOIN class ON class.id_class = ticket.id_class
WHERE ticket.id_flight = ?;

26. checkTicketStatus
SELECT
    ticket.id_ticket AS idTicket
FROM ticket
    LEFT JOIN class ON class.id_class = ticket.id_class
WHERE ticket.id_ticket = ? AND ticket.is_booked = FALSE;

27. checkUserAccess
SELECT
    id_user AS idUser
FROM user
WHERE login = ? AND password = ?;

28. loginUser
SELECT
    login,
    password,
    status
FROM user
WHERE password = ? AND login = ?;

29. checkUserExistenceBeforeAdding
SELECT
    login
FROM user
WHERE login = ?;

30. registerUser
INSERT INTO user (
    login,
    password,
    first_name,
    last_name,
    status,
    date_of_birth,
    address,
    sex,
    url_image)
VALUES (
?, ?, ?, ?, ?, ?, ?, ?, ?);

31. getUser
SELECT
    id_user AS idUser
    , first_name AS firstName
    , last_name AS lastName
    , status
    , date_of_birth AS dateOfBirth
    , address
    , sex
    , url_image AS urlImage
FROM user
WHERE password = ? AND login = ?;

32. editUserInfo
UPDATE user SET
    password = ?
    , first_name = ?
    , last_name = ?
    , status = ?
    , date_of_birth = ?
    , address = ?
    , sex = ?
    , url_image = ?
WHERE id_user = ?;














