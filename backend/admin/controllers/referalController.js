const { ReferralService } = require("../services/referalServices");

class ReferralController {
  static depositReferralAmount = async (userId, amount) => {
    ReferralService.depositReferralAmount(userId, amount);
  };
}

module.exports.ReferralController = ReferralController;
