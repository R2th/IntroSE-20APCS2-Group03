const db = require('../db/index');

const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Username is already in use!',
        });
        return;
      }
      User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((_user) => {
          if (_user) {
            res.status(400).send({
              message: 'Email is already in use!',
            });
            return;
          }
          next();
        });
    });
};

module.exports = {
  checkDuplicateUsernameOrEmail,
};
