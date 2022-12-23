const express = require('express');

const router = new express.Router();

const searchController = require('../../controllers/search.controller');

router.get('/search/story/:searchWord/:limit', searchController.searchStory);
router.get('/search/user/:searchWord/:limit', searchController.searchUser);

module.exports = router;
