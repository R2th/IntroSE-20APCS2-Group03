const express = require('express');

const router = new express.Router();
const verifyToken = require('../../middleware/isLogin');
const isPremium = require('../../middleware/isPremium');

const storyController = require('../../controllers/story.controller');
const {upload} = require('../../controllers/upload.controller');

// Crawl the story
router.get('/story/all/:limit', storyController.getAllStories);
router.get('/story/newest/:limit', storyController.getNewestStories);
router.get('/story/author/:username', verifyToken, storyController.getStoriesOfAuthor);
router.get('/story/:storyId/contents/:start/:len', isPremium, storyController.getPartContentsOfStory);
router.get('/story/:storyId/contents/full', isPremium, storyController.getContentsOfStory);
router.get('/story/:storyId/other-data', storyController.getOtherDataOfStory);
router.post('/story/crawl', upload.single('story'), storyController.crawlStory);
router.put(
    '/story/:storyId',
    verifyToken,
    upload.single('story'),
    storyController.updateStory,
);
router.delete('/story/:storyId', verifyToken, storyController.deleteStory);
router.get('/story/:storyId', isPremium, storyController.getStoryByStoryId);
router.post(
    '/story/',
    verifyToken,
    upload.single('story'),
    storyController.createStory,
);
router.post('/story/views', verifyToken, storyController.updateStoryView);

router.get('/story/:storyId/vote', verifyToken, storyController.getVoteStoryById);
router.post('/story/vote/', verifyToken, storyController.voteStory);

module.exports = router;
