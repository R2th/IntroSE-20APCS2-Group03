const express = require('express');
const verifyToken = require('../../middleware/isLogin');

const router = new express.Router();

const collectionController = require('../../controllers/collection.controller');

router.get('/collection/', verifyToken, collectionController.getCollections);
router.post('/collection/', verifyToken, collectionController.createCollection);
router.delete('/collection/:collectionId/', verifyToken, collectionController.deleteCollection);
router.patch('/collection/:collectionId/:storyId/add/', verifyToken, collectionController.addStoryToCollection); // ???
router.patch('/collection/:collectionId/:storyId/remove/',
    verifyToken,
    collectionController.removeStoryToCollection); // ???


module.exports = router;
