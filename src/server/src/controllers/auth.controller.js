const db = require("../db/index");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

exports.signup = async (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio,
    isActivate: true,
    isPremium: false,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() =>
            res.status(200).send({
              message: "User register successfully!",
              username: req.body.username,
            })
          );
        });
      } else {
        user.setRoles([1]).then(() =>
          res.status(200).send({
            message: "User register successfully!",
            username: req.body.username,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      var isMatched = await bcrypt.compare(req.body.password, user.password);
      if (!isMatched) {
        return res.status(401).send({
          token: null,
          message: "Wrong password!",
        });
      }

      var token = jwt.sign({ username: user.username }, "bytesgotoken", {
        expiresIn: 86400, //24h
      });

      var userRoles = [];
      user.getRoles().then((roles) => {
        roles.forEach((role) => {
          userRoles.push(role.roleName.toUpperCase());
        });
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: userRoles,
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
