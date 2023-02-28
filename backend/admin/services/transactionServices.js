const { StatusCode } = require("../../common/Constants");
const { ResponseService } = require("../../common/responseService");
const transactionModel = require("../../user/Models/transactionModel");
const UserModel = require("../../user/Models/UserModel");
const walletModal = require("../../user/Models/walletModal");
const { ReferralController } = require("../controllers/referalController");

class TransactionAdminService {
  static async depositRequest(req, res) {
    const { userId, amount, isApproved, transactionId } = req.body;

    if (!userId || !amount || !isApproved) {
      const errorMsgs = [];

      if (!userId) errorMsgs.push("userId is required");
      if (!amount) errorMsgs.push("amount is required");
      if (!isApproved) errorMsgs.push("isApproved is required");
      if (!transactionId) errorMsgs.push("transactionId is required");

      return ResponseService.failed(res, errorMsgs, StatusCode.badRequest);
    }

    const user = await UserModel.findOne({
      userId: userId,
    });

    if (user == null) {
      return ResponseService.failed(
        res,
        `No user found with UserID:${userId}`,
        StatusCode.notFound
      );
    }

    const wallet = await walletModal.findOne({ userId: userId });

    if (wallet == null) {
      return ResponseService.failed(
        res,
        `Wallet not found for user with UserID:${userId}`,
        StatusCode.notFound
      );
    }
    transactionModel.updateOne(
      { _id: transactionId },
      { status: isApproved ? "approved" : "rejected" }
    );
    if (isApproved) {
      let depositAmount;
      if (wallet.isFirstDeposit) {
        depositAmount = amount * 1.3; // Adding 30% before of referral
        ReferralController.depositReferralAmount(userId, amount);
      } else {
        depositAmount = wallet.notAllowedAmount + amount;
      }
      const result = await walletModal.updateOne(
        { userId: userId },
        {
          notAllowedAmount: depositAmount,
          totalAmount: wallet.totalAmount + amount,
          isFirstDeposit: false,
        }
      );
    }
  }
}

module.exports.TransactionAdminService = TransactionAdminService;
