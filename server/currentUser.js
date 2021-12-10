class Singleton {

    constructor() {
        this.connected = false;
        this.user={};
    };


    static getInstance() {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }

    setUserInfo(mail, name, surname, phone, birth, adress) {
        this.user["info"]={
            "mail":mail,
            "name":name,
            "surname":surname,
            "phone":phone,
            "birth":birth,
            "adress":adress
        }
    }

    setUserProInfo(img, cv, diploma) {
        this.user.info["img"]=img;
        this.user.info["cv"]=cv;
        this.user.info["diploma"]=diploma;
    }

    setUserAppt(appts) {
        this.user["appt"]=appts;
    }

    connectUser(){
        console.log("connected user")
        this.connected = true
        this.user = {}
    }

    disconnectUser(){
        this.connected = false;
        this.user = {};
    }

    getUser(){
        return this.user;
    }

    isUserConnected(){
        return this.connected
    }
  }


module.exports = Singleton;
