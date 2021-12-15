const mysql = require("mysql")
const fix = require('./generalHelper');

module.exports = {

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
                    console.log("pro found "+result[0].name)
                    //console.log(result[0].nom)
                    let dBirth = new Date(result[0].birth);
                    let dBirthM = fix.fixStringDateFromSQL(dBirth)
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
                    console.log("client found")
                    //console.log(result[0].nom)
                    let dBirth = new Date(result[0].birth);
                    console.log(dBirth);
                    let dBirthM = fix.fixStringDateFromSQL(dBirth)
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
                        "country":result[0].pays
                    }
                    console.log(adress)
                    return callback(null, adress);
                }
                else{}
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
                    console.log("client found")
                    //console.log(result[0].nom)
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
              //const search_query = mysql.format(sqlSearch,[idClient])
      
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
              const sqlSearch = "SELECT * FROM rdv where id_pro = ?"
              const search_query = mysql.format(sqlSearch,[idPro])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let appts=[];
                    
                    for(let apptNb=0;apptNb<result.length;apptNb++){
                        let apptDate = fix.fixStringDateFromSQL(result[apptNb].appt_date)
                        appts.push(
                            {
                                "id_type":result[apptNb].id_type,
                                "id_client":result[apptNb].id_client,
                                "date":apptDate,
                                "note_pro":result[apptNb].note_pro
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
              const sqlSearch = "SELECT * FROM rdv where id_client = ?"
              const search_query = mysql.format(sqlSearch,[idClient])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let appts=[];
                    for(let apptNb=0;apptNb<result.length;apptNb++){
                        let apptDate = fix.fixStringDateFromSQL(result[apptNb].appt_date)
                        appts.push(
                            {
                                "id_type":result[apptNb].id_type,
                                "id_client":result[apptNb].id_client,
                                "date":apptDate,
                                "note_client":result[apptNb].note_client,
                                "status":result[apptNb].status==1
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
    getRdvType:function (idType, db, callback){
        db.getConnection( (err, connection) => { 
            if (err) {
              return callback(err, null);
            }
              console.log("Searching rdv type id: "+idType)
              const sqlSearch = "SELECT * FROM type_rdv where id = ?"
              const search_query = mysql.format(sqlSearch,[idClient])
      
              connection.query (search_query, (err, result) => {  
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log(result);
                if (result.length != 0) {
                    let sDate = fix.fixStringDateFromSQL(result[0].startDate)
                    let eDate = fix.fixStringDateFromSQL(result[0].endDate)
                    let rdv_type={
                        "name":result[0].nom,
                        "duration":result[0].duration,
                        "startDate":sDate,
                        "endDate":eDate,
                        "price":result[0].price,
                        "public":result[0].public==1
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
              //const search_query = mysql.format(sqlSearch,[idClient])
      
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
                            "public":result[typeNb].public==1
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
              const sqlInsert = "INSERT INTO type_rdv (nom, duration, price, startDate, endDate, public) VALUES (?,?,?,?,?,?)"
              const insert_query = mysql.format(sqlInsert,[apptType.name, apptType.duration, apptType.price, apptType.startDate, apptType.endDate, apptType.public])
      
              connection.query (insert_query,  (err, result) => {  
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
              const sqlInsert = "INSERT INTO rdv (id_client, id_pro, id_type, appt_dateStart, appt_dateEnd) VALUES (?,?,?,?,?)"
              const insert_query = mysql.format(sqlInsert,[appt.idClient, appt.idPro, appt.idType, appt.apptDateStart,appt.apptDateEnd])
      
              connection.query (insert_query,  (err, result) => {  
                if (err) {
                    return callback(err, null);
                }else{
                    return callback(null, true)
                }
            })
        })
    }
}