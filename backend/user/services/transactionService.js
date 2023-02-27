const { StatusCode, TransactionType } = require("../../common/Constants");
const { ResponseService } = require("../../common/responseService");
const TransactionModel = require("../Models/transactionModel");
const walletModal = require("../Models/walletModal");

class TransactionService {
  static async _createAndValidateTransaction({
    res,
    userId,
    amount,
    transactionType,
  }) {
    if (!userId || !amount) {
      const missingFields = [];

      if (!userId) missingFields.push("userId is required");
      if (!amount) missingFields.push("amount is required");
      ResponseService.failed(res, missingFields, StatusCode.badRequest);
      return null;
    }
    const transaction = await TransactionModel({
      userId: userId,
      amount: amount,
      transactionType: transactionType,
    }).save();
    return transaction;
  }

  static async requestDeposit(req, res) {
    const { userId, amount } = req.body;

    const transaction = await this._createAndValidateTransaction({
      res: res,
      userId: userId,
      amount: amount,
      transactionType: TransactionType.deposit,
    });

    if (transaction == null) {
      return;
    }

    return ResponseService.success(
      res,
      "Deposit request created successfully",
      transaction
    );
  }

  static async requestWithdrawl(req, res) {
    const { userId, amount } = req.body;

    const withdrawableAmount = amount * 0.95;
    const wallet = await walletModal.findOne({ userId: userId });

    if (wallet == null) {
      ResponseService.failed(
        res,
        "User wallet did not exist",
        StatusCode.notFound
      );
      return;
    }

    if (withdrawableAmount > wallet.withdrawableAmount) {
      ResponseService.failed(
        res,
        "Not enough withdrawable balance in wallet",
        StatusCode.forbidden
      );
      return;
    }

    const transaction = await this._createAndValidateTransaction({
      res: res,
      userId: userId,
      amount: withdrawableAmount,
      transactionType: TransactionType.withdraw,
    });

    if (transaction == null) {
      return;
    }

    return ResponseService.success(
      res,
      "Withdraw request created successfully",
      transaction
    );
  }
}

module.exports.TransactionService = TransactionService;
