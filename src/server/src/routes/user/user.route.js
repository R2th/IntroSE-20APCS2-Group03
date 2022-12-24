const express = require('express');

const router = new express.Router();

const verifyToken = require('../../middleware/isLogin');
const isAdmin = require('../../middleware/isAdmin');
const userController = require('../../controllers/user.controller');
const uploadController = require('../../controllers/upload.controller');

// Get profile
// router.get('/user/:username/', (req, res) => {

// });

// Get avatar of a specific user by their id
router.get('user/:username/avatar', userController.getAvatar);

// Upload avatar
// router.post(
//     '/user/:username/avatar',
//     verifyToken,
//     uploadController.upload.single('image'),
//     userController.uploadAvatar,
// );

// Delete avatar
// router.delete('/user/:username/avatar', (req, res) => {});

// Test accesss public resource without login
router.get('/user/test/all', userController.publicAccess);

// Content for users who have logged in
router.get(
    '/user/test/userPanel',
    [verifyToken],
    userController.userPanel,
);

// Only allow admin to access
router.get(
    '/user/test/adminPanel',
    [verifyToken, isAdmin],
    userController.adminPanel,
);

module.exports = router;
