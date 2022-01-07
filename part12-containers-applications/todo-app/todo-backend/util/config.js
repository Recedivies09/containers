require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL || undefined;
const REDIS_HOST = process.env.REDIS_HOST || undefined;

module.exports = {
  MONGO_URL, //: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_HOST, //: '//localhost:6378'
};
