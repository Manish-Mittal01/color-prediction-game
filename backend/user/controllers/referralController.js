const { ReferralService } = require("../services/referralService");

class ReferralController {
  static getUserReferrals = async (req, res) =>
    ReferralService.getUserReferrals(req, res);
}

module.exports.ReferralController = ReferralController;
