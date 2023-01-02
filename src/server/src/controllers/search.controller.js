const {sequelize} = require('../db/database');
const {Op} = require('sequelize');
const db = require('../db/index');

const Story = db.story;
const User = db.user;

const searchStory = async (req, res) => {
  try {
    const {searchWord, limit} = req.params;
    const tokens = searchWord.trim().split(' ');
    queries = [];
    for (const token of tokens) {
      const st = token.toLowerCase() + ' %';
      const md = '% ' + token.toLowerCase() + ' %';
      const ed = '% ' + token.toLowerCase();
      queries.push(sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', st));
      queries.push(sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', md));
      queries.push(sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', ed));
    }
    const stories = await Story.findAll({
      attributes: {exclude: ['contents']},
      where: {
        title: {
          [Op.or]: queries,
        },
      },
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

const searchUser = async (req, res) => {
  try {
    const {searchWord, limit} = req.params;
    const tokens = searchWord.trim().split(' ');
    const queries = [];
    for (const token of tokens) {
      const sus = '%' + token.toLowerCase() + '%';
      queries.push(sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', sus));
    }
    const users = await User.findAll({
      where: {
        username: {
          [Op.or]: queries,
        },
      },
      order: [['createdAt', 'DESC']],
      limit,
    });
    if (!users) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
      data: users,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  searchStory,
  searchUser,
};
