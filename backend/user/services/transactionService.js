const { StatusCode, TransactionType } = require("../../common/Constants");
const bcrypt = require("bcrypt");
const { ResponseService } = require("../../common/responseService");
const TransactionModel = require("../Models/transactionModel");
const UserModel = require("../Models/UserModel");
const walletModal = require("../Models/walletModal");
const { UserController } = require("../controllers/userController");

class TransactionService {
  static async _createAndValidateTransaction({
    res,
    userId,
    amount,
    transactionType,
    walletBalance,
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
      wallet: walletBalance,
    }).save();
    return transaction;
  }

  static async requestDeposit(req, res) {
    const { userId, amount } = req.body;

    const wallet = await walletModal.findOne({ userId: userId });
    console.log(wallet);
    const transaction = await this._createAndValidateTransaction({
      res: res,
      userId: userId,
      amount: amount,
      transactionType: TransactionType.deposit,
      walletBalance: wallet.totalAmount,
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

    if (!userId || !amount || !password) {
      const missingFields = [];

      if (!userId) missingFields.push("userId is required");
      if (!amount) missingFields.push("amount is required");
      // if (!mobile) missingFields.push("mobile is required");
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
    const user = await UserModel.findOne({
      userId: userId,
    });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
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
      walletBalance: wallet.withdrawableAmount,
    });

    if (transaction == null) {
      return;
    }

    const result = await walletModal.updateOne(
      { userId: userId },
      {
        $set: {
          withdrawableAmount: wallet.withdrawableAmount - amount,
          totalAmount: wallet.totalAmount - amount,
        },
      }
    );

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
