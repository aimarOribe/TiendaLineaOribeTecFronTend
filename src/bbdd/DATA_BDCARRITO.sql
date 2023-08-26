insert into ROL (Nombre) VALUES ('Administrador','Empleado','Supervisor')

go

insert into Menu(nombre,icono,url) values
('DashBoard','dashboard','/pages/dashboard'),
('Usuarios','group','/pages/usuarios'),
('Productos','collections_bookmark','/pages/productos'),
('Venta','currency_exchange','/pages/venta'),
('Historial Ventas','edit_note','/pages/historial_venta'),
('Reportes','receipt','/pages/reportes')

go

--menus para administrador
insert into MenuRol(idMenu,idRol) values
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1)

go

--menus para empleado
insert into MenuRol(idMenu,idRol) values
(4,2),
(5,2)

go

--menus para supervisor
insert into MenuRol(idMenu,idRol) values
(3,3),
(4,3),
(5,3),
(6,3)

SELECT * FROM USUARIO

INSERT INTO USUARIO (IdRol, Nombres, Apellidos, Correo, Clave) 
VALUES (1,'Aimar Glover', 'Oribe Vigo', 'aimaroribevigo@gmail.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')

SELECT * FROM CATEGORIA

INSERT INTO CATEGORIA (Descripcion) 
VALUES ('Tecnologia'), ('Muebles'), ('Dormitorio'), ('Deportes')

SELECT * FROM MARCA

INSERT INTO MARCA (Descripcion) 
VALUES ('SONYTE'), ('HPTE'), ('LGPE'), ('HYUNDAITE'), ('CANONTE'), ('ROBERTA ALLENTE')

SELECT * FROM DEPARTAMENTO

INSERT INTO DEPARTAMENTO (IdDepartamento, Descripcion)
VALUES ('01', 'Arequipa'), ('02', 'Ica'), ('03', 'Lima')

SELECT * FROM PROVINCIA

INSERT INTO PROVINCIA (IdProvincia, Descripcion, IdDepartamento)
VALUES ('0101', 'Arequipa', '01'), ('0102', 'Camana', '01'), ('0201', 'Ica', '02'), ('0202', 'Chincha', '02'), ('0301', 'Lima', '03'), ('0302', 'Barranca', '03')

SELECT * FROM DISTRITO

INSERT INTO DISTRITO (IdDistrito, Descripcion, IdProvincia, IdDepartamento)
VALUES ('010101', 'Nieva', '0101', '01'),
('010102', 'El Cenepa', '0101', '01'),
('010201', 'Camaná', '0102', '01'),
('010202', 'El Cenepa', '0102', '01'),
('020101', 'Ica', '0101', '02'),
('020102', 'La Tinguiña', '0201', '02'),
('020201', 'Chincha Alta', '0202', '02'),
('020202', 'Alto Laran', '0202', '02'),
('030101', 'Lima', '0301', '03'),
('030102', 'Ancón', '0301', '03'),
('030201', 'Barranca', '0302', '03'),
('030202', 'Paramonga', '0302', '03')