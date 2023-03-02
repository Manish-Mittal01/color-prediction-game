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

    const userEntry = {
      referrarId: userId,
      amount: 0,
    };

    if (!referral1) {
      referralModel({
        userId: referralCode,
        level1: [userEntry],
      }).save();
    } else {
      referralModel.updateOne(
        { userId: referralCode },
        {
          $push: {
            "level1.$.items": userEntry,
          },
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

    referralModel.updateOne(
      { userId: user2.referralCode },
      {
        $push: {
          "level2.$.items": userEntry,
        },
      }
    );

    const user3 = await UserModel.findOne({ userId: user2.referralCode });

    if (!user3.referralCode) {
      return;
    }
    const referral3 = await referralModel.findOne({
      userId: user3.referralCode,
    });

    referralModel.updateOne(
      { userId: user3.referralCode },
      {
        $push: {
          "level3.$.items": userEntry,
        },
      }
    );
  }
}

module.exports.UserServices = UserServices;
