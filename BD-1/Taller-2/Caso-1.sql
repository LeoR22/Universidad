
create database Caso1;
Use Caso1;


-- Crear tabla TarjetaCredito
CREATE TABLE TarjetaCredito (
    id_tarjetaCredito INT PRIMARY KEY,
    nombreTarjetaHabiente VARCHAR(45),
    numeroTarjeta INT UNIQUE,
    Franquicia VARCHAR(45),
    fechaVencimiento DATE
);

-- Crear tabla AsistenteSistema
CREATE TABLE AsistenteSistema (
    id_asistente INT PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Crear tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY,
    nombres VARCHAR(45),
    apellidos VARCHAR(45),
    identificacion INT UNIQUE,
    fechaNacimiento DATE,
    Direccion VARCHAR(55),
    Telefono INT(10),
    id_tarjetaCredito INT,
    id_asistente int,
    FOREIGN KEY (id_tarjetaCredito) REFERENCES TarjetaCredito(id_tarjetaCredito),
    FOREIGN KEY (id_asistente) REFERENCES AsistenteSistema(id_asistente)
);


-- Crear tabla Bicicleta
CREATE TABLE Bicicleta (
    id_bicicleta INT PRIMARY KEY,
    numero INT UNIQUE,
    modelo VARCHAR(25),
    color VARCHAR(25),
    estado VARCHAR(25)
);

-- Crear tabla EstacionTransporteMasivo
CREATE TABLE EstacionTransporte (
    id_estacion INT PRIMARY KEY,
    numero VARCHAR(25),
    nombre VARCHAR(25),
    direccion VARCHAR(45)
);

-- Crear tabla Recibo
CREATE TABLE Recibo (
    id_recibo INT PRIMARY KEY,
    Valor DECIMAL(10, 2),
    EstacionInicioID INT,
    FechaHoraInicio DATETIME,
    EstacionFinalizacionID INT,
    FechaHoraFinalizacion DATETIME,
    id_usuario int,
    id_estacion int,
    FOREIGN KEY (id_estacion) REFERENCES EstacionTransporte(id_estacion),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Crear tabla de asignación para la relación muchos a muchos entre Bicicleta y EstacionTransporteMasivo
CREATE TABLE BicicletaEstacion (
    id_bicicleta INT,
    id_estacion INT,
    PRIMARY KEY (id_bicicleta, id_estacion),
    FOREIGN KEY (id_bicicleta) REFERENCES Bicicleta(id_bicicleta),
    FOREIGN KEY (id_estacion) REFERENCES EstacionTransporte(id_estacion)
);
