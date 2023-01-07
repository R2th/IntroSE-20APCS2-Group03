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
        username: req.username,
      },
    });
    if (!collections) {
      return res.status(404).send({
        message: 'Collection not found.',
      });
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
    console.log(req.body);
    const username = req.username;
    const collection = await Collection.create({
      name,
      username: username,
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

const deleteCollection = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const username = req.username;
    const collection = await Collection.findOne({
      where: {
        id: collectionId,
        username: username,
      },
    });
    if (!collection) {
      return res.status(404).send({
        message: 'Collection not found.',
      });
    };
    await collection.destroy();
    res.status(200).send({
      message: 'successful',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addStoryToCollection = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const username = req.username;
    const storyId = req.params.storyId;

    const collection = await Collection.findOne({
      where: {
        id: collectionId,
        username: username,
      },
    });
    if (!collection) {
      return res.status(404).send({
        message: 'Collection not found.',
      });
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
    const collectionId = req.params.collectionId;
    const username = req.username;
    const storyId = req.params.storyId;
    const collection = await Collection.findOne({
      where: {
        id: collectionId,
        username: username,
      },
    });
    if (!collection) {
      return res.status(404).send({
        message: 'Collection not found.',
      });
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
  deleteCollection,
  addStoryToCollection,
  removeStoryToCollection,
};
