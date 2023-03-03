const { StatusCode } = require("../../common/Constants");
const { ResponseService } = require("../../common/responseService");
const { UserController } = require("../controllers/userController");
const referralModel = require("../Models/referralModel");
const UserModel = require("../Models/UserModel");

class ReferralService {
  static async getUserReferrals(req, res) {
    const { userId } = req.query;

    if (!userId) {
      ResponseService.failed(res, "userId is required", StatusCode.badRequest);
      return;
    }

    const isActive = await UserController.checkUserActive(userId);

    if (isActive == null) {
      ResponseService.failed(res, "User not Found", StatusCode.notFound);
      return;
    }
    if (!isActive) {
      ResponseService.failed(res, "User is blocked", StatusCode.unauthorized);
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

    async function makeResponseList(referralList) {
      const result = [];
      for (let i in referralList) {
        const _referral = referralList[i];
        const user = await UserModel.findOne({ userId: _referral.referrarId });
        result.push({
          referrarId: _referral.referrarId,
          amount: _referral.amount,
          mobile: user.mobile,
        });
      }
      return result;
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
      totalContributionAmount:
        level1Amount / 0.3 + level2Amount / 0.05 + level3Amount,
      level1: await makeResponseList(referrar.level1),
      level2: await makeResponseList(referrar.level2),
      level3: await makeResponseList(referrar.level3),
    });
    return;
  }
}

module.exports.ReferralService = ReferralService;
