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

router.get('/user/:username', userController.getUserProfile);

router.post('/user/', verifyToken, userController.updateUserProfile);

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

router.get('/user/:username/followers', userController.getFollowers);

router.get('/user/:username/num_followers', userController.getNumberOfFollowers);

router.get('/user/:username/followings', userController.getFollowings);

router.get('/user/:username/num_followings', userController.getNumberOfFollowings);

router.get('/user/:username/num_upvotes', userController.getNumberOfUpvotes);


// body: "followingUsername": ...
router.post('/user/follow', verifyToken, userController.followUser);

// body: "followingUsername": ...
router.delete('/user/follow', verifyToken, userController.unfollowUser);

router.get('/user/:followingUsername/followed', verifyToken, userController.hasFollowed);

module.exports = router;
