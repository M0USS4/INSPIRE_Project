const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session');

require('dotenv').config()

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

const mysql = require("mysql")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")


const dbHelper = require('./dbHelper');
const security = require('./security');

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

db.getConnection( (err, connection)=> {   if (err) throw (err)
  console.log ("DB connected successful: " + connection.threadId)})

app.get('/test' , async (req,res) => {

  let user={
    "mail":"mail",
    "name":"userdb.name",
    "surname":"userdb.surname",
    "phone":"userdb.phone",
    "birth":"userdb.birth",
    "adress":"adress"
}
console.log("Login success")
console.log(user)

let secret = process.env.JWT_SECRET_KEY;

const expireIn = 24 * 60 * 60;
  const token    = jwt.sign({
      infos: {
        "type" :0,
        "user":user
      }
  },
  secret,
  {
      expiresIn: expireIn
  });

  res.header('Authorization', 'Bearer ' + token);

return res.status(200).json('auth_ok');

});

app.get("/tokenTest", async (req, res) => {
  
});

app.listen(PORT, () => {
  console.log("Serveur à l'écoute")
})

app.post("/register/post", async (req,res) => {

  console.log("Register for")
  console.log(req.body)
  console.log("user")
  console.log(req.body.user)

  const passwd = req.body.login.password
  const passwdV = req.body.login.password_v
  
  if(passwd==passwdV)
  {
    console.log("password valid")
    const type = req.body.type;

  const adress = {
    "number":req.body.user.adress.number,
    "street":req.body.user.adress.street,
    "postalC":req.body.user.adress.postalC,
    "city":req.body.user.adress.city,
    "supp":req.body.user.adress.supp
  }

  let user;

  if(type==0){
    user={
      "name":req.body.user.name,
      "surname":req.body.user.surname,
      "phone":req.body.user.phone,
      "birth":req.body.user.birth,
      "adress":adress,
    }
  }else if(type==1){
    user={
      "name":req.body.user.name,
      "surname":req.body.user.surname,
      "phone":req.body.user.phone,
      "birth":req.body.user.birth,
      "adress":adress,
      "img":req.body.user.img,
      "cv":req.body.user.cv,
      "diploma":req.body.user.diploma
    }
  }else{
    console.log("type: "+type)
    return res.status(400).json("bad request")
  }

  try
  {const hashedPassword = await bcrypt.hash(req.body.login.password,10);
    const login = {
      "mail":req.body.login.mail,
      "password":hashedPassword
    }
    console.log("Trying to register "+login.mail)
    console.log(user)

    db.getConnection( async (err, connection) => { 
      if (err) {
        console.log(err)
        return res.status(500).json("error server")
      }
        const sqlSearch = "SELECT * FROM login WHERE mail = ?"
        const search_query = mysql.format(sqlSearch,[login.mail]) 

        const sqlInsert = "INSERT INTO login (mail, mdp) VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert,[login.mail, login.password])

        var idlogin = 0;
        var idAdress = 0;

         connection.query (search_query, async (err, result) => {  
          if (err) {
            console.log(err)
            return res.status(500).json("error server")
          }
          console.log("------> Search Results")
          console.log(result.length)  
          if (result.length != 0) {
            //connection.release()
            console.log("------> User already exists")
            return res.status(409).json("Mail already in use")
          } 
          else {
             connection.query (insert_query, (err, result)=> {   
              //connection.release()   
              if (err) {
                  console.log(err)
                  return res.status(500).json("error server")
              }
              console.log ("--------> Created new login");
              console.log(result.insertId);
              idlogin = result.insertId;
              console.log("new login has id "+idlogin)

              console.log("different from 0? : "+(idlogin!=0))
              if(idlogin!=0){
                console.log("adress loop")
                const sqlInsertAdress = "INSERT INTO adress (pays, num, rue, codeP, ville, supp) VALUES ('FR',?,?,?,?,?)"
                const insertAdress_query = mysql.format(sqlInsertAdress,[user.adress.number, user.adress.street, user.adress.postalC, user.adress.city, user.adress.supp])

                 connection.query (insertAdress_query, (err, result)=> {   
                    //connection.release()   
                    if (err) {
                        console.log(err)
                        return res.status(500).json("error server")
                    }
                    console.log ("--------> Created new adress");
                    console.log("id adress created is "+result.insertId);

                    idAdress = result.insertId;

                    console.log("idadresse: "+idAdress+" et idLogin: "+idlogin);
              if(idAdress != 0 && idlogin != 0){
                console.log("Loop creation user")
                if(type===0){
                  console.log("type=0")
                    const sqlInsertUser = "INSERT INTO client (nom, prenom, id_login, tel, birth, id_adress) VALUES (?,?,?,?,?,?)"
                    
                    const insertUser_query = mysql.format(sqlInsertUser,[user.name, user.surname, idlogin, user.phone, user.birth, idAdress])
      
                     connection.query (insertUser_query, (err, result)=> {   
                        //connection.release()   
                        if (err) {
                            console.log(err)
                            return res.status(500).json("error server")
                        }
                        console.log ("--------> Created new client");
                        console.log(result.insertId);
                        let secret = process.env.JWT_SECRET_KEY;

                        user["mail"]=login.mail

                        const expireIn = 24 * 60 * 60;
                          const token    = jwt.sign({
                              infos: {
                                "type" :0,
                                "user":user
                              }
                          },
                          secret,
                          {
                              expiresIn: expireIn
                          });

                          res.header('Authorization', 'Bearer ' + token);
                        return res.status(201).json("Client account successfuly created")
                    })
                }else if (type === 1){
                  console.log("type=1")
                  console.log(user.img)
                    const sqlInsertPro = "INSERT INTO pro (nom, prenom, id_login, tel, birth, id_adress, img, cv, diplome, etat) VALUES (?,?,?,?,?,?,?,?,?,?)"
                    const insertPro_query = mysql.format(sqlInsertPro,[user.name, user.surname, idlogin, user.phone, user.birth, idAdress, user.img, user.cv, user.diploma, false])
      
                     connection.query (insertPro_query, (err, result)=> {   
                        //connection.release()   
                        if (err) {
                            console.log(err)
                            return res.status(500).json("error server")
                        }
                        console.log ("--------> Created new pro");
                        console.log(result.insertId);

                        let secret = process.env.JWT_SECRET_KEY;
                        user["mail"]=login.mail

                        const expireIn = 24 * 60 * 60;
                        const token    = jwt.sign({
                            infos: {
                              "type" :1,
                              "user":user
                            }
                        },
                        secret,
                        {
                            expiresIn: expireIn
                        });

                        res.header('Authorization', 'Bearer ' + token);
                        return res.status(201).json("Professionnal account successfuly created")
                    })
                    }else{
                      console.log("pb type")
                      return res.status(400).json("Bad request")
                    }
                  }else{
                    console.log("pb creation compte")
                    return res.status(400).json("Bad request")
                  }
                })
              }else{
              console.log("probleme sur l'id login")
              return res.status(400).json("Bad request")
            }
            })
          }
        })
      }) 
  }
  catch(error){
      console.log("error")
      console.log(error)
      return res.status(400).json("Could not process the registration")
  }}else{
    console.log("password verif not correct")
    console.log(passwd+" vs "+passwdV)
    return res.status(400).json("Passwords are different")
  }
})

app.post("/login/post", (req, res)=> {

  //console.log(req)

  const login = {
    "mail":req.body.login.mail,
    "password":req.body.login.password
  }

  let id_user;
  try{
    console.log("user "+login.mail+" trying to login")

    console.log(login)

    db.getConnection ( async (err, connection)=> { 
      if (err) {
        console.log(err);
        return res.status(500).json("error server")
      }
      const sqlSearch = "Select * from login where mail = ?"
      const search_query = mysql.format(sqlSearch,[login.mail]) 
      connection.query (search_query, async (err, result) => {  
        
      //connection.release()
       if (err){
        return res.status(500).json("error server")
       } 
       if (result.length == 0) {
        console.log("--------> User does not exist")
        return res.status(404).json("Can't find user")
       } 
       else {
         console.log(result)
          const hashedPassword = result[0].mdp

          console.log(login.password+"  et   "+hashedPassword)

          //const passwd = bcrypt.hash(login.password,10)
            
          if (bcrypt.compare(login.password, hashedPassword)) {
         console.log("---------> Login Successful")
         id_user = result[0].id
         console.log("id login: "+id_user)

         dbHelper.getClient(id_user, db, function(err, userdb){
          if(!err){
            if(userdb.found){
            console.log("inside function to get info about: "+userdb.name)
            let adress = dbHelper.getAdress(userdb.idadress, db, function(err, adress){
              if(!err){let mail = dbHelper.getMail(userdb.idlogin, db, function(err, mail){
                if(!err){let user={
                    "mail":mail,
                    "name":userdb.name,
                    "surname":userdb.surname,
                    "phone":userdb.phone,
                    "birth":userdb.birth,
                    "adress":adress
                }
                console.log("Login success")
                console.log(user)

                let secret = process.env.JWT_SECRET_KEY;

                const expireIn = 24 * 60 * 60;
                  const token    = jwt.sign({
                      infos: {
                        "type" :0,
                        "user":user
                      }
                  },
                  secret,
                  {
                      expiresIn: expireIn
                  });

                  res.header('Authorization', 'Bearer ' + token);

                return res.status(200).json('auth_ok');

              }else{
                console.log("error getting the mail")
              }
              });}else{
                console.log("error getting adress")
              }
            });}else{
              dbHelper.getPro(id_user, db, function(err, userdb){
                if(!err){
                  if(userdb.found){
                    let adress = dbHelper.getAdress(userdb.idadress, db, function(err, adress){
                      if(!err){let mail = dbHelper.getMail(userdb.idlogin, db, function(err, mail){
                        if(!err){let user={
                            "mail":mail,
                            "name":userdb.name,
                            "surname":userdb.surname,
                            "phone":userdb.phone,
                            "birth":userdb.birth,
                            "adress":adress,
                            "img":userdb.img,
                            "cv":userdb.cv,
                            "diploma":userdb.diploma
                        }
                        console.log(user)
                        let secret = process.env.JWT_SECRET_KEY;

                        const expireIn = 24 * 60 * 60;
                          const token    = jwt.sign({
                              infos: {
                                "type":1,
                                "user":user
                              }
                          },
                          secret,
                          {
                              expiresIn: expireIn
                          });

                          res.header('Authorization', 'Bearer ' + token);
                          return res.status(200).json('auth_ok');
                      }else{
                        console.log("error getting the mail")
                      }
                      });}else{
                        console.log("error getting adress")
                      }
                    });
                  }else{
                    dbHelper.getPro(id_user, db, function(err, userdb){
                      if(!err){
                        if(userdb.found){
                          let secret = process.env.JWT_SECRET_KEY;

                          const expireIn = 24 * 60 * 60;
                            const token    = jwt.sign({
                                infos: {
                                  "type":2,
                                  "user":{
                                    "idlogin":userdb,
                                    "mail":login.mail
                                  }
                                }
                            },
                            secret,
                            {
                                expiresIn: expireIn
                            });

                            res.header('Authorization', 'Bearer ' + token);
                            return res.status(200).json('auth_ok');
                        }else{
                          console.log("no admin found with this login")
                        }
                      }else{
                        console.log(err)
                      }
                    })
                  }
                }else{
                    console.log(err)
                  }
                })
            }
            
          }else{
            console.log("error getting client")
          }
        });
         } 
         else {
         console.log("---------> Password Incorrect")
         return res.status(401).json("wrong password")
         } 
        }
      }) 
    }) 
  }catch(error){
    console.log(error);
    return res.status(400).json("bad request")
  }
})