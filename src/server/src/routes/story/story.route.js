const express = require("express")
const router = express.Router()
const storyController = require("../../controllers/story.controller")

// Get story
router.get("/story/:storyId/", storyController.getStory)

router.get("/story/:storyId/update", storyController.updateStory)

