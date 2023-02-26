const Bet = require("../Models/betModel");
const { success, error } = require("../../common/Constants").Status;
const User = require("../Models/UserModel");
const { BetServices } = require("../services/betServices");

class BetController {
  static getBets = async (req, res) => BetServices.getBets(req, res);

  static makeBet = async (req, res) => BetServices.makeBet(req, res);
}

module.exports.BetController = BetController;
