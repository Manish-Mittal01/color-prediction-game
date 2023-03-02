const referralModel = require("../../user/Models/referralModel");
const UserModel = require("../../user/Models/UserModel");
const walletModal = require("../../user/Models/walletModal");
const { LogService } = require("../../common/logService");

class ReferralService {
  static async depositReferralAmount(userId, amount) {
    const referralLevel = [];
    const users = await UserModel.find();
    const user = users.find((e) => e.userId == userId);
    const userIds = users.map((e) => e.userId);

    async function checkCode(code, level) {
      if (level > 3 || code === "" || !userIds.includes(code)) {
        return;
      }

      const referredUser = users.find((e) => e.userId === code);
      referralLevel.push({
        userId: referredUser.userId,
        level: level,
      });
      return await checkCode(referredUser.referralCode, level + 1);
    }
    await checkCode(user.referralCode, 1);

    for (let index in referralLevel) {
      const refer = referralLevel[index];
      if (refer.level == 1) {
        referralLevel[index].amount = amount * 0.3;
      } else if (refer.level == 2) {
        referralLevel[index].amount = amount * 0.05;
      } else if (refer.level == 3) {
        referralLevel[index].amount = 0;
      }
    }

    async function updateReferralTable() {
      referralLevel.forEach((refer) => {
        if (refer.level == 1) {
          referralModel
            .findOne({ userId: refer.userId })
            .then(async (referral) => {
              const referrals = referral.level1;
              const referredUser = referrals.find(
                (e) => e.referrarId == userId
              );

              referralModel.updateOne(
                { userId: referral.userId },
                {
                  $set: { "level1.$[item].amount": refer.amount },
                },
                {
                  arrayFilters: [
                    {
                      "item.referrarId": referredUser.referrarId,
                    },
                  ],
                },
                (err, docs) =>
                  LogService.updateLog("Referral-Level1", err, docs)
              );
            });
        } else if (refer.level == 2) {
          referralModel.findOne({ userId: refer.userId }).then((referral) => {
            const referrals = referral.level2;
            const referredUser = referrals.find((e) => e.referrarId == userId);

            referralModel.updateOne(
              { userId: referral.userId },
              {
                $set: { "level2.$[item].amount": refer.amount },
              },
              {
                arrayFilters: [
                  {
                    "item.referrarId": referredUser.referrarId,
                  },
                ],
              },
              (err, docs) => LogService.updateLog("Referral-Level2", err, docs)
            );
          });
        } else if (refer.level == 3) {
          referralModel.findOne({ userId: refer.userId }).then((referral) => {
            const referrals = referral.level3;
            const referredUser = referrals.find((e) => e.referrarId == userId);

            referralModel.updateOne(
              { userId: referral.userId },
              {
                $set: { "level3.$[item].amount": refer.amount },
              },
              {
                arrayFilters: [
                  {
                    "item.referrarId": referredUser.referrarId,
                  },
                ],
              },
              (err, docs) => LogService.updateLog("Referral-Level3", err, docs)
            );
          });
        }
      });
    }

    await updateReferralTable();

    referralLevel.forEach((refer) => {
      walletModal.findOne({ userId: refer.userId }).then((wallet) => {
        walletModal.updateOne(
          { userId: refer.userId },
          {
            $set: {
              totalAmount: wallet.totalAmount + refer.amount,
              referralAmount: wallet.referralAmount + refer.amount,
            },
          },
          (err, docs) => LogService.updateLog("Referral-Wallet", err, docs)
        );
      });
    });
  }
}

module.exports.ReferralService = ReferralService;
