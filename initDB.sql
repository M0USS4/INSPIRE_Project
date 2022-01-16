-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 11, 2022 at 12:43 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS Inspire;


USE Inspire;

--
-- Database: `inspire`
--

-- --------------------------------------------------------

DROP TABLE IF EXISTS `practice_rdv_type`;
DROP TABLE IF EXISTS `cmd-article`;
DROP TABLE IF EXISTS `commande`;
DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `review`;
DROP TABLE IF EXISTS `medicine_pro`;
DROP TABLE IF EXISTS `baseH`;
DROP TABLE IF EXISTS `page-topic`;
DROP TABLE IF EXISTS `topic`;
DROP TABLE IF EXISTS `pro_page`;
DROP TABLE IF EXISTS `rdv`;
DROP TABLE IF EXISTS `type_rdv`;
DROP TABLE IF EXISTS `pro`;
DROP TABLE IF EXISTS `client`;
DROP TABLE IF EXISTS `administrator`;
DROP TABLE IF EXISTS `adress`;
DROP TABLE IF EXISTS `login`;
DROP TABLE IF EXISTS `type_medicine`;

--
-- Table structure for table `administrator`
--


CREATE TABLE IF NOT EXISTS `administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_login` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_197` (`id_login`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `adress`
--


CREATE TABLE IF NOT EXISTS `adress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pays` varchar(45) NOT NULL,
  `num` varchar(45) NOT NULL,
  `rue` varchar(45) NOT NULL,
  `codeP` varchar(45) NOT NULL,
  `ville` varchar(45) NOT NULL,
  `supp` varchar(45) NOT NULL,
  `latitude` float(10,6) DEFAULT 3.061625,
  `longitude` float(10,6) DEFAULT 50.638893,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adress`
--

INSERT INTO `adress` (`id`, `pays`, `num`, `rue`, `codeP`, `ville`, `supp`, `latitude`, `longitude`) VALUES
(1, "","","","","","",0,0),
(2, 'Jordan', '648', '3 PLACE RICHEBE', '', 'North Jamesonside', '', 3.062313, 50.632366),
(3, 'Bhutan', '153', 'FACE AU 8 RUE ANATOLE FRANCE', '50459', 'Bergnaumport', '', 3.065902, 50.637486),
(4, 'Bhutan', '144', '12, RUE DE NORMANDIE', '742645610', 'Port Guillermofort', '', 3.118579, 50.643883),
(5, 'Chad', '651', 'RUE DE LA CHEVALERIE', '517625', 'East Anna', '', 3.130853, 50.636082),
(6, 'Saint Helena', '123', 'FACE AU 1 BIS RUE DE LA STATION', '7826', 'North Franciscoville', '', 3.148620, 50.625801),
(7, 'Nigeria', '285', '40 RUE ROYALE', '82738', 'East Elvis', '', 3.057740, 50.640308),
(8, 'Vanuatu', '134', '80854 Danny Common', '76662', 'West Adrian', '', 3.062053, 50.640385),
(9, 'United Kingdom', '153', 'ROUBAIX', '299999', 'Lake Berniebury', '', 3.172165, 50.694099),
(10, 'Guinea', '113', '26624 Roberto Summit Apt. 880', '23', 'Klockoville', '', 3.110669, 50.632393),
(11, 'Netherlands Antilles', '750', '243 Douglas Cliffs Apt. 661', '7', 'Batzborough', '', 3.161625, 50.738892),
(12, 'FR', '178', 'Rue Sadi Carnot', '59320', 'Haubourdin', '', 2.994708, 50.611256),
(13, 'FR', '178', 'Rue Sadi Carnot', '59320', 'Haubourdin', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `article`
--


CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prix` float NOT NULL,
  `nom` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `baseh`
--


CREATE TABLE IF NOT EXISTS `baseh` (
  `id_pro` int(11) NOT NULL,
  `jour` varchar(45) NOT NULL,
  `hstart` int(11) NOT NULL,
  `minstart` int(11) NOT NULL,
  `hend` int(11) NOT NULL,
  `minend` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_134` (`id_pro`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--


CREATE TABLE IF NOT EXISTS `client` (
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `id_login` int(11) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `birth` date NOT NULL,
  `id_adress` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_200` (`id_login`),
  KEY `FK_48` (`id_adress`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`nom`, `prenom`, `id_login`, `tel`, `birth`, `id_adress`, `id`, `status`) VALUES
("","",1,"","",1,1,b'1'),
('Mertz', 'Jazmyne', 2, '(382)364-9059x234', '1991-04-21', 2, 2, b'1'),
('Cummings', 'Grayson', 3, '909-385-3665', '1979-12-25', 3, 3, b'1'),
('Jacobs', 'Danika', 4, '229.324.2125', '2013-12-25', 4, 4, b'0'),
('McGlynn', 'Louie', 5, '739.007.5965x2690', '2018-01-31', 5, 5, b'1'),
('Kassulke', 'Hope', 6, '917-667-1062x24335', '1998-07-28', 6, 6, b'1'),
('Eichmann', 'Jade', 7, '05699253768', '1977-12-22', 7, 7, b'1'),
('Zemlak', 'Alivia', 8, '1-609-835-6841x71802', '2011-02-17', 8, 8, b'0'),
('Abernathy', 'Clifton', 9, '452.423.1136', '2002-02-22', 9, 9, b'1'),
('Paucek', 'Zoe', 10, '(563)363-8524x80298', '2013-02-10', 10, 10, b'1'),
('Kovacek', 'Kaylie', 11, '436-960-0072', '2004-04-22', 11, 11, b'1'),
('Nate', 'Glover', 13, '+33753161734', '1997-08-13', 13, 12, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `cmd-article`
--


CREATE TABLE IF NOT EXISTS `cmd-article` (
  `id_article` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_105` (`id_commande`),
  KEY `FK_115` (`id_article`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `commande`
--


CREATE TABLE IF NOT EXISTS `commande` (
  `id_adress` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_96` (`id_client`),
  KEY `FK_99` (`id_adress`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--


CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(45) NOT NULL,
  `mdp` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `mail`, `mdp`) VALUES
(1,"block",""),
(2, 'luna.swift@example.com', 'omnis'),
(3, 'javier.predovic@example.com', 'non'),
(4, 'keyon.braun@example.net', 'et'),
(5, 'hipolito97@example.net', 'impedit'),
(6, 'lilliana.bauch@example.com', 'et'),
(7, 'stephon.aufderhar@example.com', 'eum'),
(8, 'benedict.labadie@example.org', 'iusto'),
(9, 'crawford.donnelly@example.com', 'impedit'),
(10, 'ledner.shakira@example.com', 'consectetur'),
(11, 'destini.mraz@example.com', 'qui'),
(12, 'kwakuaaddo473@gmail.com', '$2b$10$QVzeuhwSaMojq6Buj87Qne66GzkBw3cyR.LPJCraGs8GlfwDxn8vK'),
(13, 'natenate473@gmail.com', '$2b$10$BX/cSMWwvDIJEPMVEn1nueGv.MiEnwedrIJ2GaRVde9gEhQNPNM3C');

-- --------------------------------------------------------

--
-- Table structure for table `medicine_pro`
--


CREATE TABLE IF NOT EXISTS `medicine_pro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pro` int(11) NOT NULL,
  `id_medicine` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_182` (`id_pro`),
  KEY `FK_185` (`id_medicine`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `page-topic`
--


CREATE TABLE IF NOT EXISTS `page-topic` (
  `id_page` int(11) NOT NULL,
  `id_topic` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_81` (`id_page`),
  KEY `FK_88` (`id_topic`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `practice_rdv_type`
--


CREATE TABLE IF NOT EXISTS `practice_rdv_type` (
  `id_rdv_type` int(11) NOT NULL,
  `id_practice` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_261` (`id_rdv_type`),
  KEY `FK_262` (`id_practice`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `practice_rdv_type`
--

INSERT INTO `practice_rdv_type` (`id_rdv_type`, `id_practice`, `id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `pro`
--


CREATE TABLE IF NOT EXISTS `pro` (
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `id_login` int(11) NOT NULL,
  `id_type_medicine` int(11) NOT NULL,
  `tel` bigint(20) NOT NULL,
  `birth` date NOT NULL,
  `img` varchar(200) NOT NULL,
  `cv` varchar(200) NOT NULL,
  `diplome` varchar(200) NOT NULL,
  `etat` bit(1) NOT NULL,
  `id_adress` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` bit(1) NOT NULL,
  `description` text NULL,
  `availability` varchar(10000) DEFAULT '[{"id":"sunday","availability":[]},{"id":"monday","availability":[{"start":9,"end":12},{"start":15,"end":17}]},{"id":"tuesday","availability":[{"start":9,"end":12},{"start":14,"end":17}]},{"id":"wednesday","availability":[{"start":9,"end":13}]},{"id":"thursday","availability":[{"start":9,"end":12},{"start":15,"end":17}]},{"id":"friday","availability":[{"start":9,"end":12},{"start":15,"end":17}]},{"id":"saturday","availability":[]}]',
  PRIMARY KEY (`id`),
  KEY `FK_203` (`id_login`),
  KEY `FK_44` (`id_adress`),
  KEY `pro_type_medicine` (`id_type_medicine`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pro`
--

INSERT INTO `pro` (`nom`, `prenom`, `id_login`, `id_type_medicine`, `tel`, `birth`, `img`, `cv`, `diplome`, `etat`, `id_adress`, `id`, `status`, `availability`) VALUES
("","",1,1,"","","","","",1, 1,1,1,""),
('Sanford', 'Arnaldo', 2, 1, 1, '1999-02-10', 'https://res.cloudinary.com/inspire84/image/upload/v1641861327/ian-dooley-d1UPkiFd04A-unsplash_hxo9im.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 2, 2, b'1', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Witting', 'Enid', 3, 3, 0, '2005-07-27', 'https://res.cloudinary.com/inspire84/image/upload/v1641861753/rafaella-mendes-diniz-et_78QkMMQs-unsplash_sxuvvy.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 3, 3, b'0', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Green', 'Meagan', 4, 2, 374897497, '2005-04-20', 'https://res.cloudinary.com/inspire84/image/upload/v1641861363/pexels-gustavo-fring-4173251_zbdfot.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 4, 4, b'1', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Mayert', 'Christ', 5, 1, 0, '2015-07-12', 'https://res.cloudinary.com/inspire84/image/upload/v1641861319/ben-parker-OhKElOkQ3RE-unsplash_sjefq7.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 5, 5, b'0', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Carter', 'Clare', 6, 4, 76, '1980-05-17', 'https://res.cloudinary.com/inspire84/image/upload/v1641861340/matheus-ferrero-W7b3eDUb_2I-unsplash_uuurmq.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 6, 6, b'0', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('McKenzie', 'Ashlynn', 7, 2, 1, '2018-08-06', 'https://res.cloudinary.com/inspire84/image/upload/v1641592870/cld-sample.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 7, 7, b'1', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Fahey', 'Derrick', 8, 4, 501365, '1987-02-02', 'https://res.cloudinary.com/inspire84/image/upload/v1641861319/ben-parker-OhKElOkQ3RE-unsplash_sjefq7.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 8, 8, b'1', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Lynch', 'Derrick', 9, 3, 265608, '1995-01-22', 'https://res.cloudinary.com/inspire84/image/upload/v1641861331/joseph-gonzalez-iFgRcqHznqg-unsplash_nbqqci.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 9, 9, b'0', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Koch', 'Breana', 10, 2, 0, '2007-02-07', 'https://res.cloudinary.com/inspire84/image/upload/v1641592870/cld-sample.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'1', 10, 10, b'1', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]'),
('Kwaku Antwi', 'Addo', 11, 3, 33753161734, '1997-08-13', 'http://res.cloudinary.com/inspire84/image/upload/v1641685816/image/uimu6l5jtsytusmhn69a.jpg', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/cv/wmso8rp6tcbfuhkrcx6t.pdf', 'http://res.cloudinary.com/inspire84/image/upload/v1641685814/diplome/exmebpau7hfxv9vlz7r3.pdf', b'0', 11, 11, b'0', '[{\"id\":\"sunday\",\"availability\":[]},{\"id\":\"monday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"tuesday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":14,\"end\":17}]},{\"id\":\"wednesday\",\"availability\":[{\"start\":9,\"end\":13}]},{\"id\":\"thursday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"friday\",\"availability\":[{\"start\":9,\"end\":12},{\"start\":15,\"end\":17}]},{\"id\":\"saturday\",\"availability\":[]}]');

-- --------------------------------------------------------

--
-- Table structure for table `pro_page`
--


CREATE TABLE IF NOT EXISTS `pro_page` (
  `id_pro` int(11) NOT NULL,
  `text1` text NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_75` (`id_pro`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rdv`
--


CREATE TABLE IF NOT EXISTS `rdv` (
  `id_client` int(11) NOT NULL,
  `id_pro` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  `appt_dateStart` datetime NOT NULL,
  `appt_dateEnd` datetime NOT NULL,
  `note_pro` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `prescription_pro` text DEFAULT NULL,
  `note_client` text DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_146` (`id_client`),
  KEY `FK_149` (`id_pro`),
  KEY `FK_159` (`id_type`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rdv`
--

INSERT INTO `rdv` (`id_client`, `id_pro`, `id_type`, `appt_dateStart`, `appt_dateEnd`, `note_pro`, `prescription_pro`, `note_client`, `rating`, `status`, `id`) VALUES
(11, 1, 5, '2022-01-10 10:00:00', '2022-01-10 11:00:00', NULL, NULL, NULL, NULL, b'0', 27),
(6, 11, 5, '2022-01-12 13:00:00', '2022-01-12 14:00:00', NULL, NULL, NULL, NULL, b'0', 26),
(5, 11, 3, '2022-01-14 09:00:00', '2022-01-14 10:00:00', NULL, NULL, NULL, NULL, b'0', 25),
(2, 3, 5, '2022-01-12 11:00:00', '2022-01-12 12:00:00', NULL, NULL, NULL, NULL, b'0', 10),
(11, 3, 5, '2022-01-10 11:00:00', '2022-01-10 12:00:00', NULL, NULL, NULL, NULL, b'0', 11),
(4, 11, 5, '2022-01-10 11:00:00', '2022-01-10 12:00:00', NULL, NULL, NULL, NULL, b'0', 28),
(7, 11, 3, '2022-01-12 11:00:00', '2022-01-12 12:00:00', NULL, NULL, NULL, NULL, b'0', 12),
(2, 11, 5, '2022-01-13 16:00:00', '2022-01-13 17:00:00', NULL, NULL, NULL, NULL, b'0', 13),
(11, 2, 3, '2022-01-12 14:00:00', '2022-01-12 14:00:00', NULL, NULL, NULL, NULL, b'0', 14),
(11, 6, 5, '2022-01-12 09:00:00', '2022-01-12 10:00:00', NULL, NULL, NULL, NULL, b'0', 15),
(3, 11, 5, '2022-01-11 14:00:00', '2022-01-11 15:00:00', NULL, NULL, NULL, NULL, b'0', 17),
(11, 7, 5, '2022-01-13 12:00:00', '2022-01-13 13:00:00', NULL, NULL, NULL, NULL, b'0', 18),
(11, 11, 5, '2022-01-11 09:00:00', '2022-01-11 10:00:00', NULL, NULL, NULL, NULL, b'0', 19),
(8, 11, 5, '2022-01-14 11:00:00', '2022-01-14 12:00:00', NULL, NULL, NULL, NULL, b'0', 22),
(11, 5, 5, '2022-01-14 15:00:00', '2022-01-14 16:00:00', NULL, NULL, NULL, NULL, b'0', 23),
(4, 11, 5, '2022-01-13 13:00:00', '2022-01-13 14:00:00', NULL, NULL, NULL, NULL, b'0', 24);

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--


CREATE TABLE IF NOT EXISTS `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text1` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`id`, `text1`) VALUES
(1, 'Massage'),
(2, 'yoga'),
(3, 'fumer'),
(4, 'stress');

-- --------------------------------------------------------

--
-- Table structure for table `type_medicine`
--


CREATE TABLE IF NOT EXISTS `type_medicine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_medicine` varchar(45) NOT NULL,
  `text1` text NOT NULL,
  `text2` text NOT NULL,
  `text3` text NOT NULL,
  `img_medicine` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type_medicine`
--

INSERT INTO `type_medicine` (`id`, `nom_medicine`, `text1`, `text2`, `text3`, `img_medicine`) VALUES
(1, 'sophrologie', 'text1 sophrologie', 'text2 sophrologie', 'text3 sophrologie', 'img sophrologie'),
(2, 'Kinésithérapie', 'text1 Kinésithérapie', 'text2 Kinésithérapie', 'text3 Kinésithérapie', 'img Kinésithérapie'),
(3, 'ostéapathie', 'text1 ostéapathie', 'text2 ostéapathie', 'text3 ostéapathie', 'img ostéapathie'),
(4, 'acupuncture', 'text1 acupuncture', 'text2 acupuncture', 'text3 acupuncture', 'img acupuncture');

-- --------------------------------------------------------

--
-- Table structure for table `type_rdv`
--


CREATE TABLE IF NOT EXISTS `type_rdv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `duration` float NOT NULL,
  `price` float NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `public` bit(1) NOT NULL,
  `id_pro` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_248` (`id_pro`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type_rdv`
--

INSERT INTO `type_rdv` (`id`, `nom`, `duration`, `price`, `startDate`, `endDate`, `public`, `id_pro`) VALUES
(1,"Blocked",30,0,"","",false,1),
(2, 'Consultation de sophrologie', 60, 45, '0000-00-00', '0000-00-00', b'1', 1),
(3, 'Consultation de Kinésithérapie', 60, 45, '0000-00-00', '0000-00-00', b'1', 1),
(4, 'Consultation de ostéapathie', 30, 40, '0000-00-00', '0000-00-00', b'1', 11),
(5, 'Consultation de acupuncture', 60, 45, '2022-01-12', '0000-00-00', b'1', 1),
(6, 'Ostéapathie du Sport', 60, 50, '2022-01-01', '2023-12-08', b'0', 11);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
