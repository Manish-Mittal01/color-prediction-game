const { ResponseService } = require("../../common/responseService");
const betModel = require("../../user/Models/betModel");

class AdminBetService {
  static async getBets(req, res) {
    var date = new Date();
    date.setDate(date.getDate() - 3);
    const allBets = await betModel.find({ createdAt: { $gte: date } });
    console.log(`${JSON.stringify(allBets)}`);

    return ResponseService.success(res, "Bets found", allBets);
  }
}

module.exports.AdminBetService = AdminBetService;
