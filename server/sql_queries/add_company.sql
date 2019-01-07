INSERT INTO company (name, rating) VALUES ('FSB', 99.9);

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