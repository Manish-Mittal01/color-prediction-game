const { ResponseService } = require("../../common/responseService");
const betModel = require("../../user/Models/betModel");
const UserModel = require("../../user/Models/UserModel");

class AdminBetService {
  static async getBets(req, res) {
    var date = new Date();
    date.setDate(date.getDate() - 3);
    const allBets = await betModel
      .find({ createdAt: { $gte: date } })
      .sort({ _id: -1 });

    const data = [];

    for await (var bet of allBets) {
      const user = await UserModel.findOne({ userId: bet.userId });
      //   const mobile = user.mobile;
      data.push({ ...bet._doc, mobile: user.mobile });
    }

    return ResponseService.success(res, "Bets found", data);
  }
}

module.exports.AdminBetService = AdminBetService;
