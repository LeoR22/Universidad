drop database if exists taller82;
CREATE DATABASE taller82;
USE taller82;

CREATE TABLE NAVES (
  matricula VARCHAR(10) PRIMARY KEY,
  fabricante VARCHAR(10) NULL,
  modelo INT NOT NULL CHECK (modelo > 1500),
  num_pasajeros INT NOT NULL CHECK (num_pasajeros > 0)
);

CREATE TABLE PERSONAL (
  identificacion INT PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL,
  ocupacion VARCHAR(20) NOT NULL CHECK (ocupacion IN ('piloto', 'auxiliar'))
);

CREATE TABLE CIUDADES (
  codigo INT PRIMARY KEY CHECK (codigo > 0),
  nombre VARCHAR(30) NOT NULL
);

CREATE TABLE RUTAS (
  identificador VARCHAR(10) PRIMARY KEY,
  ciudadOrigen INT NOT NULL,
  tiempo INT NULL CHECK (tiempo > 0),
  codigo INT NOT NULL,
  FOREIGN KEY (codigo) REFERENCES CIUDADES(codigo),
  FOREIGN KEY (ciudadOrigen) REFERENCES CIUDADES(codigo)
);

CREATE TABLE VUELOS (
  numero INT PRIMARY KEY CHECK (numero > 99 AND numero < 1000),
  fecha DATE NOT NULL,
  empresa VARCHAR(2),
  hora TIME NOT NULL,
  identificador VARCHAR(10) NOT NULL,
  matricula VARCHAR(10) NOT NULL,
  FOREIGN KEY (identificador) REFERENCES RUTAS(identificador),
  FOREIGN KEY (matricula) REFERENCES NAVES(matricula)
);

CREATE TABLE ASIGNACIONES (
  identificacion INT PRIMARY KEY,
  numero INT NOT NULL,
  empresa VARCHAR(2) NOT NULL,
  cargo VARCHAR(20) NULL CHECK (cargo IN ('piloto', 'copiloto', 'jefe cabina', 'auxiliar')),
  FOREIGN KEY (numero) REFERENCES VUELOS(numero),
  FOREIGN KEY (identificacion) REFERENCES PERSONAL(identificacion)
);

