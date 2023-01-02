const logger = require('./src/utils/logger');
const app = require('./src/app');

const port = process.env.PORT || 2022;
const DEFAULT_PORT = 3000;
const HOST = 'localhost';

const db = require('./src/db/index');

const Role = db.role;

const initiate = async () => {
  await Role.create({
    id: 1,
    roleName: 'user',
  });
  await Role.create({
    id: 2,
    roleName: 'admin',
  });
};

if (process.env.RUN_MODE === 'dev') {
  db.sequelize
      .sync({force: true})
      .then(() => {
        console.log('--------- Ready to heacking ----------------');
        initiate();
      })
      .catch((err) => {
        console.log(err);
      });
} else if (process.env.RUN_MODE === 'prod') {
  db.sequelize
      .sync()
      .then(async () => {
        const role = await Role.findOne();
        if (!role) initiate();
        console.log('--------- Ready to heacking ----------------');
      })
      .catch((err) => {
        console.log(err);
      });
}

app.listen(port, () => {
  const {2: mode} = process.argv;
  if (mode) {
    // eslint-disable-next-line
    config[`is${mode[0].toUpperCase()}${mode.slice(1).toLowerCase()}`] = true;
  }
  logger.appStarted(DEFAULT_PORT, HOST, port);
});
