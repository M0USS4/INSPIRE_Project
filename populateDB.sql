INSERT INTO Inspire.`topic` (text1) VALUES ("Massage");
INSERT INTO Inspire.`topic` (text1) VALUES ("yoga");
INSERT INTO Inspire.`topic` (text1) VALUES ("fumer");
INSERT INTO Inspire.`topic` (text1) VALUES ("stress");

INSERT INTO Inspire.`type_medicine` (nom, text1, text2, text3, img) VALUES ("sophrologie","text1 sophrologie","text2 sophrologie","text3 sophrologie","img sophrologie");
INSERT INTO Inspire.`type_medicine` (nom, text1, text2, text3, img) VALUES ("Kinésithérapie","text1 Kinésithérapie","text2 Kinésithérapie","text3 Kinésithérapie","img Kinésithérapie");
INSERT INTO Inspire.`type_medicine` (nom, text1, text2, text3, img) VALUES ("ostéapathie","text1 ostéapathie","text2 ostéapathie","text3 ostéapathie","img ostéapathie");
INSERT INTO Inspire.`type_medicine` (nom, text1, text2, text3, img) VALUES ("acupuncture","text1 acupuncture","text2 acupuncture","text3 acupuncture","img acupuncture");

INSERT INTO Inspire.`type_rdv` (nom, duration, price, startDate, endDate, `public`, id_pro) VALUES ("Consultation de sophrologie",60,45,"","",true,1);
INSERT INTO Inspire.`type_rdv` (nom, duration, price, startDate, endDate, `public`, id_pro) VALUES ("Consultation de Kinésithérapie",60,45,"","",true,1);
INSERT INTO Inspire.`type_rdv` (nom, duration, price, startDate, endDate, `public`, id_pro) VALUES ("Consultation de ostéapathie",30,40,"","",true,1);
INSERT INTO Inspire.`type_rdv` (nom, duration, price, startDate, endDate, `public`, id_pro) VALUES ("Consultation de acupuncture",60,45,"","",true,1);

INSERT INTO Inspire.`practice_rdv_type` (id_rdv_type, id_practice) VALUES (1,1);
INSERT INTO Inspire.`practice_rdv_type` (id_rdv_type, id_practice) VALUES (2,2);
INSERT INTO Inspire.`practice_rdv_type` (id_rdv_type, id_practice) VALUES (3,3);
INSERT INTO Inspire.`practice_rdv_type` (id_rdv_type, id_practice) VALUES (4,4);