const {DataTypes, DOUBLE} = require('sequelize');
const dotEnv = require('dotenv');
const chalk = require('chalk');
const {sequelize} = require('./database');

dotEnv.config();

sequelize
    .authenticate()
    .then(() => console.log(chalk.green(`[DATABASE] "${process.env.PG_DB}" is connected`)))
    .catch((err) => console.log(err));

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, DataTypes);
db.role = require('../models/role.model')(sequelize, DataTypes);
db.story = require('../models/story.model')(sequelize, DataTypes);
db.draft = require('../models/draft.model')(sequelize, DataTypes);
db.reaction = require('../models/reaction.model')(sequelize, DataTypes);
db.comment = require('../models/comment.model')(sequelize, DataTypes);
db.collection = require('../models/collection.model')(sequelize, DataTypes);

db.role.belongsToMany(db.user, {
  through: 'users_roles',
  foreignKey: 'roleId',
  otherKey: 'username',
});

db.user.belongsToMany(db.role, {
  through: 'users_roles',
  foreignKey: 'username',
  otherKey: 'roleId',
});

db.story.belongsTo(db.user, {
  targetKey: 'username',
  foreignKey: 'author_username',
});

db.draft.belongsTo(db.user, {
  targetKey: 'username',
  foreignKey: 'author_username',
});

db.reaction.belongsTo(db.user, {
  targetKey: 'username',
  foreignKey: 'username',
});

db.reaction.belongsTo(db.story, {
  targetKey: 'id',
  foreignKey: 'story_id',
});

db.comment.belongsTo(db.user, {
  targetKey: 'username',
  foreignKey: 'username',
  onDelete: 'cascade',
});

db.user.belongsToMany(db.user, {
  as: 'Follower',
  through: 'users_users',
  foreignKey: 'following_username',
  otherKey: 'follower_username',
});

db.user.belongsToMany(db.user, {
  as: 'Following',
  through: 'users_users',
  foreignKey: 'follower_username',
  otherKey: 'following_username',
});

db.comment.belongsTo(db.story, {
  targetKey: 'id',
  foreignKey: 'story_id',
  onDelete: 'cascade',
});

db.comment.belongsTo(db.comment, {
  foreignKey: 'parent_id',
  onDelete: 'cascade',
});

db.collection.belongsTo(db.user, {
  targetKey: 'username',
  foreignKey: 'username',
});

db.story.belongsToMany(db.collection, {
  through: 'collections_stories',
  foreignKey: 'story_id',
  otherKey: 'collection_id',
});

db.collection.belongsToMany(db.story, {
  through: 'collections_stories',
  foreignKey: 'collection_id',
  otherKey: 'story_id',
});

db.ROLES = ['user', 'admin'];

module.exports = db;
