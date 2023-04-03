require("dotenv/config");

module.exports.Config = {
  port: process.env.PORT || 8000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || JHFGWKEFYBWKYCIFUN,
  DB_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/color-prediction",
};
