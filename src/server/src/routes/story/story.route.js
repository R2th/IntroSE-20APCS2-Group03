const express = require("express");
const router = express.Router();
const storyController = require("../../controllers/story.controller");
const { upload } = require("../../controllers/upload.controller");

// Get story
// router.get("/story/:storyId/", storyController.getStory);

// router.get("/story/:storyId/update", storyController.updateStory);

// Crawl the story

router.post("/story/crawl", upload.single("story"), storyController.crawlStory);

module.exports = router;
