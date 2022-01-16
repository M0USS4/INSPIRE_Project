const mysql = require("mysql")
const fix = require('./generalHelper');

module.exports = {
    getAllPros:function (db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for all pros")
              const sqlSearch = `SELECT *, pro.id as pro_id FROM pro 
              INNER JOIN adress ON pro.id_adress=adress.id 
              INNER JOIN type_medicine ON pro.id_type_medicine=type_medicine.id
              INNER JOIN login ON pro.id_login=login.id
              ;`
            //   const search_query = mysql.format(sqlSearch,[idPro])
      
              connection.query (sqlSearch, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    console.log("pros found ")
                    console.log(result)
                    return callback(null, result);
                }
                else{
                    if(result.length===0){
                        console.log("no pro not found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getAllClients:function (db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for all pros")
              const sqlSearch = `SELECT *, client.id as client_id FROM client 
              INNER JOIN adress ON client.id_adress=adress.id 
              INNER JOIN login ON client.id_login=login.id
              ;`      
              connection.query (sqlSearch, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    console.log("clients found ")
                    console.log(result)
                    return callback(null, result);
                }
                else{
                    if(result.length===0){
                        console.log("no client not found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getClientsStats:function (db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for all client stats")
              const sqlSearch = `SELECT *, client.id as client_id FROM client 
              INNER JOIN adress ON client.id_adress=adress.id 
              INNER JOIN login ON client.id_login=login.id
              ;`      
              connection.query (sqlSearch, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result)
                const verified = result.filter(r => r.status.data[0] === 1);
                const unverified = result.filter(r => r.status.data[0] === 0);

                let res = {
                    total : result.length,
                    number_verified : verified,
                    number_unverified : unverified
                }
                console.log(result);
                if (result.length != 0) {
                    console.log("clients stats found ")
                    console.log(res)
                    return callback(null, res);
                }
                else{
                    if(result.length===0){
                        console.log("no client not found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getAllProsByParams:function (db, params, callback){
        db.getConnection( (err, connection) => {
            console.log(params);
            const practice = params.practice;
            const location = JSON.parse(params.location)
            const paramLat = location[0];
            const paramLong = location[1];
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for all pros")
              // 3959 for miles
              // 6371 for km
              const sqlSearch = `SELECT *, pro.id as pro_id , type_medicine.id as medicine_id , 
              ( 6371 * acos( cos( radians(${paramLat}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${paramLong}) ) + sin( radians(${paramLat}) ) * sin( radians( latitude ) ) ) ) 
              AS distance FROM pro 
              INNER JOIN adress ON pro.id_adress=adress.id
              INNER JOIN type_medicine ON pro.id_type_medicine=type_medicine.id 
              INNER JOIN login ON pro.id_login=login.id
              HAVING distance < 20 AND nom_medicine ='${practice}' ORDER BY distance LIMIT 0 , 20;`      
              connection.query (sqlSearch, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    console.log("pros found ")
                    console.log(result)
                    return callback(null, result);
                }
                else{
                    if(result.length===0){
                        console.log("no pro not found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getPro:function (idPro, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for pro id: "+idPro)
              const sqlSearch = "SELECT * FROM pro where id_login = ?"
              const search_query = mysql.format(sqlSearch,[idPro])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {

                    let dBirth = new Date(result[0].birth);
                    let dBirthM = fix.fixStringDateFromSQL(result[0].birth)
                    let user = {
                        "idUser":result[0].id,
                        "idlogin":result[0].id_login,
                        "name":result[0].nom,
                        "surname":result[0].prenom,
                        "phone":result[0].tel,
                        "birth":dBirthM,
                        "idadress":result[0].id_adress,
                        "img":result[0].img,
                        "cv":result[0].cv,
                        "diploma":result[0].diplome,
                        "found":true
                    }
                    console.log(user)
                    return callback(null, user);
                }
                else{
                    if(result.length===0){
                        console.log("pro not found")
                        let user = {
                            "found":false
                        }
                        console.log(user)
                        return callback(null, user);
                    }
                }
            })
        })
    },
    getProDetailed:function (idPro, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for pro id: "+idPro)
              const sqlSearch = `SELECT *, pro.id as pro_id FROM pro INNER JOIN adress ON pro.id_adress=adress.id 
              INNER JOIN type_medicine ON pro.id_type_medicine=type_medicine.id
              INNER JOIN login ON pro.id_login=login.id
               where pro.id = ?`
              const search_query = mysql.format(sqlSearch,[idPro])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    return callback(null, result[0]);
                }
                else{
                    if(result.length===0){
                        console.log("pro not found")
                        let user = {
                            "found":false
                        }
                        console.log(user)
                        return callback(null, user);
                    }
                }
            })
        })
    },

    SendConfirmatoryEmail:function (appt, db, transporter, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for client id: "+appt.idClient)
              const sqlSearch = `SELECT * FROM client INNER JOIN login ON client.id_login=login.id where id_login = ?`
              const search_query = mysql.format(sqlSearch,[appt.idClient])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let content = 'BEGIN:VCALENDAR\n' +
                    'VERSION:2.0\n' +
                    'BEGIN:VEVENT\n' +
                    'SUMMARY:Appointment Confirmation\n' +
                    `DTSTART;VALUE=DATE:${appt.apptDateStart}\n` +
                    'DTEND;VALUE=DATE:20201030T113000Z\n' +
                    'LOCATION:Webex \n' +
                    'DESCRIPTION:Description123\n' +
                    'STATUS:CONFIRMED\n' +
                    'SEQUENCE:3\n' +
                    'BEGIN:VALARM\n' +
                    'TRIGGER:-PT10M\n' +
                    'DESCRIPTION:Description123\n' +
                    'ACTION:DISPLAY\n' +
                    'END:VALARM\n' +
                    'END:VEVENT\n' +
                    'END:VCALENDAR';
                    
                    const mailOptions = {
                      from: 'projectinspire83@gmail.com',
                      to: result[0].mail,
                      cc: appt.proMail,
                      subject: 'Appointment Confirmation',
                      text: 'Appointment confirmed.',
                      html: `<div style="height:150px; border: 1px solid 
                      #009ba4; text-align: center">
                           <div style="height:50px; background-color:#abe4e7;">
                           </div>
                      <p style="font-size:1rem;">${appt.apptDateStart} - ${appt.apptDateEnd}</p>
                      <p> Appointment confirmed </p></div>`,
                       icalEvent: {
                        filename: "invitation.ics",
                        method: 'request',
                        content: content
                        }
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                      console.log(error);
                      } else {
                        console.log('appt added and Email sent: ' + info.response);
                        // return res.status(200).send('appt added and email sent')
                        return callback(null, 'appt added and email sent');

                      }
                    });
                }
                else{
                    if(result.length===0){
                        console.log("pro not found")
                        let user = {
                            "found":false
                        }
                        console.log(user)
                        return callback(null, user);
                    }
                }
            })
        })
    },

    getAppointmentTypes:function (params, db, callback){
        let idPro = params.pro_id;
        let nom_medicine = params.nom_medicine;
        console.log(nom_medicine)
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for appointment types of id: "+idPro)
              const sqlSearch = `SELECT * FROM type_rdv where id_pro = ? AND public = ?;
              SELECT * FROM type_rdv where nom LIKE '%${nom_medicine}%' AND public = ?`
              const search_query = mysql.format(sqlSearch,[idPro, false, true])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    const mergeResult = result[0].concat(result[1]);
                    return callback(null, mergeResult);
                }
                else{
                    if(result.length===0){
                        console.log("Types not found")
                        let apt = {
                            "found":false
                        }
                        console.log(apt)
                        return callback(null, apt);
                    }
                }
            })
        })
    },
    getClient:function (idClient, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for client id: "+idClient)
              const sqlSearch = "SELECT * FROM client where id_login = ?"
              const search_query = mysql.format(sqlSearch,[idClient])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                
                    let dBirth = new Date(result[0].birth);
                    console.log(dBirth);
                    let dBirthM = fix.fixStringDateFromSQL(result[0].birth)
                    let user = {
                        "idUser":result[0].id,
                        "idlogin":result[0].id_login,
                        "name":result[0].nom,
                        "surname":result[0].prenom,
                        "phone":result[0].tel,
                        "birth":dBirthM,
                        "idadress":result[0].id_adress,
                        "found":true
                    }
                    console.log(user)
                    return callback(null, user);
                }
                else{
                    if(result.length===0){
                        console.log("client not found")
                        let user = {
                            "found":false
                        }
                        console.log(user)
                        return callback(null, user);
                    }
                }
            })
        })
    },
    getAdress:function (idAdress, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Searching for adress id: "+idAdress)
              const sqlSearch = "SELECT * FROM adress where id = ?"
              const search_query = mysql.format(sqlSearch,[idAdress])
      
              connection.query (search_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {

                    let adress = {
                        "number":result[0].num,
                        "street":result[0].rue,
                        "postalC":result[0].codeP,
                        "city":result[0].ville,
                        "supp":result[0].supp,
                        "country":result[0].pays,
                        "latitude": result[0].latitude,
                        "longitude": result[0].longitude,
                    }
                    console.log(adress)
                    return callback(null, adress);
                }
                else{
                    return callback(new console.error("no adress found"), null)
                }
            })
        })
    },
    getMail:function (idlogin, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Searching for login id: "+idlogin)
              const sqlSearch = "SELECT mail FROM login where id = ?"
              const search_query = mysql.format(sqlSearch,[idlogin])
      
              connection.query (search_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    console.log(result.mail)
                    
                    return callback(null, result[0].mail);
                }
                else{}
            })
        })
    },
    getAdmin:function (idAdmin, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for admin id: "+idAdmin)
              const sqlSearch = "SELECT * FROM administrator where id_login = ?"
              const search_query = mysql.format(sqlSearch,[idClient])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    console.log("admin found")
                    
                    let user = {
                        "idlogin":result[0].id_login,
                        "found":true
                    }
                    console.log(user)
                    return callback(null, user);
                }
                else{
                    if(result.length===0){
                        console.log("admin not found")
                        let user = {
                            "found":false
                        }
                        console.log(user)
                        return callback(null, user);
                    }
                }
            })
        })
    },
    getAllTopics:function (db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Loading topics from db")
              const sqlSearch = "SELECT * FROM topic"
      
              connection.query (sqlSearch, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    
                    let topics = [];
                    for (let pas = 0; pas < result.length; pas++){
                        topics.push({
                            "id":result[pas].id,
                            "title":result[pas].text1
                        })
                    }
                    console.log(topics);
                    return callback(null, topics);
                }
                else{
                    if(result.length===0){
                        console.log("no topics")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getApptForPro:function (idPro, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for appt for pro id: "+idPro)
              const sqlSearch = `SELECT *,client.nom as nom_client,  type_rdv.nom as nom_type FROM rdv 
              INNER JOIN type_rdv ON rdv.id_type=type_rdv.id
              LEFT JOIN client ON rdv.id_client=client.id
              where rdv.id_pro = ?`
              const search_query = mysql.format(sqlSearch,[idPro])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result.le);
                if (result.length != 0) {
                    let appts=[];
                    
                    for(let apptNb=0;apptNb<result.length;apptNb++){
                        let start = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateStart)
                        let end = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateEnd)
                        appts.push(
                            {
                                "id_type":result[apptNb].id_type,
                                "id_pro":result[apptNb].id_pro,
                                "id_client":result[apptNb].id_client,
                                "nom_type":result[apptNb].nom_type,
                                "nom_client":result[apptNb].nom_client,
                                "prenom_client":result[apptNb].prenom,
                                "date_start":start,
                                "date_end":end,
                                "note_pro":result[apptNb].note_pro,
                                "status":result[0].status
                            }
                        )
                    }
                    console.log(appts)
                    return callback(null, appts);
                }
                else{
                    if(result.length===0){
                        console.log("no appointments found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getApptForClient:function (idClient, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching for appt for client id: "+idClient)
              const sqlSearch = `SELECT *,pro.nom as nom_pro,  type_rdv.nom as nom_type FROM rdv 
              INNER JOIN type_rdv ON rdv.id_type=type_rdv.id
              LEFT JOIN pro ON rdv.id_pro=pro.id
              LEFT JOIN adress ON pro.id_adress=adress.id
              where id_client = ?`
              const search_query = mysql.format(sqlSearch,[idClient])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let appts=[];
                    // for(let apptNb=0;apptNb<result.length;apptNb++){
                    //     let start = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateStart)
                    //     let end = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateEnd)
                    //     appts.push(
                    //         {
                    //             "id_type":result[apptNb].id_type,
                    //             "id_client":result[apptNb].id_client,
                    //             "date_start":start,
                    //             "date_end":end,
                    //             "note_client":result[apptNb].note_client,
                    //             "status":result[apptNb].status==1
                    //         }
                    //     )
                    // }
                    console.log(appts)
                    return callback(null, result);
                }
                else{
                    if(result.length===0){
                        console.log("no appointments found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getRdvType:function (idType, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching rdv type id: "+idType)
              const sqlSearch = "SELECT * FROM type_rdv where id = ?"
              const search_query = mysql.format(sqlSearch,[idType])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    console.log("RDV TYPE")
                    console.log(result[0].startDate)
                    console.log(result[0].endDate)
                    let sDate, eDate;
                    try
                    { sDate = fix.fixStringDateFromSQL(result[0].startDate)
                     eDate = fix.fixStringDateFromSQL(result[0].endDate)}
                    catch(err){
                         sDate = result[0].startDate;
                         eDate = result[0].endDate;
                    }
                    let rdv_type={
                        "name":result[0].nom,
                        "duration":result[0].duration,
                        "startDate":sDate,
                        "endDate":eDate,
                        "price":result[0].price,
                        "public":result[0].public==1,
                        "idPro":result[0].id_pro,
                    }
                    console.log(rdv_type)
                    return callback(null, rdv_type);
                }
                else{
                    if(result.length===0){
                        console.log("no rdv_type found")
                        return callback(null, null);
                    }
                }
            })
        })
    },
    getAllPublicRdvType:function ( db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Fetching rdv type")
              const sqlSearch = "SELECT * FROM type_rdv"
      
              connection.query (sqlSearch, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let types = []
                    for(let typeNb=0;typeNb<result.length;typeNb++){
                        let sDate = fix.fixStringDateFromSQL(result[0].startDate)
                        let eDate = fix.fixStringDateFromSQL(result[0].endDate)
                        let rdv_type={
                            "name":result[typeNb].nom,
                            "duration":result[typeNb].duration,
                            "startDate":sDate,
                            "endDate":eDate,
                            "price":result[typeNb].price,
                            "public":result[typeNb].public==1,
                            "idPro":result[typeNb].id_pro,
                        }
                        if(rdv_type.public){
                            types.push(rdv_type)
                        }
                    }
                    console.log(types)
                    return callback(null, types);
                }
                else{
                    if(result.length===0){
                        console.log("no rdv_type found")
                        return callback(null, null);
                    }
                }
            })
        })
    },
    addApptType:function (apptType, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding appt type: "+apptType)
              const sqlInsert = "INSERT INTO type_rdv (nom, duration, price, startDate, endDate, public, id_pro) VALUES (?,?,?,?,?,?,?)"
              const insert_query = mysql.format(sqlInsert,[apptType.nom, apptType.duration, apptType.price, apptType.startDate, apptType.endDate, apptType.public, apptType.id_pro])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                console.log(err)

                    return callback(err, null);
                }else{
                    return callback(null, result)
                }
            })
        })
    },
    proCustomization:function (params, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Updating customizing type: "+params)
              const sqlInsert = `
              UPDATE pro SET description = '${params.description}', availability = '${params.availability}'  WHERE pro.id = ${params.id_pro}
              `
            //   const insert_query = mysql.format(sqlInsert,[params.a.name, apptType.duration, apptType.price, apptType.startDate, apptType.endDate, apptType.public, apptType.idPro])
      
              connection.query (sqlInsert,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    return callback(null, true)
                }
            })
        })
    },
    addAppt:function (appt, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding appt: "+appt)
              const sqlInsert = "INSERT INTO rdv (id_client, id_pro, id_type, appt_dateStart, appt_dateEnd, status) VALUES (?,?,?,?,?,?)"
              const insert_query = mysql.format(sqlInsert,[appt.idClient, appt.idPro, appt.idType, appt.apptDateStart,appt.apptDateEnd, false])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    return callback(null, true)
                }
            })
        })
    },
    addMedicine:function (medicine, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding medicine: "+medicine)
            //   const sql = `IF NOT EXISTS (SELECT 1 FROM type_medicine WHERE nom_medicine = ?) BEGIN INSERT INTO type_medicine (nom_medicine, text1, text2, text3, img_medicine) VALUES (?, ?,?,?,?,?)
            //   END`
              const sqlInsert = "INSERT INTO `type_medicine` (`nom_medicine`, `text1`, `text2`, `text3`, `img_medicine`) VALUES (?,?,?,?,?)";
              const sql = `
              INSERT INTO type_medicine (nom_medicine, text1, text2, text3, img_medicine) 
              SELECT nom_medicine, text1, text2, text3, img_medicine FROM (SELECT ? as nom_medicine , ? as text1, ? as text2, ? as text3, ? as img_medicine) AS tmp 
              WHERE NOT EXISTS (SELECT * FROM type_medicine 
                WHERE nom_medicine = '${medicine.nom_medicine}') LIMIT 1;

              INSERT INTO type_rdv (nom, duration, price, startDate, endDate, public, id_pro)
              SELECT nom, duration, price, startDate, endDate, public, id_pro FROM (SELECT 'General ${medicine.nom_medicine}' as nom, 60 as duration, 45 as price, '0000-00-00' as startDate, '0000-00-00' as endDate, b'1' as public, 1 as id_pro) AS tmp2
              WHERE NOT EXISTS (SELECT * FROM type_rdv 
                WHERE nom = 'General ${medicine.nom_medicine}') LIMIT 1;
              `
              const insert_query = mysql.format(sql,[medicine.nom_medicine, medicine.nom_medicine, medicine.text1, medicine.text2, medicine.text3, medicine.img_medicine])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    return callback(null, 'medicine type created')
                }
            })
        })
    },
    updateApptClient:function (appt, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Updating appt by client: "+appt)
              var sql = `UPDATE rdv SET note_client = '${appt.note_client}', rating = ${appt.rating}  WHERE rdv.id_client = ${appt.id_client} AND rdv.id_pro = ${appt.id_pro}`;      
              connection.query (sql,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    return callback(null, true)
                }
            })
        })
    },
    updateApptPro:function (appt, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding appt: "+appt)
              const sqlInsert = "UPDATE `rdv` SET (`note_client`, `rating`) VALUES (?,?) where rdv.id_client = ? AND rdv.id_pro = ?"
              const insert_query = mysql.format(sqlInsert,[appt.note_client, appt.rating, appt.id_client, appt.id_pro])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    return callback(null, true)
                }
            })
        })
    },
    addPagePro:function (id_pro, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding page pro for: "+id_pro)
              const sqlInsert = "INSERT INTO pro_page (id_pro,text1) VALUES (?,?)"
              const insert_query = mysql.format(sqlInsert,[id_pro,""])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    return callback(null, true)
                }
            })
        })
    },
    addTopic:function (title, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding topic: "+title)
              const sqlInsert = "INSERT INTO topic (text1) VALUES (?)"
              const insert_query = mysql.format(sqlInsert,[title])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    console.log("added topic "+result.insertId)
                    return callback(null, result.insertId)
                }
            })
        })
    },
    linkTopicPro:function (id_topic, id_page, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding link btw topic: "+id_topic+" and pro page: "+id_page)
              const sqlInsert = "INSERT INTO `page-topic` (id_page, id_topic) VALUES (?,?)"
              const insert_query = mysql.format(sqlInsert,[id_page, id_topic])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    console.log("Linked")
                    return callback(null, true)
                }
            })
        })
    },
    getPagePro:function (id_pro, db, callback){
        db.getConnection( async (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Searching page pro for pro "+id_pro)
              const sqlSearch = "SELECT * FROM pro_page where id_pro = ?"
              const search_query = mysql.format(sqlSearch,[id_pro])
      
              connection.query (search_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    console.log("page pro found")
                    let page = {
                        "id":result[0].id,
                        "desc":result[0].text1,
                        "id_pro":id_pro
                    }
                    return callback(null, page)
                }
            })
        })
    },
    getRdvTypeForPro:function (idPro, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching rdv type for pro: "+idPro)
              const sqlSearch = "SELECT * FROM type_rdv where id_pro = ?"
              const search_query = mysql.format(sqlSearch,[idPro])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let rdv_types = []
                    for(let typeNB=0;typeNB<result.length;typeNB++){
                    let sDate, eDate;
                    try
                    { sDate = fix.fixStringDateFromSQL(result[typeNB].startDate)
                     eDate = fix.fixStringDateFromSQL(result[typeNB].endDate)}
                    catch(err){
                         sDate = result[typeNB].startDate;
                         eDate = result[typeNB].endDate;
                    }
                    let rdv_type={
                        "name":result[typeNB].nom,
                        "duration":result[typeNB].duration,
                        "startDate":sDate,
                        "endDate":eDate,
                        "price":result[typeNB].price,
                        "public":result[typeNB].public==1
                    }
                    rdv_types.push(rdv_type)
                    console.log(rdv_type)
                }
                    return callback(null, rdv_types);
                }
                else{
                    if(result.length===0){
                        console.log("no rdv_type found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getAllMedicine:function ( db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Fetching all medicines")
              const sqlSearch = "SELECT * FROM type_medicine"
      
              connection.query (sqlSearch, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let medicines = []
                    for(let medNB=0;medNB<result.length;medNB++){
                    
                    let medicine={
                        "id":result[medNB].id,
                        "name":result[medNB].nom_medicine,
                        "text1":result[medNB].text1,
                        "text2":result[medNB].text2,
                        "text3":result[medNB].text3,
                        "img":result[medNB].img_medicine
                    }
                    medicines.push(medicine)
                    console.log(medicine)
                }
                    return callback(null, medicines);
                }
                else{
                    if(result.length===0){
                        console.log("no medicines found")
                        return callback(null, []);
                    }
                }
            })
        })
    },
    getAllMedicineIdForPro:function ( idPro, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Fetching all medicines id for pro "+idPro)
              const sqlSearch = "SELECT * FROM `medicine_pro` where id_pro= ?"
              const search_query = mysql.format(sqlSearch,[idPro])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let medicinesNb = []
                    for(let medNB=0;medNB<result.length;medNB++){
                        medicinesNb.push(result[medNB].id_medicine)
                    }
                    return callback(null, medicinesNb);
                }
                else{
                    if(result.length===0){
                        console.log("no medicines found")
                        return callback(null, null);
                    }
                }
            })
        })
    },
    getMedicine:function ( idMed, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Fetching medicine "+idMed)
              const sqlSearch = "SELECT * FROM `type_medicine` where id= ?"
              const search_query = mysql.format(sqlSearch,[idMed])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let medicine={
                        "id":result[0].id,
                        "name":result[0].nom_medicine,
                        "text1":result[0].text1,
                        "text2":result[0].text2,
                        "text3":result[0].text3,
                        "img":result[0].img_medicine
                    }
                    return callback(null, medicine);
                }
                else{
                    if(result.length===0){
                        console.log("no medicine found")
                        return callback(null, null);
                    }
                }
            })
        })
    },
    linkMedPro:function (idPro, idMed, db, callback){
        db.getConnection(  (err, connection) => { 
            if (err) {
                return callback(err, null);
            }
              console.log("Adding link btw medicine: "+idMed+" and pro: "+idPro)
              const sqlInsert = "INSERT INTO `medicine_pro` (id_pro, id_medicine) VALUES (?,?)"
              const insert_query = mysql.format(sqlInsert,[idPro, idMed])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    console.log("Linked")
                    return callback(null, true)
                }
            })
        })
    }
}