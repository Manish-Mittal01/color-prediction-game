const { ResponseService } = require("../../common/responseService");
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
}

module.exports.UserServices = UserServices;
