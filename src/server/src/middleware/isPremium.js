const jwt = require('jsonwebtoken');
const db = require('../db/index');

const User = db.user;
const Story = db.story;

const isPremium = async (req, res, next) => {
  try {
    const header = req.header('Authorization');

    let isPremium = false;

    if (header) {
      const token = header.replace('Bearer ', '');

      jwt.verify(token, 'bytesgotoken', async (err, decoded) => {
        if (err) {
        // JUST LIKE IN ABOVE PROBLEM
        //   res.status(401).send({
        //     message: 'Unauthorized!',
        //   });
        }
        if (decoded) {
          const user = await User.findByPk(decoded.username, {
            attributes: ['isPremium'],
          });
          if (!user) {
            throw new Error();
          }
          req.username = user.username;
          isPremium = user.isPremium;
        }
      });
    }
    const story = await Story.findByPk(req.params.storyId, {
      attributes: ['isPremium'],
    });
    if (!story) {
      throw new Error();
    }
    if (story.isPremium && !isPremium) {
      return res.send({
        message: 'user does not have access to premium content',
      });
    }
    next(); ;
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = isPremium;
