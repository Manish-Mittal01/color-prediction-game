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

    const level1Amount = referrar.level1
      .map((e) => e.amount)
      .reduce((a, b) => a + b, 0);
    const level2Amount = referrar.level2
      .map((e) => e.amount)
      .reduce((a, b) => a + b, 0);
    const level3Amount = referrar.level3
      .map((e) => e.amount)
      .reduce((a, b) => a + b, 0);

    ResponseService.success(res, "Referrals found", {
      totalReferralAmount: level1Amount + level2Amount + level3Amount,
      level1: {
        totalAmount: level1Amount,
        referrals: referrar.level1,
      },
      level2: {
        totalAmount: level2Amount,
        referrals: referrar.level2,
      },
      level3: {
        totalAmount: level3Amount,
        referrals: referrar.level3,
      },
    });
    return;
  }
}

module.exports.ReferralService = ReferralService;
