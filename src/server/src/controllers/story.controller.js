const db = require("../db/index");
const fs = require("fs");
const Story = db.story;
const User = db.user;

const crawlStory = async (req, res) => {
  try {
    await Story.create(JSON.parse(req.body.data));
    res.status(200).send({
      filename: req.file.originalname,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

const getStoryByStoryId = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.storyId);
    const user = await User.findByPk(req.userId);

    if (!story || !user) {
      throw new Error();
    }
    // TODO: add "if user not subcribed to author"
    if (story.isPremium && !user.isPremium) {
      throw new Error();
    }
    res.send(story);
  } catch (err) {
    res.status(404).send();
  }
};

const getStoriesByAuthorId = async (req, res) => {};

const getStoriesByCategory = async (req, res) => {};

const createStory = async (req, res) => {};

const updateStory = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.storyId);
    const user = await User.findByPk(req.userId);

    if (!story || !user) {
      throw new Error();
    }
    if (story.author_id != user.id) {
      throw new Error();
    }
    res.send(story);
  } catch (err) {
    res.status(404).send();
  }
};

const uploadImage = async (req, res) => {};

const deleteStory = async (req, res) => {};

//Upvote/Downvote
const voteStory = async (req, res) => {};

//Update the number of view
const updateStoryView = async (req, res) => {};

module.exports = {
  // getStory,
  updateStory,
  crawlStory,
};
