const { StatusCode, TransactionType } = require("../../common/Constants");
const bcrypt = require("bcrypt");
const { ResponseService } = require("../../common/responseService");
const TransactionModel = require("../Models/transactionModel");
const UserModel = require("../Models/UserModel");
const walletModal = require("../Models/walletModal");
const { UserController } = require("../controllers/userController");
const transactionModel = require("../Models/transactionModel");

class TransactionService {
  static async _createAndValidateTransaction({
    res,
    userId,
    amount,
    transactionType,
    walletBalance,
    referranceId = ""
  }) {
    if (!userId || !amount || !transactionType) {
      const missingFields = [];

      if (!userId) missingFields.push("userId is required");
      if (!amount) missingFields.push("amount is required");
      if (!transactionType) missingFields.push("transactionType is required");
      ResponseService.failed(res, missingFields, StatusCode.badRequest);
      if (!referranceId) missingFields.push("referrance number is tequired");
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
      referranceId: referranceId
    }).save();
    return transaction;
  }

  static async requestDeposit(req, res) {
    const { userId, amount, transactionId } = req.body;
    if (!userId) return ResponseService.failed(res, "user Id is is required", StatusCode.badRequest)
    if (!transactionId) return ResponseService.failed(res, "transaction is is required", StatusCode.badRequest)

    const wallet = await walletModal.findOne({ userId: userId });
    const transaction = await this._createAndValidateTransaction({
      res: res,
      userId: userId,
      amount: amount,
      transactionType: TransactionType.deposit,
      walletBalance: wallet.totalAmount,
      referranceId: transactionId
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

    if (!userId || (!amount || (amount < 300 || amount > 10000)) || !password) {
      const missingFields = [];

      if (!userId) missingFields.push("userId is required");
      if (!amount || (amount < 300 || amount > 10000)) missingFields.push("amount must be in-between 300 to 10,000");
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

    const wallet = await walletModal.findOne({ userId: userId });

    if (wallet == null) {
      ResponseService.failed(
        res,
        "User wallet did not exist",
        StatusCode.notFound
      );
      return;
    }

    if (amount > wallet.withdrawableAmount) {
      ResponseService.failed(
        res,
        "Not enough withdrawable balance in wallet",
        StatusCode.forbidden
      );
      return;
    };

    var date = new Date();
    date.setDate(date.getDate() - 3);
    const todayWithdrawalRequest = await transactionModel.findOne({
      userId: userId,
      transactionType: TransactionType.withdraw,
      requestTime: { $gte: date }
    });
    if (todayWithdrawalRequest) return ResponseService.failed(
      res,
      "only one withdraw request per day allowed",
      StatusCode.forbidden
    )

    const transaction = await this._createAndValidateTransaction({
      res: res,
      userId: userId,
      amount: amount,
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
