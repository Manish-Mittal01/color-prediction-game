const { ResponseService } = require("../../common/responseService");
const {
  SessionController,
} = require("../../user/controllers/sessionController");
const bankDetailsModel = require("../../user/Models/bankDetailsModel");
const betModel = require("../../user/Models/betModel");
const PeriodModel = require("../../user/Models/PeriodModel");
const UserModel = require("../../user/Models/UserModel");

class AdminBetService {
  static async getBets(req, res) {
    var date = new Date();
    const currentIds = (await SessionController.getCurrentSession()).map(
      (e) => e.periodId
    );
    date.setDate(date.getDate() - 3);
    const allBets = await betModel
      .find({ createdAt: { $gte: date }, periodId: { $nin: currentIds } })
      .sort({ _id: -1 });

    const data = [];
    const periods = [];

    async function getPeriod(periodId) {
      var period;
      if (!periods.includes(bet.periodId)) {
        period = await PeriodModel.findOne({ periodId: periodId });
        periods.push(period);
      } else {
        period = periods.find((e) => e.periodId == periodId);
      }
      return period;
    }

    for await (var bet of allBets) {
      const user = await UserModel.findOne({ userId: bet.userId });
      const period = await getPeriod(bet.periodId);
      const resultColor = period.resultColor;
      const resultNumber = period.resultNumber;
      const bankDetails = await bankDetailsModel.findOne({ userId: bet.userId })

      data.push({
        ...bet._doc,
        mobile: user.mobile,
        resultColor,
        resultNumber,
        bankDetails
      });
    }

    return ResponseService.success(res, "Bets found", data);
  }
}

module.exports.AdminBetService = AdminBetService;
