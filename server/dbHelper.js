const mysql = require("mysql")

module.exports = {

    getApptForClient:function (idUser){
        db.getConnection( async (err, connection) => { 
            if (err) {
              return 500;
            }
              const sqlSearch = "SELECT id_pro, id_type, date, note_client FROM rdv where id_client = ?"
              const search_query = mysql.format(sqlSearch,[idUser])
      
              const idPro = 0;
              const idType = 0;
      
              await connection.query (search_query, async (err, result) => {  
                if (err) {
                  return 500;
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
                    console.log("pro found "+result[0].name)
                    //console.log(result[0].nom)
                    let user = {
                        "idlogin":result[0].id_login,
                        "name":result[0].nom,
                        "surname":result[0].prenom,
                        "phone":result[0].tel,
                        "birth":result[0].birth,
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
                    let user = {
                        "idlogin":result[0].id_login,
                        "name":result[0].nom,
                        "surname":result[0].prenom,
                        "phone":result[0].tel,
                        "birth":result[0].birth,
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
    }
}