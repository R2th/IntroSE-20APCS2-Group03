const db = require('../db/index')
const User = db.user

const publicAccess = (req, res) =>{
    res.status(200).send("This is public content.");
}

const userPanel = (req, res) =>{
    res.status(200).send("This is user's panel");
}

const adminPanel = (req, res) =>{
    res.status(200).send("This is admin's panel");
}

const getUserAvatar = async(req, res) =>{
    try{
        const user = User.findByPk(req.params.id);

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }
    catch(err){
        res.status(404).send()
    }
}



module.exports = {
    publicAccess,
    userPanel,
    adminPanel
}