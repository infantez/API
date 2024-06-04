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

/* ROLES */
INSERT INTO roles (id, name, image, route) VALUES ('ADMIN', 'Administrador', 'https://firebasestorage.googleapis.com/v0/b/storeapp-3e304.appspot.com/o/5322033.png?alt=media&token=eee4083e-a4c3-4f72-8859-b1330a7d90f1', 'admin_graph' );
INSERT INTO roles (id, name, image, route) VALUES ('CLIENT', 'Cliente', 'https://firebasestorage.googleapis.com/v0/b/storeapp-3e304.appspot.com/o/6009864.png?alt=media&token=7bffea90-8d54-4c09-b32f-54a3f5e85ae0', 'client_graph' );

/* USER */
INSERT INTO users () VALUES ('');

INSERT INTO user_has_roles (id_user, id_rol) VALUES (1, 'ADMIN');