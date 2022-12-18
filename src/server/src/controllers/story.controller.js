const db = require("../db/index");
const fs = require("fs");
const Story = db.story;
const User = db.user;
const Reaction = db.reaction;

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

const getStoriesByAuthorId = async (req, res) => {
  try{
    const userId = req.userId;
  
    const stories = await Story.findAll({
      where:{
        author_id: userId
      }
    });

    res.status(200).send({
      message: "successful",
      data: stories
    })
  }
  catch(err){
    res.status(500).send({
      message: err.message
    })
  }
};

const getStoriesByCategory = async (req, res) => {

};

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

const deleteStory = async (req, res) => {
  try{
    const storyId = req.params.storyId;
    await Story.destroy({
      where:{
        id: storyId
      }
    })
    res.status(200).send({
      message: "successful"
    })
  }
  catch(err){
    res.status(500).send({
      message: err.message
    })
  }
};

//Upvote/Downvote
const voteStory = async (req, res) => {
  const userId = req.userId;
  const story = Story.findOne({id: req.body.storyId})

  const reaction = await Reaction.findOne({
    where:{
      story_id: req.body.storyId,
      user_id: userId
    }
  })

  if(!reaction){
    const nReaction = await Reaction.create({
      user_id: userId,
      story_id: req.body.storyId,
      react_type: req.body.react_type 
    })
  }
};

//Update the number of view
const updateStoryView = async (req, res) => {
  const storyId = req.body.storyId;
  const prev = await Story.findByPk(storyId);
  try{
    const story = await Story.update(
      {views:(prev.views + 1)},
      {where: {id: storyId}}
    )
    res.status(200).send({
      message: "successful",
      data: story
    })
  }
  catch(err){
    res.status(500).send({
      message: err.message
    })
  }
};

module.exports = {
  // getStory,
  updateStory,
  crawlStory,
};
