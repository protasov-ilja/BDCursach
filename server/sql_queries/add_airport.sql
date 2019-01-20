INSERT INTO airport (id_airport, name, location) VALUES (2, 'Medvedkovo', 'Moscow');
INSERT INTO airport (id_airport, name, location) VALUES (2, 'Medvedkovo', 'Moscow');
INSERT INTO airport (id_airport, name, location) VALUES (3, 'NewYorkAirport', 'NewYork');
INSERT INTO airport (id_airport, name, location) VALUES (4, 'SidneyAirport', 'Sidney');
INSERT INTO airport (id_airport, name, location) VALUES (5, 'ParisAirport', 'Paris');
INSERT INTO airport (id_airport, name, location) VALUES (6, 'Airport1', 'NewYork');
INSERT INTO airport (id_airport, name, location) VALUES (7, 'KasanAirport', 'Kasan');


INSERT INTO booking (date, id_user, number_card, status) VALUES (NOW(), 1, '123', '123');



SELECT
    `user`.id
	booking.id_booking AS idBooking
    , booking.status AS status
    , booking.number_card AS cardNumber
    , booking.date AS date
		FROM booking
          LEFT JOIN `user` USING(id_user)
			WHERE login = 'user' AND password = '123';


SELECT
                 booking.id_booking AS idBooking
              , booking.status AS status
              , booking.number_card AS cardNumber
              , booking.date AS date
              , SUM(ticket_in_booking.price) AS bookingPrice
          FROM booking
                LEFT JOIN `user` USING (id_user)
          LEFT JOIN ticket_in_booking USING (id_booking)
                WHERE login = 'user' AND password = '123'
        GROUP BY id_booking;
