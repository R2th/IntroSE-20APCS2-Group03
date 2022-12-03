const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");
const dotEnv = require("dotenv");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");

dotEnv.config();

sequelize
  .authenticate()
  .then(() =>
    console.log(chalk.green(`[DATABASE] "${process.env.PG_DB}" is connected`))
  )
  .catch((err) => console.log(err));

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, DataTypes);
db.role = require('../models/role.model')(sequelize, DataTypes);

db.role.belongsToMany(db.user, {
  through: "users_roles",
  foreignKey: "roleId",
  otherKey: "userId"
})

db.user.belongsToMany(db.role, {
  through: "users_roles",
  foreignKey: "userId",
  otherKey: "roleId"
})

db.ROLES = ['user', 'admin']


module.exports = db;