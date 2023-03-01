const referralModel = require("../../user/Models/referralModel");
const UserModel = require("../../user/Models/UserModel");
const walletModal = require("../../user/Models/walletModal");

class ReferralService {
  static async depositReferralAmount(userId, amount) {
    const referralLevel = [];
    const users = await UserModel.find();
    const user = users.find((e) => e.userId == userId);
    const userIds = users.map((e) => e.userId);

    function checkCode(code, level) {
      if (level > 3 || code === "" || !(code in userIds)) {
        return;
      }

      const referredUser = users.find((e) => e.userId === code);
      referralLevel.push({
        userId: referredUser.userId,
        level: level,
      });
      return checkCode(referredUser.referralCode, level + 1);
    }
    checkCode(user.referralCode, 1);
    referralLevel.forEach((refer, index) => {
      if (refer.level == 1) {
        referralLevel[index].amount = amount * 0.3;
      } else if (refer.level == 2) {
        referralLevel[index].amount = amount * 0.05;
      } else if (refer.level == 3) {
        referralLevel[index].amount = 0;
      }
    });
    console.log(referralLevel);
    referralLevel.forEach((refer) => {
      if (refer.level == 1) {
        referralModel.findOne({ userId: refer.userId }).then((referral) => {
          const referrals = referral.level1;
          const referredUser = referrals.find((e) => e.referrarId == userId);
          var index = referrals.indexOf(referredUser);
          referrals.splice(index, 1);
          referredUser.amount = refer.amount;
          referrals.splice(index, 0, referredUser);

          referralModel.updateOne(
            { userId: referral.userId },
            {
              level1: referrals,
            }
          );
        });
      } else if (refer.level == 2) {
        referralModel.findOne({ userId: refer.userId }).then((referral) => {
          const referrals = referral.level2;
          const referredUser = referrals.find((e) => e.referrarId == userId);
          var index = referrals.indexOf(referredUser);
          referrals.splice(index, 1);
          referredUser.amount = refer.amount;
          referrals.splice(index, 0, referredUser);

          referralModel.updateOne(
            { userId: referral.userId },
            {
              level2: referrals,
            }
          );
        });
      } else if (refer.level == 3) {
        referralModel.findOne({ userId: refer.userId }).then((referral) => {
          const referrals = referral.level3;
          const referredUser = referrals.find((e) => e.referrarId == userId);
          var index = referrals.indexOf(referredUser);
          referrals.splice(index, 1);
          referredUser.amount = refer.amount;
          referrals.splice(index, 0, referredUser);

          referralModel.updateOne(
            { userId: referral.userId },
            {
              level3: referrals,
            }
          );
        });
      }
    });
    referralLevel.forEach((refer) => {
      walletModal.findOne({ userId: refer.userId }).then((wallet) => {
        walletModal.updateOne(
          { userId: refer.userId },
          {
            totalAmount: wallet.totalAmount + refer.amount,
            referralAmount: wallet.referralAmount + refer.amount,
          }
        );
      });
    });
  }
}

module.exports.ReferralService = ReferralService;
