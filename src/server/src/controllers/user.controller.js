const {reaction} = require('../db/index');
const db = require('../db/index');

const User = db.user;
const Reaction = db.reaction;
const Story = db.story;

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

// tu tu sao cai nay o day
const getAvatar = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (!user || !user.avatar) {
    throw new Error('Avatar not found!');
  } else {
    const filePath = `uploads/${user.avatar}`;
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

const followUser = async (req, res) => {
  try {
    const {followingUsername} = req.body;
    const follower = await User.findOne({
      as: 'Follower',
      where: {username: req.username},
    });
    if (!follower) {
      throw new Error('wtf');
    }
    const following = await User.findOne({
      as: 'Following',
      where: {username: followingUsername},
    });
    if (!following) {
      throw new Error('wtf');
    }
    await follower.addFollowing(following);
    res.status(200).send({
      message: 'successful',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const {followingUsername} = req.body;
    const follower = await User.findOne({
      as: 'Follower',
      where: {username: req.username},
    });
    if (!follower) {
      throw new Error('wtf');
    }
    const following = await User.findOne({
      as: 'Following',
      where: {username: followingUsername},
    });
    if (!following) {
      throw new Error('wtf');
    }
    await follower.removeFollowing(following);
    res.status(200).send({
      message: 'successful',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.username, {
      as: 'Following',
      include: {
        model: User,
        as: 'Follower',
        through: {
          attributes: [],
        },
      },
    });
    if (!user) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
      data: user.Follower,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getFollowings = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.username, {
      as: 'Follower',
      include: {
        model: User,
        as: 'Following',
        through: {
          attributes: [],
        },
      },
    });
    if (!user) {
      throw new Error();
    }
    res.status(200).send({
      message: 'successful',
      data: user.Following,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getNumberOfFollowers = async (req, res) => {
  try {
    const result = await User.count({
      as: 'Following',
      where: {username: req.params.username},
      include: {
        model: User,
        as: 'Follower',
        required: true,
      },
    });
    res.status(200).send({
      message: 'successful',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getNumberOfFollowings = async (req, res) => {
  try {
    const result = await User.count({
      as: 'Follower',
      where: {username: req.params.username},
      include: {
        model: User,
        as: 'Following',
        required: true,
      },
    });
    res.status(200).send({
      message: 'successful',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const hasFollowed = async (req, res) => {
  try {
    const {followingUsername} = req.params;
    const followed = await User.findOne({
      as: 'Follower',
      where: {username: req.username},
      include: {
        model: User,
        as: 'Following',
        required: true,
        where: {
          username: followingUsername,
        },
      },
    });
    if (!followed) {
      res.status(200).send({
        message: 'successful',
        followed: 'no',
        data: followed,
      });
    } else {
      res.status(200).send({
        message: 'successful',
        followed: 'yes',
        data: followed,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getNumberOfUpvotes = async (req, res) => {
  try {
    const {username} = req.params;
    const upvotes = await Reaction.count({
      where: {
        react_type: 1,
      },
      include: {
        model: Story,
        attributes: [],
        required: true,
        where: {
          author_username: username,
        },
      },
    });
    res.status(200).send({
      message: 'successful',
      data: upvotes,
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
  getFollowers,
  getFollowings,
  followUser,
  unfollowUser,
  hasFollowed,
  getNumberOfFollowers,
  getNumberOfFollowings,
  getNumberOfUpvotes,
};
