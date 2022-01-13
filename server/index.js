const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const session = require('express-session');
const mysql = require("mysql")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")


const dbHelper = require('./dbHelper');
const security = require('./security');
const fs = require('fs');
require('dotenv').config()
const nodemailer = require('nodemailer');
const cloudinary = require("cloudinary").v2;

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.mimetype.split('/');
console.log(ext[1]);
    cb(null, file.originalname+ '-' +file.fieldname + '-' + uniqueSuffix + '.' + ext[1] )
  }
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});
const upload = multer({ storage: storage });


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())
app.use(cors());

app.use(cookieParser());



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

app.listen(PORT, () => {
  console.log("Server listening")
})


app.post("/pro/topic/create", security.checkJWTPro, async (req, res) => {
  let title = req.body.title;
  let id_pro = req.decoded.infos.user.idUser
  console.log("trying to add "+title)
  let id_topic = 0;
  dbHelper.getPagePro(db, function(err, page){
    if(!err){
    dbHelper.getAllTopics(db, function(err, topics){
    if(!err){
      let exists = false;
      for (let topic of topics){
        if(!topic.title.localeCompare(title)){
          console.log("Topic already exist")
          exists=true;
          id_topic = topic.id;
        }
      }
      if(exists){
        dbHelper.linkTopicPro(id_topic, page.id, db, function(err, linked){
          if(!err){
            if(linked){
              console.log("successfuly linked")
              return res.status(200).json("topic already exists, linked to the page")
            }else{
              console.log("could not link")
              return res.status(500).json("error server, could not link")
            }
          }else{
            console.log(err)
            return res.status(500).json("error server, could not link")
          }
        })
      }else{
        dbHelper.addTopic(title, db, function(err, new_topic_id){
          if(!err){
            dbHelper.linkTopicPro(new_topic_id, page.id, db, function(err, linked){
              if(!err){
                if(linked){
                  console.log("successfuly linked")
                  return res.status(201).json("Created and linked topic")
                }else{
                  console.log("could not link")
                }
              }else{
                console.log(err)
                return res.status(500).json("error server, could not link")
              }
            })
          }else{
            console.log(err)
            return res.status(500).json("error server, could not create topic")
          }
        })
      }
    }
  })
  }
  else{
    console.log(err)
    return res.status(404).json("error server, could not find page for pro")
  }
})
})
 
app.post("/upload",upload.array("files"), async (request, response) => {
  // collected image from a user
  const data = request.body;
  const files = request.files;
  console.log(data);
  console.log(request.files);


  for (const file of files) {
  cloudinary.uploader.upload(file.path)
  .then((result) => {
    response.status(200).send({
      message: `${file.originalname} upload success`,
      result,
    });
  }).catch((error) => {
    console.log(error)
    response.status(500).send({
      message:`${file.originalname} upload failure`,
      error,
    });
  });
  }
});
app.get("/getAllPros", async (req, res) => {
  dbHelper.getAllPros( db, function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find pros")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })
})

app.get("/getAllClients", async (req, res) => {
  dbHelper.getAllClients( db, function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find clients")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })
})

app.get("/getAllProsByParams", async (req, res) => {
  let params = req.query;
  dbHelper.getAllProsByParams( db, params, function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find pros")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })

})

app.get("/getProDetailed", async (req, res) => {
  let pro_id = req.query.pro_id;
  dbHelper.getProDetailed( pro_id, db,function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find pros")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })

})

app.get("/getAppointmentTypes", async (req, res) => {
  let pro_id = req.query.pro_id;
  dbHelper.getAppointmentTypes( pro_id, db,function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find pros")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })

})

app.get("/getAllMedicine", async (req, res) => {
  dbHelper.getAllMedicine( db, function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find Medicine types")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })

})
// app.post("/pro/appt/create", security.checkJWTPro, async (req, res) => {
  app.post("/pro/appt/create",  async (req, res) => {

  console.log("Creating appt ")
  console.log(req.body)

  let rdv_type, client;

  if(req.body.appointmentType===0)
  {
    rdv_type = process.env.BLOCK_TYPE_ID;
    client = process.env.BLOCK_CLIENT_ID;
    console.log(rdv_type+" et "+client)
  }else{
    rdv_type = req.body.appointmentType;
    client = req.body.clientId;
    console.log(rdv_type+" et "+client)
  }
  let appt = {
    "idClient":client,
    "idPro":req.body.proId,
    "idType":rdv_type,
    "apptDateStart":req.body.start,
    "apptDateEnd":req.body.end,
    "proMail": req.body.proMail
  }
  console.log(appt)
  dbHelper.addAppt(appt, db, function(err, added){
    if(!err){
      if(added){
        // return res.status(201).json("appt added")
        dbHelper.SendConfirmatoryEmail(appt, db, transporter, function(err, resp){
          if(!err){
            if(resp){
              return res.status(201).json(resp)
            }else{
              return res.status(500).json("Could not send confirrmatory email")
            }
          }else{
            console.log(err)
            return res.status(500).json("Error server")
          }
        })
      }else{
        return res.status(500).json("Could not add the appt")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })
})
app.post("/admin/medicine/create",upload.array("files"), async (req,res) => {
  const files = req.files;
  const data = JSON.parse(req.body.data);
  console.log(files);
  console.log(data);

  let imageUrl;


  let upload_res = files.map(file => 
    new Promise((resolve, reject) => {
      const { path, originalname } = file;

      cloudinary.uploader.upload(path, {
        resource_type: "auto",
        folder: originalname
      },function (error, result) {
        console.log('...trying to upload')  
        if(error) {
            console.log(error)
            reject(error)
          }
          else {
            imageUrl = result.url;

            fs.unlinkSync(path)
            resolve({
              url: result.url,
              id: result.public_id,
          })
          }
      })
  })
    
  )
  Promise.all(upload_res)
  .then(async result => {
    const medicine = {
      nom_medicine : data.name, 
      text1 : data.text1, 
      text2 : data.text2,
      text3 : data.text3, 
      img_medicine : imageUrl
    }

    dbHelper.addMedicine( medicine, db, function(err, result){
      if(!err){
        if(result){
          return res.status(200).send(result)
        }else{
          return res.status(500).json("Could not create Medicine type")
        }
      }else{
        console.log(err)
        return res.status(500).json("Error server")
      }
    })
  }
    )
  .catch(error => error)
})
app.post("/client/appt/update",  async (req, res) => {

  console.log("Updating appt ")
  console.log(req.body)

  let appt = {
    "id_client":req.body.idClient,
    "id_pro":req.body.idPro,
    "note_client":req.body.note_client,
    "rating":req.body.rating,
  }
  dbHelper.updateApptClient(appt, db, function(err, added){
    if(!err){
      if(added){
        return res.status(201).json("rating and note updated")
      }else{
        return res.status(500).json("Could not add the appt")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })
})
app.get("/pro/appt/all/v2", async (req, res) => {
  let pro_id = req.query.pro_id;
  dbHelper.getApptForPro( pro_id, db,function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find appointments for pro")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })

})

app.get("/client/appt/all/v2", async (req, res) => {
  let client_id = req.query.client_id;
  dbHelper.getApptForClient( client_id, db,function(err, result){
    if(!err){
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(500).json("Could not find appointments for client")
      }
    }else{
      console.log(err)
      return res.status(500).json("Error server")
    }
  })

})

// app.get("/pro/appt/all", security.checkJWTPro, async (req, res) => {
app.get("/pro/appt/all", async (req, res) => {
  // let idPro = req.decoded.infos.user.idUser
  let idPro = req.query.pro_id

  let completedAppts=[];
  dbHelper.getApptForPro(idPro, db, function(err, appts){
    if(!err){
      if(appts.length>0){
        for(let i =0; i<appts.length;i++){
          dbHelper.getRdvType(appts[i].id_type, db, function(err, rdv_type){
            if(!err){
                  dbHelper.getClient(appts[i].id_client, db, function(err, userdb){
                    if(!err){
                      if(userdb.found){
                      let adress = dbHelper.getAdress(userdb.idadress, db, function(err, adress){
                        if(!err){let mail = dbHelper.getMail(userdb.idlogin, db, function(err, mail){
                          if(!err){let user={
                              "idUser":userdb.idUser,
                              "mail":mail,
                              "name":userdb.name,
                              "surname":userdb.surname,
                              "phone":userdb.phone,
                              "birth":userdb.birth,
                              "adress":adress
                          }
                          completedAppts.push({
                            "date_start":appts[i].date_start,
                            "date_end":appts[i].date_end,
                            "note_pro":appts[i].note_pro,
                            "client":user,
                            "type":rdv_type
                          })
                          if(completedAppts.length===appts.length){
                            console.log("finished fetching appts")
                            console.log(completedAppts)
                            return res.status(200).json(completedAppts)
                          }
                        }else{
                          console.log("Error getting the mail of the client")
                          return res.status(500).json("error server")
                        }
                      })
                    }else{
                      console.log("error getting the adress of the client")
                      return res.status(500).json("error server")
                    }
                  })
                }else{
                  console.log("Client not found")
                  return res.status(404).json("client of the appointment not found")
                }
              }else{
                console.log("error getting the client")
                return res.status(500).json("error server")
              }
            })
            }else{
              console.log("error getting the rdv type")
              return res.status(500).json("error server")
            }
          })
        }
      }else{
        console.log("no appt to fetch")
        return res.status(204).json("no appointments for said pro")
      }
    }else{
      console.log(err)
      return res.status(500).json("error fetching appt")
    }
    console.log("made it to the end")
  })
  
});

app.post("/register/post", async (req,res) => {

  console.log("Registration")
  console.log(req.body.type);

  const passwd = req.body.login.password
  const passwdV = req.body.login.password_v
  
  if(passwd==passwdV)
  {
    console.log("password valid")
    const type = req.body.type;

  let adress = {
    "number":req.body.user.adress.number,
    "street":req.body.user.adress.street,
    "postalC":req.body.user.adress.postalC,
    "city":req.body.user.adress.city,
    "supp":req.body.user.adress.supp
  }

  let user;
  let dBirth = new Date(req.body.user.birth)
  dBirth.setHours(14)

  if(type==0){

    user={
      "name":req.body.user.name,
      "surname":req.body.user.surname,
      "phone":req.body.user.phone,
      "birth":dBirth,
      "adress":adress,
    }
  }else if(type==1){
    adress = {
      "number":req.body.user.adress.number,
      "street":req.body.user.adress.street,
      "postalC":req.body.user.adress.postalC,
      "city":req.body.user.adress.city,
      "supp":req.body.user.adress.supp,
      "latitude": req.body.user.adress.coordinates[0],
      "longitude": req.body.user.adress.coordinates[1],
    }
    user={
      "name":req.body.user.name,
      "surname":req.body.user.surname,
      "phone":req.body.user.phone,
      "birth":dBirth,
      "adress":adress,
      "img":req.body.user.img,
      "cv":req.body.user.cv,
      "diploma":req.body.user.diploma,
      "status": 1
    }
  }else{
    console.log("type error: "+type)
    return res.status(400).json("bad request")
  }

  try
  {const hashedPassword = await bcrypt.hash(req.body.login.password,10);
    const login = {
      "mail":req.body.login.mail,
      "password":hashedPassword
    }

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
          console.log(result.length)  
          if (result.length != 0) {
            console.log("------> User already exists")
            return res.status(409).json("Mail already in use")
          } 
          else {
             connection.query (insert_query, (err, result)=> {      
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
                const sqlInsertAdress = "INSERT INTO adress (pays, num, rue, codeP, ville, supp, latitude, longitude) VALUES ('FR',?,?,?,?,?,?, ?)"
                const insertAdress_query = mysql.format(sqlInsertAdress,[user.adress.number, user.adress.street, user.adress.postalC, user.adress.city, user.adress.supp, user.adress.latitude, user.adress.longitude])

                 connection.query (insertAdress_query, (err, result)=> {   
  
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
                    const sqlInsertUser = "INSERT INTO client (nom, prenom, id_login, tel, birth, id_adress, status) VALUES (?,?,?,?,?,?,?)"
                    
                    const insertUser_query = mysql.format(sqlInsertUser,[user.name, user.surname, idlogin, user.phone, user.birth, idAdress, true])
      
                     connection.query (insertUser_query, (err, result)=> {   

                        if (err) {
                            console.log(err)
                            return res.status(500).json("error server")
                        }
                        console.log ("--------> Created new client");
                        console.log(result.insertId);
                        let secret = process.env.JWT_SECRET_KEY;

                        user["mail"]=login.mail
                        user["idUser"]=result.insertId

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
                        if (err) {
                            console.log(err)
                            return res.status(500).json("error server")
                        }
                        console.log ("--------> Created new pro");
                        console.log(result.insertId);
                        user["idUser"]=result.insertId

                        dbHelper.addPagePro(result.insertId, db, function(err, added){
                          if(!err){
                            if(added){
                              console.log("pro page added")
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
                            }else{
                              console.log("cound not add pro page")
                              return res.status(500).json("error server")
                            }
                          }else{
                            console.log(err)
                            return res.status(500).json("error server")
                          }
                        })
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
      return res.status(500).json("Could not process the registration")
  }}else{
    console.log("password verif not correct")
    console.log(passwd+" vs "+passwdV)
    return res.status(400).json("Passwords are different")
  }
})

app.post("/register/pro/post",upload.array("files"), async (req,res) => {
  const files = req.files;
  const data = JSON.parse(req.body.data);
  let imageUrl;
  let cvUrl;
  let diplomeUrl;
  let upload_res = files.map(file => 
    new Promise((resolve, reject) => {
      const { path, originalname } = file;

      cloudinary.uploader.upload(path, {
        resource_type: "auto",
        folder: originalname
      },function (error, result) {
        console.log('...trying to upload')  
        if(error) {
            console.log(error)
            reject(error)
          }
          else {
            switch(originalname){
            case 'image':
              imageUrl = result.url;
              break
            case 'cv':
              cvUrl = result.url;
              break
            case 'diplome':
              diplomeUrl = result.url;
              break
            }
            fs.unlinkSync(path)
            resolve({
              url: result.url,
              id: result.public_id,
              type: originalname
          })
          }
      })
  })
    
  )

  Promise.all(upload_res)
    .then(async result => {      
        const passwd = data.login.password
        const passwdV = data.login.password_v
        
        if(passwd==passwdV)
        {
          console.log("password valid")
          const type = data.type;
      
        const adress = {
          "number":data.user.adress.number,
          "street":data.user.adress.street,
          "postalC":data.user.adress.postalC,
          "city":data.user.adress.city,
          "supp":data.user.adress.supp,
          "latitude": req.body.user.adress.coordinates[0],
          "longitude": req.body.user.adress.coordinates[1],
        }
      
        let user;
        let dBirth = new Date(data.user.birth)
        dBirth.setHours(14)
        console.log("birth: "+dBirth)
      
        if(type==1){
          user={
            "name":data.user.name,
            "surname":data.user.surname,
            "phone":data.user.phone,
            "birth":dBirth,
            "adress":adress,
            "img":imageUrl,
            "cv":cvUrl,
            "diploma":diplomeUrl,
            "practice": data.user.practice
          }
        }else{
          console.log("type: "+type)
          return res.status(400).json("bad request")
        }
      
        try
        {const hashedPassword = await bcrypt.hash(data.login.password,10);
          const login = {
            "mail":data.login.mail,
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
                      const sqlInsertAdress = "INSERT INTO adress (pays, num, rue, codeP, ville, supp, latitude, longitude) VALUES ('FR',?,?,?,?,?, ?, ?)"
                      const insertAdress_query = mysql.format(sqlInsertAdress,[user.adress.number, user.adress.street, user.adress.postalC, user.adress.city, user.adress.supp, user.adress.latitude, user.adress.longitude])
      
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
                          const sqlInsertUser = "INSERT INTO client (nom, prenom, id_login, tel, birth, id_adress, status) VALUES (?,?,?,?,?,?,?)"
                          
                          const insertUser_query = mysql.format(sqlInsertUser,[user.name, user.surname, idlogin, user.phone, user.birth, idAdress, true])
            
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
                              user["idUser"]=result.insertId
      
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
                          const sqlInsertPro = "INSERT INTO pro (nom, prenom, id_login, id_type_medicine, tel, birth, id_adress, img, cv, diplome, etat, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
                          const insertPro_query = mysql.format(sqlInsertPro,[user.name, user.surname, idlogin, user.practice, user.phone, user.birth, idAdress, user.img, user.cv, user.diploma, false, false])
            
                           connection.query (insertPro_query, (err, result)=> {   
                              //connection.release()   
                              if (err) {
                                  console.log(err)
                                  return res.status(500).json("error server")
                              }
                              console.log ("--------> Created new pro");
                              console.log(result.insertId);
                              user["idUser"]=result.insertId
      
                              dbHelper.addPagePro(result.insertId, db, function(err, added){
                                if(!err){
                                  if(added){
                                    console.log("pro page added")
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
                                  }else{
                                    console.log("cound not add pro page")
                                    return res.status(500).json("error server")
                                  }
                                }else{
                                  console.log(err)
                                  return res.status(500).json("error server")
                                }
                              })
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
            return res.status(500).json("Could not process the registration")
        }}else{
          console.log("password verif not correct")
          console.log(passwd+" vs "+passwdV)
          return res.status(400).json("Passwords are different")
        }
       }
      )
    .catch(error => error)

})

app.post("/login/post", (req, res)=> {

  const login = {
    "mail":req.body.login.mail,
    "password":req.body.login.password
  }

  console.log("user "+login.mail+" trying to login")

  if(!login.mail.localeCompare("block")){
    return res.status(401).json("Unauthorized")
  }

  let id_user;
  try{

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
          const canConnect = await bcrypt.compare(login.password, hashedPassword);
            
          if (canConnect) {
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
                    "idUser":userdb.idUser,
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

                  user.token = token;
                  res.header('Authorization', 'Bearer ' + token);

                return res.status(200).json(user);

              }else{
                console.log("error getting the mail")
                return res.status(500).json("error server")
              }
              });}else{
                console.log("error getting adress")
                return res.status(500).json("error server")
              }
            });}else{
              dbHelper.getPro(id_user, db, function(err, userdb){
                if(!err){
                  if(userdb.found){
                    let adress = dbHelper.getAdress(userdb.idadress, db, function(err, adress){
                      if(!err){let mail = dbHelper.getMail(userdb.idlogin, db, function(err, mail){
                        if(!err){let user={
                            "idUser":userdb.idUser,
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
                        return res.status(500).json("error server")
                      }
                      });}else{
                        console.log("error getting adress")
                        return res.status(500).json("error server")
                      }
                    });
                  }else{
                    dbHelper.getAdmin(id_user, db, function(err, userdb){
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
    return res.status(500).json("error server")
  }
})

app.get("/practices/all", (req, res)=> {
  dbHelper.getAllMedicine(db, function(err, medicines){
    if(err){
      return res.status(500).json("error server")
    }else{
      if(medicines.length!=0){
        return res.status(200).json(medicines)
      }else{
        return res.status(204).json("no practices found")
      }
    }
  })
})

  app.post("/pro/practice/link", security.checkJWTPro, (req, res)=> {

    dbHelper.linkMedPro(req.decoded.infos.idUser, req.body.id_medicine,db, function(err, linked){
      if(err){
        return res.status(500).json("error server")
      }else{
        if(linked){
          return res.status(201).json("link created")
        }else{
          return res.status(500).json("error server")
        }
      }
    })
  })

  app.get("/pro/practice/all", security.checkJWTPro, (req, res)=> {

    dbHelper.getAllMedicineIdForPro(req.decoded.infos.idUser, db, function(err, medId){
      if(err){
        return res.status(500).json("error server")
      }else{
        if(medId.length!=0){
          let medicines = []
          dbHelper.getAllMedicine( db, function(err, allMeds){
            if(err){
              return res.status(500).json("error server")
            }else{
              if(allMeds.length!=0){
                let medicines = []
                for(let i=0;i<medId.length;i++){
                  for(let j=0;j<allMeds.length;j++){
                    if(medId[i]==allMeds[j].id){
                      medicines.push(allMeds[j])
                    }
                  }
                }
                if(medicines.length!=0){
                  return res.status(200).json(medicines)
                }else{
                  return res.status(500).json("error server")
                }
              }else
                {
                  return res.status(204).json("no practices found")
              }
            }
          })
        }else{
          return res.status(204).json("no practices found")
        }
      }
    })
})
