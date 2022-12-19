const db = require("../db/index");
const fs = require("fs");
const Story = db.story;
const User = db.user;
const Reaction = db.reaction;

const crawlStory = async (req, res) => {
  try {
    await Story.create(JSON.parse(req.body.data));
    res.status(200).send({
      filename: "",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

const getAllStories = async (req, res) => {
  try {
    const limit = req.params.limit;
    const stories = await Story.findAll({
      limit: limit
    });
    if (!stories) {
      throw new Error();
    }
    res.status(200).send({
      message: "successful",
      data: stories
    });
  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
}

const getNewestStories = async (req, res) => {
  try {
    const limit = req.params.limit;
    const stories = await Story.findAll({ 
      order: [
        ['createdAt', 'DESC']
      ],
      limit: limit
    });
    if (!stories) {
      throw new Error();
    }
    res.status(200).send({
      message: "successful",
      data: stories
    });
  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
}

const getStoryByStoryId = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.storyId);
    if (!story) {
      throw new Error();
    }
    res.status(200).send({
      message: "successful",
      data: story
    });
  } catch (err) {
    res.status(404).send();
  }
};

const getStoriesOfUser = async (req, res) => {
  try{
    const userId = req.userId;
    const limit = req.body.limit;
    const stories = await Story.findAll({
      where:{
        author_id: userId
      },
      limit: limit
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

const getStoriesByCategory = async (req, res) => {};

const createStory = async (req, res) => {
  try {
    const contents = readContentsFromFile(req.body.title);
    const contentsShort = req.body.contentsShort;
    const mediaList = extractMedia(contents);
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
      isPremium: isPremium
    })

    res.status(200).send({
      message: "successful",
      data: story
    })

  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
};

const uploadImage = async () => {
  return null;
};

const readContentsFromFile = async (filename) => { 
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    return data;
  });
  return filename;
};

const extractMedia = async (contents) => {
  let regex = /(?:\!\[[-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*\]\((?<url>[-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*)\))/gi;
  let result = [];
  for (const match of contents.matchAll(regex)){
    result.push(match[1]);
  }
  return result;
};

const updateStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;

    const story = await Story.findByPk(req.params.storyId);

    if (!story) {
      throw new Error();
    }

    let contents = await readContentsFromFile(req.body.file);
    if (!contents) contents = story.contents;

    let contentsShort = req.body.contentsShort;
    if (!contentsShort) contentsShort = story.contents_short;

    let mediaList = await extractMedia(contents);
    if (!mediaList) mediaList = story.media_list;

    let authorId = req.userId;
    if (!authorId) authorId = story.author_id;

    let title = req.body.title;
    if (!title) title = story.title;

    let tag = req.body.tag;
    if (!tag) tag = story.tag;

    let isPremium = req.body.isPremium;
    if (!isPremium) isPremium = story.isPremium;

    story.set({
      contents: contents,
      contents_short: contentsShort,
      media_list: mediaList,
      title: title,
      tag: tag,
      isPremium: isPremium
    });

    await story.save();

    res.status(200).send({
      message: "successful",
      data: story
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

const deleteStory = async (req, res) => {
  try{
    const storyId = req.params.storyId;
    const story = await Story.findOne({
      where:{
        id: storyId,
        author_id: req.userId
      }
    });

    if (!story) {
      res.status(404).send();
    }

    await story.destroy();
    
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
  const story = await Story.findOne({id: req.param.storyId})

  const prevReaction = await Reaction.findOne({
    where:{
      story_id: req.param.storyId,
      user_id: userId
    }
  })

  // If user has not ever react on story
  if(!prevReaction){
    const newReaction = await Reaction.create({
      user_id: userId,
      story_id: req.param.storyId,
      react_type: req.body.reactType
    })
  }else{
    // update type of vote if exist
    await Story.update(
      {react_type: req.param.reactType},
      {where: {story_id: req.body.storyId}}
    );
  }

  res.status(200).send(
    {
      message: "successful",
      points: await calculateVotes(req.param.storyId)
    }
  )
};

const calculateVotes = async (storyId) => await Reaction.findAll({
  where: {story_id: storyId},
  attributes: [[sequelize.fn('sum', sequelize.col('react_type')), 'points']],
  raw: true
})

//Update the number of view
const updateStoryView = async (req, res) => {
  const storyId = req.body.storyId;
  const prev = await Story.findByPk(storyId);
  try{
    const story = await Story.update(
      {views: (prev.views + 1)},
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
};
