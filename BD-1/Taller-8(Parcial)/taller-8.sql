CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Persona` (
  `Codigo` INT NOT NULL,
  `e_mail` VARCHAR(45) NULL,
  `Nombre` VARCHAR(45) NULL,
  `Tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`Codigo`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Reunion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Reunion` (
  `Consecutivo` INT NOT NULL,
  `cod_asignatura` INT NOT NULL,
  `Fecha` DATE NULL,
  `Hora_inicio` DATE NULL,
  `Hora_fin` VARCHAR(45) NULL,
  `Persona_Codigo` INT NOT NULL,
  `Organizador_Externo` BOOLEAN NOT NULL,
  PRIMARY KEY (`Consecutivo`, `cod_asignatura`),
  INDEX `fk_Reunion_Persona_idx` (`Persona_Codigo` ASC) VISIBLE,
  CONSTRAINT `fk_Reunion_Persona`
    FOREIGN KEY (`Persona_Codigo`)
    REFERENCES `mydb`.`Persona` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Grabacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Grabacion` (
  `Codigo` INT NOT NULL,
  `Archivo` BLOB NULL,
  `Tipo_archivo` VARCHAR(45) NULL,
  `Tamaño` INT NULL,
  `Reunion_Consecutivo` INT NOT NULL,
  `Reunion_cod_asignatura` INT NOT NULL,
  PRIMARY KEY (`Codigo`),
  INDEX `fk_Grabacion_Reunion1_idx` (`Reunion_Consecutivo` ASC, `Reunion_cod_asignatura` ASC) VISIBLE,
  CONSTRAINT `fk_Grabacion_Reunion1`
    FOREIGN KEY (`Reunion_Consecutivo` , `Reunion_cod_asignatura`)
    REFERENCES `mydb`.`Reunion` (`Consecutivo` , `cod_asignatura`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
