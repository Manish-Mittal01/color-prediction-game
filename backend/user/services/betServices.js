const { StatusCode } = require("../../common/Constants");
const Bet = require("../Models/betModel");
const { success, error } = require("../../common/Constants").Status;
const User = require("../Models/UserModel");
const { ResponseService } = require("../../common/responseService");

class BetServices {
  static async getBets(req, res) {
    const userId = req.query.userId;
    const results = await Bet.find({ userId: userId })
      .limit(100)
      .sort({ _id: -1 });

    if (results.length == 0) {
      ResponseService.success(res, "No Bets Found", results, {
        code: StatusCode.success,
      });
      return;
    }

    ResponseService.success(res, "Bets Found", results);
  }

  static async makeBet(req, res) {
    const { prediction, amount, userId, periodId, periodName } = req.body;
    function errorMsg(err, code) {
      ResponseService.failed(res, err, code ?? StatusCode.badRequest);
    }
    if (!prediction) return errorMsg("Prediction is required");
    if (!amount) return errorMsg("Amount is required");
    if (!userId) return errorMsg("userId is required");
    if (!periodId) return errorMsg("periodId is required");
    if (!periodName) return errorMsg("periodName is required");

    const validUser = await User.findOne({
      userId: userId,
    });
    if (!validUser)
      return errorMsg("User does not exists!", StatusCode.notFound);

    let result = await new Bet({
      prediction: prediction,
      amount: amount,
      userId: userId,
      periodId: periodId,
      periodName: periodName,
    }).save();

    return ResponseService.success(res, "order success", result);
  }
}

module.exports.BetServices = BetServices;
