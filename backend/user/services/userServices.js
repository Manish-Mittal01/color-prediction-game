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
    if (!user2.referralCode) {
      return;
    }

    const referral2 = await referralModel.findOne({
      userId: user2.referralCode,
    });

    const level2 = referral2.level2;
    level2.push({
      referrarId: userId,
      amount: 0,
    });

    referralModel.updateOne(
      { userId: user2.referralCode },
      {
        level2: level2,
      }
    );

    const user3 = await UserModel.findOne({ userId: user2.referralCode });

    if (!user3.referralCode) {
      return;
    }
    const referral3 = await referralModel.findOne({
      userId: user3.referralCode,
    });

    const level3 = referral3.level3;
    level3.push({
      referrarId: userId,
      amount: 0,
    });

    referralModel.updateOne(
      { userId: user3.referralCode },
      {
        level3: level3,
      }
    );
  }
}

module.exports.UserServices = UserServices;
