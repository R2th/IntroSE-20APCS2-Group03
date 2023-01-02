const db = require('../db/index');

const User = db.user;

const publicAccess = (req, res) => {
  res.status(200).send('This is public content.');
};

const userPanel = (req, res) => {
  res.status(200).send({
    message: 'This is user\'s panel',
    username: req.username,
  });
};

const adminPanel = (req, res) => {
  res.status(200).send({
    message: 'This is admin\'s panel',
  });
};

const getAvatar = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (!user || !user.avatar) {
    throw new Error('Avatar not found!');
  } else {
    const filePath = `upload/${user.avatar}`;
    res.sendFile(filePath);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    if (!user) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const {email, password, firstName, lastName, avatar, bio, isActivate, isPremium} = req.body;
    const user = await User.findOne({
      where: {
        username: req.username,
      },
    });
    if (!user) {
      throw new Error();
    }
    user.set({
      email,
      password,
      firstName,
      lastName,
      avatar,
      bio,
      isActivate,
      isPremium,
    });
    await user.save();
    res.status(200).send({
      message: 'successful',
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  publicAccess,
  userPanel,
  adminPanel,
  getAvatar,
  getUserProfile,
  updateUserProfile,
};
