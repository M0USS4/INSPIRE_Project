CREATE DATABASE IF NOT EXISTS Inspire;


USE Inspire;


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
DROP TABLE IF EXISTS `pro`;
DROP TABLE IF EXISTS `client`;
DROP TABLE IF EXISTS `administrator`;
DROP TABLE IF EXISTS `type_rdv`;
DROP TABLE IF EXISTS `adress`;
DROP TABLE IF EXISTS `login`;
DROP TABLE IF EXISTS `type_medicine`;

CREATE TABLE Inspire.`login`
(
 id   int NOT NULL AUTO_INCREMENT ,
 mail varchar(45) NOT NULL ,
 mdp  varchar(150) NOT NULL ,

PRIMARY KEY (id)
);

CREATE TABLE Inspire.`type_rdv`
(
 id       int NOT NULL AUTO_INCREMENT ,
 nom      varchar(45) NOT NULL ,
 duration float NOT NULL ,
 price    float NOT NULL ,
 `public`   bit NOT NULL ,

PRIMARY KEY (id)
);

CREATE TABLE Inspire.`type_medicine`
(
 id    int NOT NULL AUTO_INCREMENT ,
 nom   varchar(45) NOT NULL ,
 text1 text NOT NULL ,
 text2 text NOT NULL ,
 text3 text NOT NULL ,
 img   varchar(45) NOT NULL ,

PRIMARY KEY (id)
);

CREATE TABLE Inspire.`adress`
(
 id    int NOT NULL AUTO_INCREMENT ,
 pays  varchar(45) NOT NULL ,
 num   varchar(45) NOT NULL ,
 rue   varchar(45) NOT NULL ,
 codeP varchar(45) NOT NULL ,
 ville varchar(45) NOT NULL ,
 supp  varchar(45) NOT NULL ,

PRIMARY KEY (id)
);

CREATE TABLE Inspire.`article`
(
 id    int NOT NULL AUTO_INCREMENT ,
 prix  float NOT NULL ,
 nom   varchar(45) NOT NULL ,
 description  text NOT NULL ,
 picture varchar(45) NOT NULL ,

PRIMARY KEY (id)
);

CREATE TABLE Inspire.`topic`
(
 id    int NOT NULL AUTO_INCREMENT ,
 text1 text NOT NULL ,

PRIMARY KEY (id)
);

CREATE TABLE Inspire.`administrator`
(
 id       int NOT NULL AUTO_INCREMENT ,
 id_login int NOT NULL ,

PRIMARY KEY (id),
KEY FK_197 (id_login),
CONSTRAINT administrator_login FOREIGN KEY FK_197 (id_login) REFERENCES login (id)
);

CREATE TABLE Inspire.`client`
(
 nom       varchar(45) NOT NULL ,
 prenom    varchar(45) NOT NULL ,
 id_login  int NOT NULL ,
 tel       VARCHAR(45) NOT NULL ,
 birth     date NOT NULL ,
 id_adress int NOT NULL ,
 id        int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_200 (id_login),
CONSTRAINT client_login FOREIGN KEY FK_200 (id_login) REFERENCES login (id),
KEY FK_48 (id_adress),
CONSTRAINT adress_client FOREIGN KEY FK_48 (id_adress) REFERENCES adress (id)
);

CREATE TABLE Inspire.`pro`
(
 nom       varchar(45) NOT NULL ,
 prenom    varchar(45) NOT NULL ,
 id_login  int NOT NULL ,
 tel       bigint NOT NULL ,
 birth     date NOT NULL ,
 img       varchar(45) NOT NULL ,
 cv        varchar(45) NOT NULL ,
 diplome   varchar(45) NOT NULL ,
 etat      bit NOT NULL ,
 id_adress int NOT NULL ,
 id        int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_203 (id_login),
CONSTRAINT pro_login FOREIGN KEY FK_203 (id_login) REFERENCES login (id),
KEY FK_44 (id_adress),
CONSTRAINT adress_pro FOREIGN KEY FK_44 (id_adress) REFERENCES adress (id)
);

CREATE TABLE Inspire.`rdv`
(
 id_client   int NOT NULL ,
 id_pro      int NOT NULL ,
 id_type     int NOT NULL ,
 appt_date        datetime NOT NULL ,
 note_pro    text NOT NULL ,
 note_client text NOT NULL ,
 status      bit NOT NULL ,
 id          int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_146 (id_client),
CONSTRAINT client_rdv FOREIGN KEY FK_146 (id_client) REFERENCES client (id),
KEY FK_149 (id_pro),
CONSTRAINT pro_rdv FOREIGN KEY FK_149 (id_pro) REFERENCES pro (id),
KEY FK_159 (id_type),
CONSTRAINT type_rdv FOREIGN KEY FK_159 (id_type) REFERENCES type_rdv (id)
);

CREATE TABLE Inspire.`medicine_pro`
(
 id       int NOT NULL AUTO_INCREMENT ,
 id_pro      int NOT NULL ,
 id_medicine int NOT NULL ,

PRIMARY KEY (id),
KEY FK_182 (id_pro),
CONSTRAINT `pro_medicine-pro` FOREIGN KEY FK_182 (id_pro) REFERENCES pro (id),
KEY FK_185 (id_medicine),
CONSTRAINT `medicine-pro_medicine` FOREIGN KEY FK_185 (id_medicine) REFERENCES type_medicine (id)
);

CREATE TABLE Inspire.`baseH`
(
 id_pro   int NOT NULL ,
 jour     varchar(45) NOT NULL ,
 hstart   int NOT NULL ,
 minstart int NOT NULL ,
 hend     int NOT NULL ,
 minend   int NOT NULL ,
 id       int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_134 (id_pro),
CONSTRAINT baseH_pro FOREIGN KEY FK_134 (id_pro) REFERENCES pro (id)
);

CREATE TABLE Inspire.`pro_page`
(
 id_pro int NOT NULL ,
 text1  text NOT NULL ,
 id     int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_75 (id_pro),
CONSTRAINT `pro-page_pro` FOREIGN KEY FK_75 (id_pro) REFERENCES pro (id)
);


CREATE TABLE Inspire.`page-topic`
(
 id_page  int NOT NULL ,
 id_topic int NOT NULL ,
 id     int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_81 (id_page),
CONSTRAINT `page-topic_page` FOREIGN KEY FK_81 (id_page) REFERENCES pro_page (id),
KEY FK_88 (id_topic),
CONSTRAINT `topic_page-topic` FOREIGN KEY FK_88 (id_topic) REFERENCES topic (id)
);

CREATE TABLE Inspire.`commande`
(
 id_adress int NOT NULL ,
 id_client int NOT NULL ,
 id        int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_96 (id_client),
CONSTRAINT client_commande FOREIGN KEY FK_96 (id_client) REFERENCES client (id),
KEY FK_99 (id_adress),
CONSTRAINT adress_commande FOREIGN KEY FK_99 (id_adress) REFERENCES adress (id)
);

CREATE TABLE Inspire.`cmd-article`
(
 id_article  int NOT NULL ,
 id_commande int NOT NULL ,
 id     int NOT NULL AUTO_INCREMENT ,

PRIMARY KEY (id),
KEY FK_105 (id_commande),
CONSTRAINT `commande_cmd-article` FOREIGN KEY FK_105 (id_commande) REFERENCES commande (id),
KEY FK_115 (id_article),
CONSTRAINT `article_cmd-article` FOREIGN KEY FK_115 (id_article) REFERENCES article (id)
);


