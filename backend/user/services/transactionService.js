const { StatusCode, TransactionType } = require("../../common/Constants");
const bcrypt = require("bcrypt");
const { ResponseService } = require("../../common/responseService");
const TransactionModel = require("../Models/transactionModel");
const UserModel = require("../Models/UserModel");
const walletModal = require("../Models/walletModal");

class TransactionService {
  static async _createAndValidateTransaction({
    res,
    userId,
    amount,
    transactionType,
  }) {
    if (!userId || !amount || !transactionType) {
      const missingFields = [];

      if (!userId) missingFields.push("userId is required");
      if (!amount) missingFields.push("amount is required");
      if (!transactionType) missingFields.push("transactionType is required");
      ResponseService.failed(res, missingFields, StatusCode.badRequest);
      return null;
    }

    const isActive = await UserController.checkUserActive(userId);

    if (isActive == null) {
      ResponseService.failed(res, "User not Found", StatusCode.notFound);
      return null;
    }
    if (!isActive) {
      ResponseService.failed(res, "User is blocked", StatusCode.unauthorized);
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

  static async requestWithdraw(req, res) {
    const { userId, amount, mobile, password } = req.body;

    if (!userId || !amount || !mobile || !password) {
      const missingFields = [];

      if (!userId) missingFields.push("userId is required");
      if (!amount) missingFields.push("amount is required");
      if (!mobile) missingFields.push("mobile is required");
      if (!password) missingFields.push("password is required");
      ResponseService.failed(res, missingFields, StatusCode.badRequest);
      return;
    }

    const isActive = await UserController.checkUserActive(userId);

    if (isActive == null) {
      ResponseService.failed(res, "User not Found", StatusCode.notFound);
      return;
    }
    if (!isActive) {
      ResponseService.failed(res, "User is blocked", StatusCode.unauthorized);
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect || !(mobile == user.mobile)) {
      ResponseService.failed(
        res,
        "User Details doesn't match",
        StatusCode.unauthorized
      );
      return;
    }

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

  static async getTransactions(req, res) {
    const { userId } = req.query;

    if (!userId) {
      ResponseService.failed(res, "userId is required", StatusCode.badRequest);
      return;
    }

    const isActive = await UserController.checkUserActive(userId);

    if (isActive == null) {
      ResponseService.failed(res, "User not Found", StatusCode.notFound);
      return;
    }
    if (!isActive) {
      ResponseService.failed(res, "User is blocked", StatusCode.unauthorized);
      return;
    }

    const transactions = await TransactionModel.find({ userId: userId });

    ResponseService.success(res, "Transactions found", transactions);
  }
}

module.exports.TransactionService = TransactionService;
