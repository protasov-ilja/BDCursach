INSERT INTO flight (id_plane, id_airport, point_of_departure, point_of_destination, time_of_departure, time_of_destination)
VALUES idPlane, idAirprot, pointOFDeparture, pointOfDestination, timeOfDeparture, timeOfDestination;


INSERT INTO ticket (id_flight, id_class, price, decription, place_number)
VALUES idFlight, idClass, price, description, placeNumber;

-- TODO: fix search add % to string before sql creation
SELECT * FROM flight
WHERE point_of_destination LIKE 'Moscow+ %';

 -- not working
