create database DBCARRITO
go
use DBCARRITO
go
create table ROL(
	IdRol int primary key identity,
	Nombre varchar(50),
	FechaRegistro datetime default getdate()
)
go
create table MENU(
	IdMenu int primary key identity,
	Nombre varchar(50),
	Icono varchar(50),
	url varchar(50)
)
go
create table MENUROL(
	IdMenuRol int primary key identity,
	IdMenu int references MENU(IdMenu),
	IdRol int references ROL(IdRol)
)
go
create table CONFIGURACION(
	Recurso varchar(50),
	Propiedad varchar(50),
	Valor varchar(60)
)
go
create table CATEGORIA(
	IdCategoria int primary key identity,
	Descripcion varchar(100),
	Activo bit default 1,
	FechaRegistro datetime default getDate()
)
go
create table MARCA(
	IdMarca int primary key identity,
	Descripcion varchar(100),
	Activo bit default 1,
	FechaRegistro datetime default getDate()
)
go
create table PRODUCTO(
	IdProducto int primary key identity,
	Nombre varchar(500),
	Decripcion varchar(100),
	IdMarca int references MARCA(IdMarca),
	IdCategoria int references CATEGORIA(IdCategoria),
	Precio decimal(10,2) default 0,
	Stock int,
	RutaImagen varchar(100),
	NombreImagen varchar(100),
	Activo bit default 1,
	FechaRegistro datetime default getDate()
)
go
create table CLIENTE(
	IdCliente int primary key identity,
	Nombres varchar(500),
	Apellidos varchar(500),
	Correo varchar(100),
	Clave varchar(150),
	Reestablecer bit default 0,
	FechaRegistro datetime default getDate()
)
go
create table CARRITO(
	IdCarrito int primary key identity,
	IdCliente int references CLIENTE(IdCliente),
	IdProducto int references PRODUCTO(IdProducto),
	Cantidad int
)
go
create table VENTA(
	IdVenta int primary key identity,
	IdCliente int references CLIENTE(IdCliente),
	TotalProducto int,
	MontoTotal decimal(10,2),
	Contacto varchar(50),
	IdDistrito varchar(10),
	Telefono varchar(50),
	Direccion varchar(500),
	IdTransaccion varchar(50),
	FechaVenta datetime default getDate()
)
go
create table DETALLEVENTA(
	IdDetalleVenta int primary key identity,
	IdVenta int references VENTA(IdVenta),
	IdProducto int references PRODUCTO(IdProducto),
	Cantidad int,
	Precio decimal(10,2)
	Total decimal(10,2)
)
go
create table USUARIO(
	IdUsuario int primary key identity,
	IdRol int references ROL(IdRol),
	Nombres varchar(100),
	Apellidos varchar(100),
	Correo varchar(100),
	Clave varchar(150),
	Reestablecer bit default 1,
	Activo bit default 1,
	FechaRegistro datetime default getDate()
)
go
create table DEPARTAMENTO(
	IdDepartamento varchar(2) NOT NULL,
	Descripcion varchar(45) NOT NULL
)
go
create table PROVINCIA(
	IdProvincia varchar(4) NOT NULL,
	Descripcion varchar(45) NOT NULL,
	IdDepartamento varchar(2) NOT NULL,
)
go
create table DISTRITO(
	IdDistrito varchar(6) NOT NULL,
	Descripcion varchar(45) NOT NULL,
	IdProvincia varchar(4) NOT NULL,
	IdDepartamento varchar(2) NOT NULL,
)
