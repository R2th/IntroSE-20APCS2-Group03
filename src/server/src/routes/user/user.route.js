const express = require("express")
const router = express.Router()

const verifyToken = require("../../middleware/isLogin");
const isAdmin = require("../../middleware/isAdmin");
const userController = require("../../controllers/user.controller")
const uploadController = require("../../controllers/upload.controller");


//Get profile
router.get("/user/:username/", (req, res) =>{

})

//Upload avatar
router.post(
    "/user/me/avatar", 
    uploadController.upload.single("image"),
    uploadController.uploadImage);

//Delete avatar
router.delete("/user/me/avatar", (req, res) =>{})


//Get avatar for a user by their id
router.get("user/:id/avatar", async (req, res) =>{
    try{
        
    }
    catch(err){
        res.status(404).send()
    }
})

//Test accesss public resource without login
router.get("/user/test/all", userController.publicAccess);

//Content for users who have logged in
router.get(
    "/user/test/userPanel", 
    [verifyToken],
    userController.userPanel);

//Only allow admin to access
router.get(
    "/user/test/adminPanel",
    [verifyToken, isAdmin],
    userController.adminPanel);

module.exports = router