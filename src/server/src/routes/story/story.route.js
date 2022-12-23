const express = require('express');

const router = new express.Router();
const verifyToken = require('../../middleware/isLogin');

const storyController = require('../../controllers/story.controller');
const {upload} = require('../../controllers/upload.controller');

// Crawl the story
router.get('/story/all/:limit', storyController.getAllStories);
router.get('/story/newest/:limit', storyController.getNewestStories);
router.get('/story/me', verifyToken, storyController.getStoriesOfUser);
router.get('/story/:storyId/contents/:limit', verifyToken, storyController.getPartContentsOfStory);
router.get('/story/:storyId/fullcontents', verifyToken, storyController.getContentsOfStory);
router.post('/story/crawl', upload.single('story'), storyController.crawlStory);
router.put(
    '/story/:storyId',
    verifyToken,
    upload.single('story'),
    storyController.updateStory,
);
router.delete('/story/', verifyToken, storyController.deleteStory);
router.get('/story/:storyId', storyController.getStoryByStoryId);
router.post(
    '/story/',
    verifyToken,
    upload.single('story'),
    storyController.createStory,
);
router.post('/story/views', verifyToken, storyController.updateStoryView);
router.post('/story/vote/', verifyToken, storyController.voteStory);

module.exports = router;
