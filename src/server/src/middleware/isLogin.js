const jwt = require('jsonwebtoken');
const db = require('../db/index');

const User = db.user;

const verifyToken = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) {
    // WHAT THE FUCK YOU DOING IN HERE ???
    // use res.redirect() instead
    // res.status(403).send({
    //   message: 'No token provided!',
    // });
    }
    const token = header.replace('Bearer ', '');

    jwt.verify(token, 'bytesgotoken', async (err, decoded) => {
      if (err) {
      // JUST LIKE IN ABOVE PROBLEM
      //   res.status(401).send({
      //     message: 'Unauthorized!',
      //   });
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
