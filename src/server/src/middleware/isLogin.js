const jwt = require('jsonwebtoken');
const db = require("../db/index");
const User = db.user;

verifyToken = async (req, res, next) =>{
    var token = req.header('Authorization');
    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    token = token.replace('Bearer ','');

    jwt.verify(token, 'bytesgotoken', async (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        else{
            const user = await User.findOne({
                where: {username: decoded.username}
            });
            req.userId = user.id;
            next();
            return;
        }
    });
}

module.exports = verifyToken;