const db = require("../db/index");
const fs = require("fs");
const Story = db.story;
const Reaction = db.reaction;

const crawlStory = async (req, res) => {
  try {
    await Story.create(JSON.parse(req.body.data));
    res.status(200).send({
      filename: "",
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getAllStories = async (req, res) => {
  try {
    const limit = req.params.limit;
    const stories = await Story.findAll({
      limit: limit,
    });
    if (!stories) {
      throw new Error();
    }
    res.status(200).send({
      message: "successful",
      data: stories,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getNewestStories = async (req, res) => {
  try {
    const limit = req.params.limit;
    const stories = await Story.findAll({
      order: [["createdAt", "DESC"]],
      limit: limit,
    });
    if (!stories) {
      throw new Error();
    }
    res.status(200).send({
      message: "successful",
      data: stories,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStoryByStoryId = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.storyId);
    if (!story) {
      throw new Error();
    }
    res.status(200).send({
      message: "successful",
      data: story,
    });
  } catch (err) {
    res.status(404).send();
  }
};

const getStoriesOfUser = async (req, res) => {
  try {
    const userId = req.userId;
    const limit = req.body.limit;
    const stories = await Story.findAll({
      where: {
        author_id: userId,
      },
      limit: limit,
    });
    res.status(200).send({
      message: "successful",
      data: stories,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStoriesByCategory = async (req, res) => {};

const createStory = async (req, res) => {
  try {
    const contents = await fs.readFileSync(req.file.path, {
      encoding: "utf8",
      flag: "r",
    });
    const contentsShort = req.body.contentsShort;
    const mediaList = await extractMedia(contents);
    const authorId = req.userId;
    const title = req.body.title;
    const tag = req.body.tag;
    const isPremium = req.body.isPremium;

    const story = await Story.create({
      contents: contents,
      contents_short: contentsShort,
      media_list: mediaList,
      author_id: authorId,
      title: title,
      tag: tag,
      view: 0,
      isPremium: isPremium,
    });

    res.status(200).send({
      message: "successful",
      data: story,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const uploadImage = async () => {
  return null;
};

const extractMedia = async (contents) => {
  let regex =
    /\!\[[-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*\]\(([-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*)\)/gi;
  let result = [];
  for (const match of contents.matchAll(regex)) {
    result.push(match[1]);
  }
  return result;
};

const updateStory = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.storyId);

    if (!story) {
      throw new Error();
    }

    const contents = await fs.readFileSync(req.file.path, {
      encoding: "utf8",
      flag: "r",
    });
    const contentsShort = req.body.contentsShort;
    const mediaList = await extractMedia(contents);
    const title = req.body.title;
    const tag = req.body.tag;
    const isPremium = req.body.isPremium;

    story.set({
      contents: contents,
      contents_short: contentsShort,
      media_list: mediaList,
      title: title,
      tag: tag,
      isPremium: isPremium,
    });

    await story.save();

    res.status(200).send({
      message: "successful",
      data: story,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const story = await Story.findOne({
      where: {
        id: storyId,
        author_id: req.userId,
      },
    });

    if (!story) {
      res.status(404).send();
    }

    await story.destroy();

    res.status(200).send({
      message: "successful",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

//Upvote/Downvote
const voteStory = async (req, res) => {
  const userId = req.userId;
  const story = await Story.findOne({ id: req.param.storyId });

  const prevReaction = await Reaction.findOne({
    where: {
      story_id: req.param.storyId,
      user_id: userId,
    },
  });

  // If user has not ever react on story
  if (!prevReaction) {
    const newReaction = await Reaction.create({
      user_id: userId,
      story_id: req.param.storyId,
      react_type: req.body.reactType,
    });
  } else {
    // update type of vote if exist
    await Story.update(
      { react_type: req.param.reactType },
      { where: { story_id: req.body.storyId } }
    );
  }

  res.status(200).send({
    message: "successful",
    points: await calculateVotes(req.param.storyId),
  });
};

const calculateVotes = async (storyId) =>
  await Reaction.findAll({
    where: { story_id: storyId },
    attributes: [[sequelize.fn("sum", sequelize.col("react_type")), "points"]],
    raw: true,
  });

//Update the number of view
const updateStoryView = async (req, res) => {
  const storyId = req.body.storyId;
  const prev = await Story.findByPk(storyId);
  try {
    const story = await Story.update(
      { views: prev.views + 1 },
      { where: { id: storyId } }
    );
    res.status(200).send({
      message: "successful",
      data: story,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllStories,
  getNewestStories,
  getStoryByStoryId,
  getStoriesOfUser,
  createStory,
  updateStory,
  deleteStory,
  crawlStory,
  voteStory,
  updateStoryView,
  voteStory,
  crawlStory,
  getStoryByStoryId,
  createStory,
  updateStoryView,
  voteStory,
};
