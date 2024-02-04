
create database Caso2;

use caso2;


-- Creación de la tabla Persona
CREATE TABLE Persona (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    direccion VARCHAR(45) NOT NULL,
    correo VARCHAR(25) NOT NULL,
    afiliacion BOOLEAN DEFAULT 0,
    mensualidad BOOLEAN,
    cancelacion BOOLEAN
);


-- Creación de la tabla Tarjeta de Crédito
CREATE TABLE TarjetaDeCredito (
    id_tarjetaCredito INT AUTO_INCREMENT PRIMARY KEY,
    numeroTarjeta VARCHAR(16) UNIQUE NOT NULL,
    tipoTarjeta VARCHAR(50) NOT NULL,
    numeroSeguridad INT NOT NULL,
    nombreDueño VARCHAR(25) NOT NULL
);


-- Creación de la tabla Cuenta
CREATE TABLE Cuenta (
    id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255),
    contrasena VARCHAR(255) NOT NULL,
    numeroUsuarios INT UNIQUE NOT NULL,
    mensualidad BOOLEAN NOT NULL,
    id_persona INT,
    id_tarjetaCredito INT UNIQUE, -- Añadir campo para la tarjeta de crédito
    FOREIGN KEY (id_persona) REFERENCES Persona (id_persona),
    FOREIGN KEY (id_tarjetaCredito) REFERENCES TarjetaDeCredito (id_tarjetaCredito) -- Relación 1 a 1
);

-- Restricción UNIQUE para asegurar que cada cuenta tenga una única tarjeta de crédito
ALTER TABLE Cuenta
ADD CONSTRAINT unique_tarjeta_credito UNIQUE (id_tarjetaCredito);



-- Creación de la tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    id_cuenta INT,
    FOREIGN KEY (id_cuenta) REFERENCES Cuenta (id_cuenta)
);


-- Creación de la tabla Artista
CREATE TABLE Artista (
    id_artista INT AUTO_INCREMENT PRIMARY KEY,
    nombreArtista VARCHAR(25) NOT NULL,
    nombreReal VARCHAR(25),
    fechaNacimiento DATE,
    fechaFallecimiento DATE
);

-- Creación de la tabla Álbum
CREATE TABLE Album (
    id_album INT AUTO_INCREMENT PRIMARY KEY,
    nombreAlbum VARCHAR(25) NOT NULL,
    anioLanzamiento INT,
    descripcion TEXT,
    premios VARCHAR(25),
    id_artista INT,
    FOREIGN KEY (id_artista) REFERENCES Artista (id_artista)
);

-- Creación de la tabla Canción
CREATE TABLE Cancion (
    id_cancion INT AUTO_INCREMENT PRIMARY KEY,
    nombreCancion VARCHAR(25) NOT NULL,
    anioLanzamiento INT,
    descripcion TEXT,
    premios VARCHAR(25),
    id_album INT,
    FOREIGN KEY (id_album) REFERENCES Album (id_album)
);

-- Creación de la tabla Lista de Reproducción
CREATE TABLE ListaReproduccion (
    id_listaReproduccion INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(55) NOT NULL,
    usuarioCreador INT,
    fechaCreacion DATE,
    privacidad BOOLEAN NOT NULL,
    id_usuario int,
    id_cancion int,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
    FOREIGN KEY (id_cancion) REFERENCES Cancion (id_cancion)
);



