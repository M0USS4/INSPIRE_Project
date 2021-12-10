const express = require("express");
require('dotenv').config()

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())

const mysql = require("mysql")

const bcrypt = require("bcrypt")

//var co = require('./connection');
const dbHelper = require('./dbHelper');

var singleton = require('./currentUser')

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

app.get('/test', async (req,res) => {
  res.send(singleton.getInstance().getUser());
})

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
    res.sendStatus(400);
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
        res.sendStatus(500);
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
            res.sendStatus(500);
          }
          console.log("------> Search Results")
          console.log(result.length)  
          if (result.length != 0) {
            //connection.release()
            console.log("------> User already exists")
            res.sendStatus(409)
          } 
          else {
             connection.query (insert_query, (err, result)=> {   
              //connection.release()   
              if (err) {
                  console.log(err)
                  res.sendStatus(500);
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
                        res.sendStatus(500);
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
                            res.sendStatus(500);
                        }
                        console.log ("--------> Created new client");
                        console.log(result.insertId);
                        res.sendStatus(201);
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
                            res.sendStatus(500);
                        }
                        console.log ("--------> Created new pro");
                        console.log(result.insertId);
                        res.sendStatus(201);
                    })
                    }else{
                      console.log("pb type")
                      res.sendStatus(400);
                    }
                  }else{
                    console.log("pb creation compte")
                    res.sendStatus(400);
                  }
                })
              }else{
              console.log("probleme sur l'id login")
              res.sendStatus(400);
            }
            })
          }
        })
      }) 
  }
  catch(error){
      console.log("error")
      console.log(error)
      res.sendStatus(400);
  }}else{
    console.log("password verif not correct")
    console.log(passwd+" vs "+passwdV)
    return 400;
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
        res.sendStatus(500)
      }
      const sqlSearch = "Select * from login where mail = ?"
      const search_query = mysql.format(sqlSearch,[login.mail]) 
      connection.query (search_query, async (err, result) => {  
        
      //connection.release()
       if (err){
        res.sendStatus(500)
       } 
       if (result.length == 0) {
        console.log("--------> User does not exist")
        res.sendStatus(404)
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
                console.log(user)
                singleton.getInstance().connectUser();
                singleton.getInstance().setUserInfo(user.mail, user.name, user.surname, user.phone, user.birth, user.adress);
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
                        singleton.getInstance().connectUser();
                        singleton.getInstance().setUserInfo(user.mail, user.name, user.surname, user.phone, user.birth, user.adress);
                        singleton.getInstance().setUserProInfo(user.img, user.cv, user.diploma)
                      }else{
                        console.log("error getting the mail")
                      }
                      });}else{
                        console.log("error getting adress")
                      }
                    });
                  }else{
                    //FAIRE LE GET ADMIN ICI
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

         res.sendStatus(200)
         } 
         else {
         console.log("---------> Password Incorrect")
         res.sendStatus(401)
         } 
        }
      }) 
    }) 
  }catch(error){
    console.log(error);
    res.sendStatus(400);
  }
})