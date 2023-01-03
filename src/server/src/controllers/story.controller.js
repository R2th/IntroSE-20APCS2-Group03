const fs = require('fs');
const {sequelize} = require('../db/database');
const db = require('../db/index');

const Story = db.story;
const Reaction = db.reaction;

const crawlStory = async (req, res) => {
  try {
    await Story.create(JSON.parse(req.body.data));
    res.status(200).send({
      filename: '',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getPartContentsOfStory = async (req, res) => {
  try {
    const start = parseInt(req.params.start);
    const len = parseInt(req.params.len);
    console.log(start, len);
    if (!len || start < 0) {
      throw new Error();
    }
    const contents = await Story.findByPk(req.params.storyId, {
      attributes: [
        'contents',
        sequelize.literal(`SUBSTRING(contents, ${start}, ${len}) as contents`),
      ],
    });
    if (!contents) {
      return res.status(404).send({
        message: 'Invalid story contents',
      });
    };
    return res.status(200).send({
      message: 'successful',
      data: contents,
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};

const getContentsOfStory = async (req, res) => {
  try {
    const contents = await Story.findByPk(req.params.storyId, {
      attributes: ['contents'],
    });
    if (!contents) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
      data: contents,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOtherDataOfStory = async (req, res) => {
  try {
    const data = await Story.findByPk(req.params.storyId, {
      attributes: {exclude: ['contents']},
    });
    if (!data) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllStories = async (req, res) => {
  try {
    const {limit} = req.params;
    const stories = await Story.findAll({
      attributes: {exclude: ['contents']},
      limit,
    });
    if (!stories) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
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
    const {limit} = req.params;
    const stories = await Story.findAll({
      attributes: {exclude: ['contents']},
      order: [['createdAt', 'DESC']],
      limit,
    });
    if (!stories) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
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
    const storyIsPremium = Story.findByPk(req.params.storyId, {
      attributes: ['isPremium'],
    });
    if (storyIsPremium === null) {
      throw new Error();
    }
    let story = null;
    if (storyIsPremium && !req.isPremium) {
      story = await Story.findByPk(req.params.storyId, {
        attributes: {exclude: ['contents']},
      });
    } else {
      story = await Story.findByPk(req.params.storyId);
    }
    if (!story) {
      return res.status(404).send({
        message: 'Story not found.',
      });
    }
    res.status(200).send({
      message: 'successful',
      data: story,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStoriesOfAuthor = async (req, res) => {
  try {
    const {username} = req.params;
    const {limit} = req.body;
    const stories = await Story.findAll({
      attributes: {exclude: ['contents']},
      where: {
        author_username: username,
      },
      limit,
    });
    res.status(200).send({
      message: 'successful',
      data: stories,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// const getStoriesByCategory = async (req, res) => {};
const extractMedia = async (contents) => {
  // eslint-disable-next-line
  const regex = /\!\[[-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*\]\(([-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*)\)/gi;

  return Array.from(contents.matchAll(regex), (x) => x[1]);
};

const createStory = async (req, res) => {
  try {
    const contents = fs.readFileSync(req.file.path, {
      encoding: 'utf8',
      flag: 'r',
    });

    const {id, contentsShort, thumbnail, title, tag, isPremium} = JSON.parse(req.body.data);
    const mediaList = await extractMedia(contents);
    const authorId = req.username;

    const story = await Story.create({
      contents: contents,
      contents_short: contentsShort,
      thumbnail: thumbnail,
      media_list: mediaList,
      author_username: authorId,
      title,
      tag,
      view: 0,
      isPremium,
      id,
    });

    res.status(200).send({
      message: 'successful',
      data: story,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// const uploadImage = async () => null;

const updateStory = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.storyId);

    if (!story) {
      return res.status(404).send({
        message: 'Story not found.',
      });
    }

    const contents = await fs.readFileSync(req.file.path, {
      encoding: 'utf8',
      flag: 'r',
    });

    const {contentsShort, thumbnail, title, tag, isPremium} = req.body;

    const mediaList = await extractMedia(contents);

    story.set({
      contents,
      contents_short: contentsShort,
      thumbnail: thumbnail,
      media_list: mediaList,
      title,
      tag,
      isPremium,
    });

    await story.save();

    res.status(200).send({
      message: 'successful',
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
    const {storyId} = req.params;
    const story = await Story.findOne({
      where: {
        id: storyId,
        author_username: req.username,
      },
    });

    if (!story) {
      return res.status(404).send({
        message: 'Story not found.',
      });
    }

    await story.destroy();

    res.status(200).send({
      message: 'successful',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const calculateVotes = async (storyId) => {
  const reaction = await Reaction.findAll({
    where: {story_id: storyId},
    attributes: [[sequelize.fn('sum', sequelize.col('react_type')), 'points']],
    raw: true,
  });

  return reaction[0].points ? reaction[0] : {points: 0};
};

const getVoteStoryById = async (req, res) => {
  const {storyId} = req.params;
  const {userId} = req;

  try {
    const numVotes = await calculateVotes(storyId);
    if (!numVotes) {
      return res.status(404).send({
        message: 'Some error occurred',
      });
    }

    const reaction = await Reaction.findOne({
      where: {
        user_id: userId,
        story_id: storyId,
      },
    });
    const reactType = 0;
    if (!reaction) {
      // If reaction not found, it means user/guest has never voted the story yet
      reactType = 0;
    } else {
      // Else, return the type of user reactions, 1 is upvote, -1 is downvote
      reactType = reaction.react_type;
    }

    res.status(200).send({
      message: 'success',
      num_votes: numVotes,
      user_react_type: reactType,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Upvote/Downvote
const voteStory = async (req, res) => {
  const {username} = req;
  // const story = await Story.findOne({ id: req.param.storyId });

  const prevReaction = await Reaction.findOne({
    where: {
      story_id: req.param.storyId,
      username: username,
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
        {react_type: req.param.reactType},
        {where: {story_id: req.body.storyId}},
    );
  }

  res.status(200).send({
    message: 'successful',
    points: await calculateVotes(req.param.storyId),
  });
};

// Update the number of view
const updateStoryView = async (req, res) => {
  const {storyId} = req.body;
  const prev = await Story.findByPk(storyId);
  try {
    const story = await Story.update(
        {views: prev.views + 1},
        {where: {id: storyId}},
    );

    if (story) {
      res.status(200).send({
        message: 'successful',
        view: prev.views + 1,
      });
    }
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
  getStoriesOfAuthor,
  createStory,
  updateStory,
  deleteStory,
  crawlStory,
  voteStory,
  updateStoryView,
  getContentsOfStory,
  getPartContentsOfStory,
  getOtherDataOfStory,
  getVoteStoryById,
};
