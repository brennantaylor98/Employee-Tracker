USE employee_db

INSERT INTO department(name)
VALUES
('Managment'),('Sales'),('HR'),('Customer Service'),('Customer Diservice');


INSERT INTO role(title, salary, department_id)
VALUES
('Manager', 100000, 1),('Salesman', 75000, 2),('HR Person', 5, 3),('Customer Service Rep', 25000, 4),('Customer Diservice Rep', 1000000, 5);
 

INSERT INTO employee(first_name, last_name, role_id,manager_id)
VALUES
('Brennan', 'Taylor', 1123, 15096), ('John', 'Smith', 1124, NULL), ('Mike', 'Jones', 1125, NULL), ('Emma', 'Rodgers', 1126, NULL);