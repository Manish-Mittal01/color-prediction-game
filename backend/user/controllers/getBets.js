const Bet = require("../Models/betModel");
const { success, error } = require("../common/Constants").Status;

module.exports.getBets = async (req, res) => {
  let results = await Bet.find();
  console.log(results);

  res.status(200).send({
    status: success,
    records: results,
  });
};
