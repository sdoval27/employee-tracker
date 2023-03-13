USE company_db;

INSERT INTO department(dept_names)
    VALUES('sales'),
         ('accounting'),
         ('law');

INSERT INTO roles(title, salary, dept_id)
VALUES('sales associate', 80000.00, 1),
('accountant', 90000.00, 2),
('lawyer', 100000.00, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('John', 'Doe', 1, NULL),
("Susan", "Sarandon", 2, 1),
("Peake", "Doval", 3, 2);