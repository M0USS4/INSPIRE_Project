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
                        "country":result[0].pays
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
                        let start = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateStart)
                        let end = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateEnd)
                        appts.push(
                            {
                                "id_type":result[apptNb].id_type,
                                "id_client":result[apptNb].id_client,
                                "date_start":start,
                                "date_end":end,
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
                        let start = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateStart)
                        let end = fix.fixStringDateTimeFromSQL(result[apptNb].appt_dateEnd)
                        appts.push(
                            {
                                "id_type":result[apptNb].id_type,
                                "id_client":result[apptNb].id_client,
                                "date_start":start,
                                "date_end":end,
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
                        "idPro":result[0].id_pro
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
                            "idPro":result[typeNb].id_pro
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
              const insert_query = mysql.format(sqlInsert,[apptType.name, apptType.duration, apptType.price, apptType.startDate, apptType.endDate, apptType.public, apptType.idPro])
      
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
                        "name":result[medNB].nom,
                        "text1":result[medNB].text1,
                        "text2":result[medNB].text2,
                        "text3":result[medNB].text3,
                        "img":result[medNB].img
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
                        "name":result[0].nom,
                        "text1":result[0].text1,
                        "text2":result[0].text2,
                        "text3":result[0].text3,
                        "img":result[0].img
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