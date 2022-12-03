const fs = require('fs');
const db = require('../db/index');
const User = db.user;

const publicAccess = (req, res) =>{
    res.status(200).send("This is public content.");
}

const userPanel = (req, res) =>{
    res.status(200).send({
        message: "This is user's panel",
        userId: req.userId
    });
}

const adminPanel = (req, res) =>{
    res.status(200).send({
        message: "This is admin's panel",
    });
}

const uploadAvatar = async (req, res) => {
    await User.update( 
      { avatar: req.file.filename },
      {
        where: {
          username: req.params.username,
        },
      }
    );
    res.send("file uploaded successfully");
};

const getAvatar = async (req, res) =>{
    const user = await User.findOne({
        where:{
            username: req.params.username
        }
    });
    if(!user || !user.avatar){
        throw new Error("Avatar not found!");
    }
    else{
        const filePath = 'upload/' + user.avatar;
        res.sendFile(filePath);
    }
}




module.exports = {
    publicAccess,
    userPanel,
    adminPanel,
    uploadAvatar,
    getAvatar
}