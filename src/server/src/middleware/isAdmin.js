const db = require('../db/index')
const User = db.user

isAdmin = (req, res, next) =>{
    User.findByPk(req.userId)
    .then(user =>{
        user.getRoles()
        .then(roles =>{
            for(let i=0; i < roles.length; i++){
                if(roles[i] === "admin"){
                    next();
                    return;
                }
            }
            
            res.status(403).send({
                message: "Admin role is required"
            });
            return;
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

module.exports = isAdmin