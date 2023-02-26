require("dotenv/config");

module.exports.Config = {
  port: process.env.PORT || 3000,
  JWT_SECRET_KEY: process.env.PORT || JHFGWKEFYBWKYCIFUN,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/color-prediction",
};
