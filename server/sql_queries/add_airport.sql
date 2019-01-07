INSERT INTO airport (name, location) VALUES ('Domodedovo', 'Moscow');


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
