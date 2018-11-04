
-- get tickets
SELECT
  ticket.id_ticket AS idTicket,
  ticket.price AS price,
  class.name AS name,
  class.description AS classDescription,
  ticket.decription AS ticketDescription
FROM `ticket`
  LEFT JOIN class ON class.id_class = ticket.id_class
WHERE
  ticket.id_flight = 1;




INSERT INTO class (name, description) VALUES ('class1', 'VIP class for big boss');
INSERT INTO class (name, description) VALUES ('class2', 'VIP class');


INSERT INTO ticket (id_flight, id_class, price, decription) VALUES (1, 1, 100, 'ticket1');
INSERT INTO ticket (id_flight, id_class, price, decription) VALUES (2, 2, 200, 'ticket2');
INSERT INTO ticket (id_flight, id_class, price, decription) VALUES (2, 1, 300, 'ticket3');
INSERT INTO ticket (id_flight, id_class, price, decription) VALUES (1, 2, 400, 'ticket4');




-- authrize
SELECT
  login,
  password,
  status
FROM user
WHERE password = 'qwe' AND login = 'qwe';



SELECT
  login
FROM user
WHERE login = 'qwe';

-- get all flights
SELECT * FROM flight;


SELECT
  id_user
FROM user
WHERE login = 'qwe';


-- update user
UPDATE user SET
  password = 'qwe'
  , first_name = 'user'
  , last_name = 'user'
  , status = 'user'
  , date_of_birth = '11.11.17'
  , address = 'Moskov'
  , sex = 'male'
WHERE id_user = 1;















