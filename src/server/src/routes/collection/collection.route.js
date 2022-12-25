const express = require('express');
const verifyToken = require('../../middleware/isLogin');

const router = new express.Router();

const collectionController = require('../../controllers/collection.controller');

router.get('/me/collection/', verifyToken, collectionController.getCollections);
router.post('/me/collection/', verifyToken, collectionController.createCollection);
router.patch('/me/collection/add', verifyToken, collectionController.addStoryToCollection); // ???
router.patch('/me/collection/remove', verifyToken, collectionController.removeStoryToCollection); // ???


module.exports = router;
