INSERT INTO company (name, rating) VALUES ('FSB', 99.9);
INSERT INTO company (name, rating) VALUES ('Pobeda', 0.1);
INSERT INTO company (name, rating) VALUES ('RusAero', 50.0);
INSERT INTO company (name, rating) VALUES ('UralskieAirlines', 50.0);
INSERT INTO company (name, rating) VALUES ('Aeroflot', 0.1);
INSERT INTO company (name, rating) VALUES ('Russia', 50.0);
INSERT INTO company (name, rating) VALUES ('S7 Airlines', 50.0);

SELECT
			booking.id_booking AS idBooking
          , booking.status AS status
          , booking.number_card AS cardNumber
          , booking.date AS date
          , SUM(ticket_in_booking.price)
		FROM booking
        LEFT JOIN ticket_in_booking USING (id_booking)
			WHERE id_user = 1
            GROUP BY id_booking;