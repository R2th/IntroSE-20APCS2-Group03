const db = require('../db/index');

const User = db.user;

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
      .then((user) => {
        user.getRoles()
            .then((roles) => {
              roles.forEach((role) => {
                if (role === 'admin') {
                  next();
                }
              });
              res.status(403).send({
                message: 'Admin role is required',
              });
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
};

module.exports = isAdmin;
