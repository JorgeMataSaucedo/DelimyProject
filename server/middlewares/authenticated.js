const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../constants');
const {login} = require("../controllers/auth");

const asureAuth = (req, res, next) => {
   if(!req.headers.authorization){
       return res.status(403).send({message: 'The request does not have the authentication header'});
   }

    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const payload = jwt.decode(token, JWT_SECRET_KEY);
        const {exp} = payload;
        const currentDate = new Date().getTime();
        if(exp <= currentDate){
            return res.status(401).send({message: 'Token expired'});
        }

        req.user = payload;
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).send({message: 'Invalid token'});
    }

}

module.exports = {
    asureAuth
}