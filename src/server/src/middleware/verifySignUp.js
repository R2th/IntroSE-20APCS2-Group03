const db = require("../db/index");

const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (req.body.username == undefined) {
    return res.status(400).send({
      code: 400,
      message: "Missing username.",
    });
  }
  if (req.body.email == undefined) {
    return res.status(400).send({
      code: 400,
      message: "Missing email.",
    });
  }
  if (req.body.password == undefined) {
    return res.status(400).send({
      code: 400,
      message: "Missing password.",
    });
  }
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        code: 400,
        message: "Username is already in use!",
      });
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((_user) => {
      if (_user) {
        return res.status(400).send({
          code: 400,
          message: "Email is already in use!",
        });
      }
      next();
    });
  });
};

module.exports = {
  checkDuplicateUsernameOrEmail,
};
