const jwt = require('jsonwebtoken');
const db = require('../db/index');

const User = db.user;

const verifyToken = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) {
      return res.redirect('/auth/login');
    }
    const token = header.replace('Bearer ', '');

    jwt.verify(token, 'bytesgotoken', async (err, decoded) => {
      if (err) {
        return res.redirect('/auth/login');
      }

      const user = await User.findOne({
        where: {username: decoded.username},
      });
      req.userId = user.id;
      next();
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = verifyToken;
