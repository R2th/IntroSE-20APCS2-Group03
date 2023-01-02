/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n---------------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error('Can\'t start server due to: ', chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (portClient, host, portServer) => {
    console.log('\n');
    console.log(`Server started successfully! ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${portClient}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${portClient}`)}${divider}
${chalk.green(`BytesGo server is listening on port ${portServer}`)}${divider}
${chalk.blue(`Enter ${chalk.red('"rs"')} to restart server`)}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
