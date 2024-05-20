CREATE DATABASE StoreApp;
USE StoreApp;

SELECT * from roles;
SELECT * from user_has_roles;
SELECT * from users;

TRUNCATE TABLE user_has_roles;
TRUNCATE TABLE roles;
TRUNCATE TABLE users;

DROP TABLE user_has_roles;
DROP TABLE roles;
DROP TABLE users;