DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE company_db;
USE departments_db;

CREATE TABLE department(
    id INT,
    dept_names TEXT
    --add primary key ID
);

CREATE TABLE roles (
    id INT,
    title TEXT,
    salary INT,
    dept_id INT

);

CREATE TABLE employees(
    id INT,
    first_name TEXT,
    last_name TEXT,
    role_id INT,
    manager-id INT
);
