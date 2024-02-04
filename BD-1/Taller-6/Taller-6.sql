#CREACION Y USO DE BASE DE DATOS
drop database if exists Turismo;
CREATE DATABASE Turismo;
USE Turismo;

#CREACIÓN DE TABLAS:
#SE REALIZARON ALGUNOS AJUSTES QUE NO TENIAN COHERENCIA EN EL EJERCICIO EN EL MOMENTO DE LA CREACION DE LA BD
CREATE TABLE PAISES (
    codigo INT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    moneda VARCHAR(20) NOT NULL,
    recomendacion TEXT(100) NULL,
    vacunas VARCHAR(2) NOT NULL CHECK (vacunas IN ('Si', 'No'))
);

CREATE TABLE CIUDADES (
    codigo INT PRIMARY KEY ,
    nombre VARCHAR(50) NOT NULL,
    foto VARCHAR(30) NULL,
    idioma VARCHAR(20) NOT NULL,
    poblacion INT NOT NULL CHECK (poblacion > 0),
    cod_pais INT NOT NULL,
    CONSTRAINT fk_ciudades_paises FOREIGN KEY (cod_pais) REFERENCES PAISES(codigo)
);

CREATE TABLE HOTELES (
    numero INT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    num_estrellas INT NOT NULL,
    precios TEXT NULL,
    direccion VARCHAR(50) NOT NULL,
    parqueadero VARCHAR(2) NOT NULL CHECK (parqueadero IN ('Si', 'No')),
    pagina_web VARCHAR(50) NULL,
    cod_ciudad INT NOT NULL,
    cod_pais INT NOT NULL,
    CONSTRAINT fk_hoteles_ciudades FOREIGN KEY (cod_ciudad) REFERENCES CIUDADES(codigo),
    CONSTRAINT fk_hoteles_paises FOREIGN KEY (cod_pais) REFERENCES PAISES(codigo)
);

CREATE TABLE PLATOS_TIPICOS (
    codigo INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    receta BLOB NOT NULL,
    recomendado INT NOT NULL,
    cod_ciudad INT NOT NULL,
    cod_pais INT NOT NULL,
    CONSTRAINT fk_platos_tipicos_ciudades FOREIGN KEY (cod_ciudad) REFERENCES CIUDADES(codigo),
    CONSTRAINT fk_platos_tipicos_paises FOREIGN KEY (cod_pais) REFERENCES PAISES(codigo)
);

CREATE TABLE RESTAURANTES (
    numero INT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    tipo_comida VARCHAR(15) NULL CHECK (tipo_comida IN ('tipica', 'internacional', 'fusion')),
    precios TEXT NULL,
    direccion VARCHAR(50) NOT NULL,
    cod_ciudad INT NOT NULL,
    cod_pais INT NOT NULL,
    CONSTRAINT fk_restaurantes_ciudades FOREIGN KEY (cod_ciudad) REFERENCES CIUDADES(codigo),
    CONSTRAINT fk_restaurantes_paises FOREIGN KEY (cod_pais) REFERENCES PAISES(codigo)
);


#MODIFICACION A LA ESTRUCTURA DE LA BD
ALTER TABLE RESTAURANTES
MODIFY COLUMN tipo_comida VARCHAR(15) NOT NULL;

ALTER TABLE PLATOS_TIPICOS
ADD COLUMN descripcion VARCHAR(100) NULL AFTER receta;


ALTER TABLE HOTELES
ADD CONSTRAINT chk_estrellas CHECK (num_estrellas >= 0 AND num_estrellas <= 5);

ALTER TABLE CIUDADES
DROP COLUMN poblacion;

ALTER TABLE PAISES
ADD COLUMN estaciones BOOLEAN NOT NULL DEFAULT FALSE;


#Inserción de la información
#PARA INSERTAR INFORMACION SE INICIO CON LAS TABLAS PRINCIPALES HASTA LAS FORANEAS
describe paises;
-- PAISES
INSERT INTO PAISES (codigo, nombre, moneda, recomendacion, vacunas, estaciones) 
VALUES 
(101010, 'Colombia', 'Peso', 'Tenga cuidado con paseos a la selva', 'No', FALSE),
(202020, 'China', 'Yuan', 'No olvide visitar Machu Pichu, patrimonio de la humanidad', 'Si', TRUE),
(303030, 'Perú', 'Sol', 'Forma parte de los Emiratos Árabes Unidos', 'No', FALSE),
(404040, 'Dubai', ' ', NULL, 'Si', TRUE);


-- CIUDADES
describe ciudades;
INSERT INTO CIUDADES (codigo, nombre, foto, idioma, cod_pais)
VALUES
    (10,'Cali', null, 'Español', 101010),
    (20,'Medellin', null, 'Español', 101010),
	(30, 'Pekin', null, 'Español', 202020);

-- HOTELES
describe hoteles;
#se realiza actualizacion campo:
ALTER TABLE HOTELES
ADD COLUMN moneda VARCHAR(3) AFTER precios;

INSERT INTO HOTELES (numero, nombre, num_estrellas, precios, moneda, direccion, parqueadero, pagina_web, cod_ciudad, cod_pais) 
VALUES 
(10, 'Intercontinental', 5, '200000 - 900000', 'COP', 'Avenida Colombia # 2 -72', 'Si', 'www.intercontinentalcali.com', 10, 101010),
(20, 'Mudejar', 1, '50000-120000', 'COP', 'Calle 8 # 6 - 34', 'No', NULL, 10, 101010),
(30, 'El oso rojo', 1, '400-500', 'USD', 'Shaigon 3, 45', 'No', 'www.osorojo.com', 10, 202020),
(40, 'JW Marriott', 5, '500 - 1200', 'USD', 'Abu Barker Al Siddique Rd, Deira', 'Si', NULL, 10, 404040);


-- PLATOS_TIPICOS
describe platos_tipicos;
#Se actualiza campo para poder insertar datos:
ALTER TABLE PLATOS_TIPICOS
MODIFY receta blob DEFAULT NULL;

ALTER TABLE PLATOS_TIPICOS
MODIFY recomendado int DEFAULT NULL;

INSERT INTO PLATOS_TIPICOS (codigo, nombre, receta, descripcion, recomendado, cod_ciudad, cod_pais)
VALUES
(145, 'Sancocho', null,'Es un caldo con varios componentes',  33, 10, '101010'),
(348, 'Causa Limeña', null, 'Receta tipica elaborada a base de papa', 80, 10, '303030'),
(234, 'Pato Pekines', null, 'Uno de los platos más internacionalmente conocidos de la cocina china', null, 10, '202020');

-- RESTAURANTES
describe restaurantes;
INSERT INTO RESTAURANTES (numero, nombre, tipo_comida, precios, direccion, cod_ciudad, cod_pais)
VALUES
(33, 'Mi Tierra', 'tipica', '20000-45000','Av 8 # 18 -36', 10, 101010),
(55, 'Sr Wok', 'internacional','10000-30000','Jardin Plaza', 10, 101010),
(80, 'Sol de Mayo', 'tipica', '60000- 100000','Jerusalen 203', 10, 303030),
(99, 'Tinadi Yijia','fusion', '120000 - 400000','140 Nanchizi Dajie',10, 202020);

  
#MODIFICACIONES
-- a. Modificar la población de todas las ciudades dividiendo el valor respectivo por 1000
#esta seria la consulta pero NO APLICA porque anteriormente eliminamos el campo
UPDATE CIUDADES
SET población = población / 1000;

-- b. Cambiar el tipo de comida del restaurante Sol de Mayo por Internacional
UPDATE RESTAURANTES
SET tipo_comida = 'Internacional'
WHERE numero =80;

-- c. Borrar el hotel “El oso rojo”
DELETE FROM HOTELES
WHERE numero = 30;

-- d. Cambiar la dirección del restaurante “Sr Wok” por Jardin Plaza Local L-103
UPDATE RESTAURANTES
SET direccion = 'Jardin Plaza Local L-103'
WHERE numero = 55;

-- e. Cambiar el idioma de todas las ciudades de Colombia por Castellano
UPDATE CIUDADES
SET idioma = 'Castellano'
WHERE cod_pais = 101010;




