const { ReferralService } = require("../services/referalServices");

class ReferralController {
  static depositReferralAmount = async (userId, amount) => {
    ReferralService.depositReferralAmount(userId, amount);
  };

  static getReferralData = async (req, res) => {
    ReferralService.getReferralData(req, res);
  };
}

module.exports.ReferralController = ReferralController;
