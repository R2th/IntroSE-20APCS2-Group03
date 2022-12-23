const {DataTypes} = require('sequelize');
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

db.role.belongsToMany(db.user, {
  through: 'users_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'users_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.story.belongsTo(db.user, {
  targetKey: 'id',
  foreignKey: 'author_id',
});

db.draft.belongsTo(db.user, {
  targetKey: 'id',
  foreignKey: 'author_id',
});

db.reaction.belongsTo(db.user, {
  targetKey: 'id',
  foreignKey: 'user_id',
});

db.reaction.belongsTo(db.story, {
  targetKey: 'id',
  foreignKey: 'story_id',
});

db.comment.belongsTo(db.user, {
  targetKey: 'id',
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

db.comment.belongsTo(db.story, {
  targetKey: 'id',
  foreignKey: 'story_id',
  onDelete: 'cascade',
});

db.ROLES = ['user', 'admin'];

module.exports = db;
