const jwt        = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                    req.decoded = decoded;

                    const expiresIn = 24 * 60 * 60;
                    const newToken  = jwt.sign({
                        infos : decoded.infos
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });

                    res.header('Authorization', 'Bearer ' + newToken);
                    next();
                
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
}

exports.checkJWTClient = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                if (req.decoded.infos.type!=0){
                    return res.status(401).json("need to be a client")
                  }else
                    {
                    req.decoded = decoded;

                    const expiresIn = 24 * 60 * 60;
                    const newToken  = jwt.sign({
                        infos : decoded.infos
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });

                    res.header('Authorization', 'Bearer ' + newToken);
                    next();
                }                
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
}

exports.checkJWTPro = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                if (req.decoded.infos.type!=1){
                    return res.status(401).json("need to be a pro")
                  }else
                    {
                    req.decoded = decoded;

                    const expiresIn = 24 * 60 * 60;
                    const newToken  = jwt.sign({
                        infos : decoded.infos
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });

                    res.header('Authorization', 'Bearer ' + newToken);
                    next();
                }                
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
}

exports.checkJWTAdmin = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                if (req.decoded.infos.type!=2){
                    return res.status(401).json("need to be an admin")
                  }else
                    {
                    req.decoded = decoded;

                    const expiresIn = 24 * 60 * 60;
                    const newToken  = jwt.sign({
                        infos : decoded.infos
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });

                    res.header('Authorization', 'Bearer ' + newToken);
                    next();
                }                
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
}