const app = require("./src/app");
const http = require("http").Server(app);

const logger = require("./src/utils/logger");

const port = process.env.PORT || 2022;
const DEFAULT_PORT = 3000;
const HOST = "localhost";

http.listen(port, () => {
  const { 2: mode } = process.argv;
  if (mode)
    config["is" + mode[0].toUpperCase() + mode.slice(1).toLowerCase()] = true;
  logger.appStarted(DEFAULT_PORT, HOST, port);
});
