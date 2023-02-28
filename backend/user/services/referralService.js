const { StatusCode } = require("../../common/Constants");
const { ResponseService } = require("../../common/responseService");
const referralModel = require("../Models/referralModel");
const UserModel = require("../Models/UserModel");

class ReferralService {
  static async getUserReferrals(req, res) {
    const { userId } = req.query;

    if (!userId) {
      ResponseService.failed(res, "userId is required", StatusCode.badRequest);
      return;
    }

    const user = await UserModel.findOne({ userId: userId });

    if (!user) {
      ResponseService.failed(res, "User not found", StatusCode.notFound);
      return;
    }

    const referrar = await referralModel.findOne({ userId: userId });

    if (!referrar) {
      ResponseService.success(res, "No referrals found", {
        level1: [],
        level2: [],
        level3: [],
      });
      return;
    }

    ResponseService.success(res, "Referrals found", {
      level1: referrar.level1,
      level2: referrar.level2,
      level3: referrar.level3,
    });
    return;
  }
}

module.exports.ReferralService = ReferralService;
