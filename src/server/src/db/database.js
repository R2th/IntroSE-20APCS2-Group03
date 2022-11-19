const dotEnv = require("dotenv");
const Sequelize = require("sequelize");
const chalk = require("chalk");

dotEnv.config();

// const configuration = {
//   user: process.env.PG_USERNAME,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
//   host: process.env.PG_HOST,
// };

// pgtools.createdb(configuration, process.env.PG_DB, function (err, res) {
//   if (err) {
//     // console.error(err);
//     // process.exit(-1);
//   }
//   // console.log(res);
// });

module.exports.connection = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: (msg) => console.log(chalk.yellow(msg), "\n"),
  }
);
