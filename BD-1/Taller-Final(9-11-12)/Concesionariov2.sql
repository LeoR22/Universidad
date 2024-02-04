DROP DATABASE IF EXISTS Concesionario;

-- Crear la base de datos Concesionario
CREATE DATABASE Concesionario;
USE Concesionario;

-- Create tabla Tipo Vehiculo
CREATE TABLE TipoVehiculo(
    ID_Tipo INT PRIMARY KEY,
    DescripcionVehiculo VARCHAR(35)    
);

-- Crear tabla Vehiculos
CREATE TABLE Vehiculo (
    ID_Vehiculo INT PRIMARY KEY,
    Marca VARCHAR(50),
    Modelo VARCHAR(50),
    ID_Tipo INT,
    Placa VARCHAR(20),
    Cantidad_puertas INT,
    Cantidad_airbags INT,
    Fecha_Ingreso DATE,
    Tiene_camara_reversa BOOLEAN,
    Tipo_caja VARCHAR(50),
    Cilindraje INT,
    Numero_motor VARCHAR(50),
    Valor_estimado DECIMAL(10, 2),
    Color VARCHAR(50),
     FOREIGN KEY (ID_Tipo) REFERENCES TipoVehiculo(ID_Tipo)
);

-- Crear tabla Vehiculos_Usados
CREATE TABLE VehiculoUsado (
    ID_Vehiculo INT PRIMARY KEY,
    Kilometraje INT,
    Cant_dueños_anteriores INT,
    Observaciones_estado TEXT,    
    FOREIGN KEY (ID_Vehiculo) REFERENCES Vehiculo(ID_Vehiculo)
);

-- Crear tabla Ventas
CREATE TABLE Venta (
    ID_Venta INT PRIMARY KEY,
    ID_Vehiculo INT,
    Valor_venta DECIMAL(10, 2),
    Descuento DECIMAL(10, 2),
    Fecha_venta DATE,    
    Ciudad_registro VARCHAR(50),
    FOREIGN KEY (ID_Vehiculo) REFERENCES Vehiculo(ID_Vehiculo)
);

-- Crear tabla Clientes
CREATE TABLE Cliente (
    ID_Cliente INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Contacto VARCHAR(50),
    email VARCHAR(50),
    telefono VARCHAR(10),
    Identificacion VARCHAR(20)
);

-- Crear tabla Interacciones_Clientes
CREATE TABLE InteraccioneCliente (
    ID_Interaccion INT PRIMARY KEY,
    ID_Cliente INT,
    ID_Vehiculo INT,
    Carro_interes VARCHAR(50),
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente),
    FOREIGN KEY (ID_Vehiculo) REFERENCES Vehiculo(ID_Vehiculo)
);

-- Crear tabla Separacion_Vehiculo
CREATE TABLE SeparacionVehiculo (
    ID_Separacion INT PRIMARY KEY,
    ID_Cliente INT,
    ID_Vehiculo INT,
    Abono DECIMAL(10, 2),
    Fecha_separacion DATE,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente),
    FOREIGN KEY (ID_Vehiculo) REFERENCES Vehiculo(ID_Vehiculo)
);

-- Crear tabla Pagos
CREATE TABLE Pago (
    ID_Pago INT PRIMARY KEY,
    ID_Separacion INT,
    Banco VARCHAR(50),
    Tasa DECIMAL(5, 2),
    Valor DECIMAL(10, 2),
    Fecha_pago DATE,
    FOREIGN KEY (ID_Separacion) REFERENCES SeparacionVehiculo(ID_Separacion)
);

-- Crear tabla Entrega_Vehiculo
CREATE TABLE EntregaVehiculo (
    ID_Entrega INT PRIMARY KEY,
    ID_Separacion INT,
    Fecha_entrega DATE,
    FOREIGN KEY (ID_Separacion) REFERENCES SeparacionVehiculo(ID_Separacion)
);

-- Crear tabla Cambios_Vehiculo
CREATE TABLE CambiosVehiculo (
    ID_Cambio INT PRIMARY KEY,
    ID_Separacion INT,
    Cambio_realizado VARCHAR(100),
    Fecha_cambio DATE,
    FOREIGN KEY (ID_Separacion) REFERENCES SeparacionVehiculo(ID_Separacion)
);

-- Crear tabla Colores Vehiculo
CREATE TABLE Color(
    ID_Color INT PRIMARY KEY,
    DescripcionColor VARCHAR(25),
    Cantidad INT
);

-- Inserciones para TipoVehiculo
INSERT INTO TipoVehiculo (ID_Tipo, DescripcionVehiculo) VALUES
(1, 'Sedán'),
(2, 'SUV'),
(3, 'Camioneta'),
(4, 'Hatchback'),
(5, 'Coupé');

-- Inserciones para Vehiculo
INSERT INTO Vehiculo (ID_Vehiculo, Marca, Modelo, ID_Tipo, Placa, Cantidad_puertas, Cantidad_airbags, 
                      Fecha_Ingreso, Tiene_camara_reversa, Tipo_caja, Cilindraje, Numero_motor, 
                      Valor_estimado, Color)
VALUES
(1, 'Toyota', 'Corolla', 1, 'ABC123', 4, 6, '2023-01-15', true, 'Automática', 2000, '123456', 25000.00, 'Azul'),
(2, 'Honda', 'CR-V', 2, 'XYZ789', 5, 8, '2023-02-20', false, 'CVT', 2200, '789012', 32000.00, 'Gris'),
(3, 'Ford', 'Explorer', 3, 'DEF456', 4, 10, '2023-03-25', true, 'Automática', 3000, '345678', 45000.00, 'Negro'),
(4, 'Volkswagen', 'Golf', 4, 'GHI789', 3, 6, '2023-04-10', false, 'Manual', 1800, '678901', 20000.00, 'Rojo'),
(5, 'BMW', 'M4', 5, 'JKL012', 2, 8, '2023-05-05', true, 'Automática', 3500, '901234', 60000.00, 'Blanco');

-- Inserciones para VehiculoUsado
INSERT INTO VehiculoUsado (ID_Vehiculo, Kilometraje, Cant_dueños_anteriores, Observaciones_estado) VALUES
(1, 15000, 1, 'Excelente estado, único dueño'),
(2, 30000, 2, 'Algunos rasguños, dos dueños anteriores'),
(3, 20000, 1, 'Buen estado, bien mantenido'),
(4, 40000, 3, 'Necesita reparaciones menores'),
(5, 10000, 1, 'Prácticamente nuevo, sin problemas');

-- Inserciones para Venta
INSERT INTO Venta (ID_Venta, ID_Vehiculo, Valor_venta, Descuento, Fecha_venta, Ciudad_registro) VALUES
(1, 1, 23000.00, 1000.00, '2023-01-20', 'Bogotá'),
(2, 2, 31000.00, 1500.00, '2023-02-25', 'Medellín'),
(3, 3, 42000.00, 2000.00, '2023-03-30', 'Cali'),
(4, 4, 18000.00, 800.00, '2023-04-15', 'Barranquilla'),
(5, 5, 57000.00, 2500.00, '2023-05-10', 'Cartagena');

-- Inserciones para Cliente
INSERT INTO Cliente (ID_Cliente, Nombre, Apellido, Contacto, email, telefono, Identificacion) VALUES
(1, 'Juan', 'Pérez', 'Dueño de empresa', 'juan@example.com', '1234567890', '123ABC'),
(2, 'María', 'Gómez', 'Compradora frecuente', 'maria@example.com', '9876543210', '456DEF'),
(3, 'Carlos', 'López', 'Nuevo cliente', 'carlos@example.com', '6543210987', '789GHI'),
(4, 'Laura', 'Martínez', 'Compradora ocasional', 'laura@example.com', '3210987654', '012JKL'),
(5, 'Andrés', 'Ramírez', 'Amante de los autos', 'andres@example.com', '8765432109', '345MNO');

-- Inserciones para Interacciones_Clientes
INSERT INTO InteraccioneCliente (ID_Interaccion, ID_Cliente, ID_Vehiculo, Carro_interes) VALUES
(1, 1, 1, 'Toyota Corolla'),
(2, 2, 2, 'Honda CR-V'),
(3, 3, 3, 'Ford Explorer'),
(4, 4, 4, 'Volkswagen Golf'),
(5, 5, 5, 'BMW M4');

-- Inserciones para Separacion_Vehiculo
INSERT INTO SeparacionVehiculo (ID_Separacion, ID_Cliente, ID_Vehiculo, Abono, Fecha_separacion) VALUES
(1, 1, 1, 1000.00, '2023-01-25'),
(2, 2, 2, 1500.00, '2023-03-01'),
(3, 3, 3, 2000.00, '2023-04-05'),
(4, 4, 4, 800.00, '2023-05-01'),
(5, 5, 5, 2500.00, '2023-06-01');

-- Inserciones para Pagos
INSERT INTO Pago (ID_Pago, ID_Separacion, Banco, Tasa, Valor, Fecha_pago) VALUES
(1, 1, 'Banco A', 5.5, 9000.00, '2023-02-01'),
(2, 2, 'Banco B', 6.0, 13500.00, '2023-03-10'),
(3, 3, 'Banco C', 5.8, 18000.00, '2023-04-15'),
(4, 4, 'Banco D', 5.2, 7200.00, '2023-05-10'),
(5, 5, 'Banco E', 6.5, 22500.00, '2023-06-10');

-- Inserciones para Entrega_Vehiculo
INSERT INTO EntregaVehiculo (ID_Entrega, ID_Separacion, Fecha_entrega) VALUES
(1, 1, '2023-02-10'),
(2, 2, '2023-03-15'),
(3, 3, '2023-04-20'),
(4, 4, '2023-05-15'),
(5, 5, '2023-06-15');

-- Inserciones para Cambios_Vehiculo
INSERT INTO CambiosVehiculo (ID_Cambio, ID_Separacion, Cambio_realizado, Fecha_cambio) VALUES
(1, 1, 'Instalación de accesorios', '2023-02-15'),
(2, 2, 'Pintura personalizada', '2023-03-20'),
(3, 3, 'Mejoras en el sistema de sonido', '2023-04-25'),
(4, 4, 'Reparación de carrocería', '2023-05-20'),
(5, 5, 'Modificaciones de rendimiento', '2023-06-20');

-- Inserciones para Color
INSERT INTO Color (ID_Color, DescripcionColor, Cantidad) VALUES
(1, 'Rojo', 50),
(2, 'Azul', 30),
(3, 'Negro', 40),
(4, 'Blanco', 60),
(5, 'Gris', 25);
