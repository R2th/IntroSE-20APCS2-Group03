const fs = require('fs');
const {sequelize} = require('../db/database');
const db = require('../db/index');

const Collection = db.collection;
const Story = db.story;

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      include: [{
        model: Story,
        attributes: {exclude: ['contents']},
      }],
      where: {
        user_id: req.userId,
      },
    });
    if (!collections) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
      data: collections,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const createCollection = async (req, res) => {
  try {
    const name = req.body.name;
    const userId = req.userId;
    const collection = await Collection.create({
      name,
      user_id: userId,
    });
    if (!collection) {
      throw new Error();
    };
    res.status(200).send({
      message: 'successful',
      data: collection,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addStoryToCollection = async (req, res) => {
  try {
    const collectionId = req.body.collectionId;
    const userId = req.userId;
    const storyId = req.body.storyId;
    const collection = await Collection.findOne({
      where: {
        id: collectionId,
        user_id: userId,
      },
    });
    if (!collection) {
      throw new Error();
    };
    collection.addStory(storyId);
    res.status(200).send({
      message: 'successful',
      collection: collection,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const removeStoryToCollection = async (req, res) => {
  try {
    const collectionId = req.body.collectionId;
    const userId = req.userId;
    const storyId = req.body.storyId;
    const collection = await Collection.findOne({
      where: {
        id: collectionId,
        user_id: userId,
      },
    });
    if (!collection) {
      throw new Error();
    };
    collection.removeStory(storyId);
    res.status(200).send({
      message: 'successful',
      collection: collection,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  getCollections,
  createCollection,
  addStoryToCollection,
  removeStoryToCollection,
};
