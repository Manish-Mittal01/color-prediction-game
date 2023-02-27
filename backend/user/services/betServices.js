const { StatusCode } = require("../../common/Constants");
const Bet = require("../Models/betModel");
const { success, error } = require("../../common/Constants").Status;
const User = require("../Models/UserModel");
const { ResponseService } = require("../../common/responseService");
const PeriodModel = require("../Models/PeriodModel");
const { SessionController } = require("../controllers/sessionController");

class BetServices {
  static async getBets(req, res) {
    const userId = req.query.userId;
    const results = await Bet.find({ userId: userId })
      .limit(100)
      .sort({ _id: -1 });

    if (results.length == 0) {
      ResponseService.success(res, "No Bets Found", results);
      return;
    }

    const periods = await SessionController.getCurrentSession();
    const periodIds = periods.map((e) => e.periodId);

    const allBets = results;

    results.forEach((bet) => {
      if (bet.periodId in periodIds) {
        const i = allBets.indexOf(bet);
        allBets.splice(i, 1);
      }
    });

    if (allBets.length == 0) {
      ResponseService.success(res, "No Bets Found", allBets);
      return;
    }

    function makeResponseObject({ betModel, periodModel }) {
      return {
        ...betModel,
        price: periodModel.price,
        resultColor: periodModel.resultColor,
        resultNumber: periodModel.resultNumber,
      };
    }

    const periodMap = {};
    const bets = [];

    allBets.forEach(async (bet) => {
      let period;
      if (bet.periodId in periodMap) {
        period = periodMap[bet.periodId];
      } else {
        period = await PeriodModel.findOne({ periodId: bet.periodId });
        periodMap[bet.periodId] = period;
      }
      bets.push(makeResponseObject({ betModel: bet, periodModel: period }));
    });

    ResponseService.success(res, `${bets.length} Bet(s) Found`, bets);
  }

  static async makeBet(req, res) {
    const { prediction, amount, userId, periodId, periodName } = req.body;
    function errorMsg(err, code) {
      ResponseService.failed(res, err, code ?? StatusCode.badRequest);
    }
    if (!prediction) return errorMsg("Prediction is required");
    if (!amount) return errorMsg("Bet Amount is required");
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
      totalAmount: amount,
      betAmount: amount * 0.95, // deducting 5% from total amount
      userId: userId,
      periodId: periodId,
      periodName: periodName,
    }).save();

    return ResponseService.success(res, "Bet placed successfully", result);
  }
}

module.exports.BetServices = BetServices;
