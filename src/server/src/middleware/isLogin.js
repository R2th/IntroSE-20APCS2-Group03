const jwt = require('jsonwebtoken')

verifyToken = (req, res, next) =>{
    var token = req.header('Authorization');
    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    token = token.replace('Bearer ','');

    jwt.verify(token, 'bytesgotoken', (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        else{
            req.userId = decoded.id;
            next();
            return;
        }
    });
}

module.exports = verifyToken;