const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const dotEnv = require("dotenv");
const chalk = require("chalk");

dotEnv.config();

connection
  .authenticate()
  .then(() =>
    console.log(chalk.green(`[DATABASE] "${process.env.PG_DB}" is connected`))
  )
  .catch((err) => console.log(err));

const User = connection.define(
  "users",
  {
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    socket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // freezeTableName: true,
  }
);

module.exports = {
  User,
};
