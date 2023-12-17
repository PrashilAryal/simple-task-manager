const dotenv = require("dotenv");
dotenv.config();

const appConfig = {
  PORT: process.env.APP_PORT,
  DB_NAME: process.env.DB_NAME,
};

module.exports = appConfig;
