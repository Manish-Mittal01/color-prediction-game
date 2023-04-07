const mongoose = require("mongoose");
const { Config } = require("../config");

mongoose.set("strictQuery", false);

module.exports.connectDatabase = async () => {
  console.log("Connecting to Database ...");

  mongoose.connect(Config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};
