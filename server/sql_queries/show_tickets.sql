SELECT
  ticket.id_ticket,
  ticket.price,
  class.name,
  class.description,
  ticket.decription
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