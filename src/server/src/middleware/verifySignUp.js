const db = require('../db/index');

const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (req.body.username == undefined) {
    return res.status(400).send({
      message: 'Username is missed',
    });
  }
  if (req.body.email == undefined) {
    return res.status(400).send({
      message: 'Email is missed',
    });
  }
  if (req.body.password == undefined) {
    return res.status(400).send({
      message: 'Password is missed',
    });
  }
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
      .then((user) => {
        if (user) {
          return res.status(400).send({
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
                return res.status(400).send({
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
