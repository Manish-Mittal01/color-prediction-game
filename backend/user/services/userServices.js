const { ResponseService } = require("../../common/responseService");
const referralModel = require("../Models/referralModel");
const UserModel = require("../Models/UserModel");
const walletModal = require("../Models/walletModal");

class UserServices {
  static async getAllUsers(req, res) {
    const result = await UserModel.find();

    const users = [];
    result.forEach((user) => {
      users.push({
        userId: user.userId,
        mobile: user.mobile,
        status: user.status,
      });
    });

    ResponseService.success(res, `${users.length} User(s) Found`, users);
  }

  static async getWallet(req, res) {
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

    const wallet = await walletModal.findOne({ userId: userId });

    if (!wallet) {
      ResponseService.failed(res, "Wallet not found", StatusCode.notFound);
      return;
    }

    ResponseService.success(res, "Wallet Details found", wallet);
  }

  static async handleReferralCode(userId, referralCode) {
    const referral1 = await referralModel.findOne({ userId: referralCode });

    console.log(`Referral1 ${referral1}`);

    if (!referral1) {
      referralModel({
        userId: referralCode,
        level1: [
          {
            referrarId: userId,
            amount: 0,
          },
        ],
      }).save();
    } else {
      referralModel.updateOne(
        { userId: referralCode },
        {
          level1: referral1.level1.push({
            referrarId: userId,
            amount: 0,
          }),
        }
      );
    }

    const user2 = await UserModel.findOne({ userId: referralCode });
    console.log(`User2 ${user2}`);
    if (!user2.referralCode) {
      return;
    }

    const referral2 = await referralModel.findOne({
      userId: user2.referralCode,
    });
    console.log(`Referral2 ${referral2}`);

    const level2 = referral2.level2;
    level2.push({
      referrarId: userId,
      amount: 0,
    });

    referralModel.updateOne(
      { userId: user2.referralCode },
      {
        level2: level2,
      },
      function (err, docs) {
        if (err) {
          console.log(`Referral2 Error - ${err}`);
        } else {
          console.log("Referral2 Updated Docs : ", docs);
        }
      }
    );

    const user3 = await UserModel.findOne({ userId: user2.referralCode });
    console.log(`User3 ${user3}`);

    if (!user3.referralCode) {
      return;
    }
    const referral3 = await referralModel.findOne({
      userId: user3.referralCode,
    });
    console.log(`Referral3 ${referral3}`);

    const level3 = referral3.level3;
    level3.push({
      referrarId: userId,
      amount: 0,
    });

    referralModel.updateOne(
      { userId: user3.referralCode },
      {
        level3: level3,
      },
      function (err, docs) {
        if (err) {
          console.log(`Referral3 ${err}`);
        } else {
          console.log("Referral3 Updated Docs : ", docs);
        }
      }
    );
  }
}

module.exports.UserServices = UserServices;
