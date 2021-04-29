-- -----------------------------------------------------
-- DDL peliculas 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `peliculas` DEFAULT CHARACTER SET utf8 ;
USE `peliculas` ;

-- -----------------------------------------------------
-- Table `pelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pelicula` (
  `peliculaId` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(120) NOT NULL,
  `trailerUrl` VARCHAR(300) NOT NULL,
  `duracion` TIME NOT NULL,
  `estreno` DATE NOT NULL,
  `caratula` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`peliculaId`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `categoria` (
  `categoriaId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`categoriaId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `filtros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `filtros` (
    `categoriaId` INT NOT NULL,
    `peliculaId` INT NOT NULL,
    PRIMARY KEY (`categoriaId`, `peliculaId`),
    FOREIGN KEY (`categoriaId`)
    REFERENCES `categoria` (`categoriaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`peliculaId`)
    REFERENCES `pelicula` (`peliculaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `feedback` (
    `feedbackId` INT NOT NULL AUTO_INCREMENT,
    `peliculaId` INT NOT NULL,
    `calificacion` INT NOT NULL,
    PRIMARY KEY (`feedbackId`),
    FOREIGN KEY (`peliculaId`)
    REFERENCES `pelicula` (`peliculaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- DML peliculas
-- -----------------------------------------------------
START TRANSACTION;
USE `peliculas`;
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (1, 'De acción');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (2, 'De aventuras');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (3, 'Comedias');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (4, 'Dramáticas');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (5, 'De terror');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (6, 'Musicales');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (7, 'Ciencia ficción');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (8, 'De guerra o bélicas');
INSERT INTO `categoria` (`categoriaId`, `nombre`) VALUES (9, 'Animado');

COMMIT;
