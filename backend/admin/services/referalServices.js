const referralModel = require("../../user/Models/referralModel");
const UserModel = require("../../user/Models/UserModel");
const walletModal = require("../../user/Models/walletModal");
const { LogService } = require("../../common/logService");
const { ResponseService } = require("../../common/responseService");
const { StatusCode } = require("../../common/Constants");

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

              referralModel
                .updateOne(
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
                  }
                )
                .then((err, docs) =>
                  LogService.updateLog("Referral-Level1", err, docs)
                );
            });
        } else if (refer.level == 2) {
          referralModel.findOne({ userId: refer.userId }).then((referral) => {
            const referrals = referral.level2;
            const referredUser = referrals.find((e) => e.referrarId == userId);

            referralModel
              .updateOne(
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
                }
              )
              .then((err, docs) =>
                LogService.updateLog("Referral-Level2", err, docs)
              );
          });
        } else if (refer.level == 3) {
          referralModel.findOne({ userId: refer.userId }).then((referral) => {
            const referrals = referral.level3;
            const referredUser = referrals.find((e) => e.referrarId == userId);

            referralModel
              .updateOne(
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
                }
              )
              .then((err, docs) =>
                LogService.updateLog("Referral-Level3", err, docs)
              );
          });
        }
      });
    }

    await updateReferralTable();

    console.log("referralLevel", referralLevel);

    referralLevel.forEach((refer) => {
      console.log(refer);
      walletModal.findOne({ userId: refer.userId }).then((wallet) => {
        walletModal
          .updateOne(
            { userId: refer.userId },
            {
              $set: {
                totalAmount: wallet.totalAmount + refer.amount,
                referralAmount: wallet.referralAmount + refer.amount,
                notAllowedAmount: wallet.notAllowedAmount + refer.amount,
              },
            }
          )
          .then((err, docs) =>
            LogService.updateLog("Referral-Wallet", err, docs)
          );
      });
    });
  }

  static async getReferralData(req, res) {
    const { mobile, userId } = req.query;

    if (!mobile && !userId) {
      return ResponseService.failed(
        res,
        "mobile or userId is required",
        StatusCode.badRequest
      );
    }
    let user;
    if (mobile !== undefined) {
      user = await UserModel.findOne({ mobile: mobile });
    } else {
      user = await UserModel.findOne({ userId: userId });
    }

    if (!user) {
      return ResponseService.failed(res, "User not found", StatusCode.notFound);
    }

    const referrals = await referralModel.findOne({ userId: user.userId });

    if (!referrals) {
      return ResponseService.failed(
        res,
        "Referrals not found for the user",
        StatusCode.notFound
      );
    }

    const levels = {
      level1: referrals.level1,
      level2: referrals.level2,
      level3: referrals.level3,
    };
    const wallets = {};
    const users = {};
    const levelKeys = Object.keys(levels);

    for (const key in levelKeys) {
      const level = levels[key];
      wallets[key] = [];
      users[key] = [];
      for (const l in level) {
        const user = await UserModel.findOne({ userId: l.referrarId });
        const wallet = await walletModal.findOne({ userId: l.referrarId });
        users[key].push(user);
        wallets[key].push(wallet);
      }
    }

    const totalReferrals = Object.values(levels).reduce(
      (a, b) => a + b.length,
      0
    );
    const totalDeposit = Object.values(wallets)
      .flat()
      .map((w) => w.totalDeposit)
      .reduce((a, b) => a + b, 0);

    const totalWithdrawl = Object.values(wallets)
      .flat()
      .map((w) => w.totalWithdrawl)
      .reduce((a, b) => a + b, 0);

    const totalBalance = Object.values(wallets)
      .flat()
      .map((w) => w.totalAmount)
      .reduce((a, b) => a + b, 0);

    const totalActive = Object.values(users)
      .flat()
      .filter((u) => u.status === "active").length;

    const activeUsers = {};

    for (const level of Object.keys(users)) {
    }

    return ResponseService.success(res, "Referral data", {
      totalReferrals,
      totalDeposit,
      totalWithdrawl,
      totalBalance,
      totalActive,
    });
  }
}

module.exports.ReferralService = ReferralService;
