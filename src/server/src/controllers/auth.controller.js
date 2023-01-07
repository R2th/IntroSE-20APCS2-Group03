const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize');
const db = require('../db/index');

const User = db.user;
const Role = db.role;

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
            user.setRoles(roles).then(() => res.status(200).send({
              message: 'User register successfully!',
              username: req.body.username,
            }));
          });
        } else {
          user.setRoles([1]).then(() => res.status(200).send({
            message: 'User register successfully!',
            username: req.body.username,
          }));
        }
      })
      .catch((err) => {
        res.status(500).send({message: err.message});
      });
};

exports.login = async (req, res) => {
  if (req.body.username == undefined) {
    return res.status(401).send({
      message: 'Login fail',
      token: null,
    });
  }
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
      .then(async (user) => {
        if (!user) {
          return res.status(401).send({message: 'Username or password is incorrect.'});
        }
        if (req.body.password == undefined) {
          return res.status(401).send({
            token: null,
            message: 'Missing password.',
          });
        }
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if (!isMatched) {
          return res.status(401).send({
            token: null,
            message: 'Username or password is incorrect',
          });
        }

        const token = jwt.sign({username: req.body.username}, 'bytesgotoken', {
          expiresIn: 604800, // 7 days
        });

        const userRoles = [];
        user.getRoles().then((roles) => {
          roles.forEach((role) => {
            userRoles.push(role.roleName.toUpperCase());
          });
        });

        res.status(200).send({
          message: 'successful',
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            roles: userRoles,
            token,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({message: err.message});
      });
};
