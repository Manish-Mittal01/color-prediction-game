const mongoose = require("mongoose");
const { Config } = require("../config");

mongoose.set("strictQuery", false);

module.exports.connectDatabase = async () => {
  console.log("Connecting to Database ...");

  const DB_OPTIONS = {
    dbName: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    pass: process.env.DBPASSWORD,
    authSource: process.env.DBAUTHSOURCE,
  }
  mongoose.connect(Config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};
