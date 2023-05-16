const {
  StatusCode,
  TransactionType,
  TransactionStatus,
  ReferralBonus,
} = require("../../common/Constants");
var mongo = require("mongodb");
const { LogService } = require("../../common/logService");
const { ResponseService } = require("../../common/responseService");
const transactionModel = require("../../user/Models/transactionModel");
const UserModel = require("../../user/Models/UserModel");
const walletModal = require("../../user/Models/walletModal");
const { ReferralController } = require("../controllers/referalController");

class TransactionAdminService {
  static async getDepositRequests(req, res) {
    const depositsPending = await transactionModel.find({
      transactionType: TransactionType.deposit,
      status: TransactionStatus.pending
    });

    if (!depositsPending || depositsPending.length === 0) {
      return ResponseService.success(res, "No Deposit requests found", []);
    }

    if (!depositsPending || depositsPending.length === 0) {
      return ResponseService.success(res, "No Deposit requests found", []);
    }

    return ResponseService.success(res, "Deposit requests found", depositsPending);
  }

  static async getDepositHistory(req, res) {
    const allDeposits = await transactionModel.find({
      transactionType: TransactionType.deposit,
    });

    if (!allDeposits || allDeposits.length === 0) {
      return ResponseService.success(res, "No Deposit requests found", {});
    }

    const approved = [];
    const rejected = [];

    async function separateDeposits() {
      for (let i in allDeposits) {
        const deposit = allDeposits[i];
        if (deposit.status === TransactionStatus.approved) {
          approved.push(deposit);
        } else if (deposit.status === TransactionStatus.rejected) {
          rejected.push(deposit);
        }
      }
    }

    await separateDeposits();

    return ResponseService.success(res, "Deposit requests found", {
      approved: approved,
      rejected: rejected,
    });
  }

  static async depositRequest(req, res) {
    const { userId, amount, isApproved, transactionId } = req.body;

    if (!userId || !amount || isApproved === undefined || !transactionId) {
      const errorMsgs = [];

      if (!userId) errorMsgs.push("userId is required");
      if (!amount) errorMsgs.push("amount is required");
      if (isApproved === undefined) errorMsgs.push("isApproved is required");
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
    const transaction = await transactionModel.findOne({
      _id: mongo.ObjectId(transactionId),
      status: TransactionStatus.pending,
    });

    if (!transaction) {
      return ResponseService.failed(
        res,
        `No pending transaction found for user with TransactionID:${userId}`,
        StatusCode.notFound
      );
    }

    const updatedTransaction = await transactionModel.updateOne(
      { _id: mongo.ObjectId(transactionId), userId: userId },
      {
        $set: {
          status: isApproved
            ? TransactionStatus.approved
            : TransactionStatus.rejected,
        },
      }
    );

    if (isApproved) {
      let depositAmount;
      let bonusAmount;
      let totalAmount;

      if (wallet.isFirstDeposit && user.referralCode) {
        bonusAmount = wallet.bonusAmount + amount * ReferralBonus.level1;
        depositAmount = amount * (1 + ReferralBonus.level1); // Adding 30% before of referral
        totalAmount = wallet.totalAmount + depositAmount;
        ReferralController.depositReferralAmount(userId, amount);
      } else {
        bonusAmount = wallet.bonusAmount;
        depositAmount = wallet.notAllowedAmount + amount;
        totalAmount = wallet.totalAmount + amount;
      }
      // Here wallet of current user is being updated
      const result = await walletModal
        .updateOne(
          { userId: userId },
          {
            $set: {
              totalDeposit: wallet.totalDeposit + amount,
              notAllowedAmount: depositAmount,
              totalAmount: totalAmount,
              isFirstDeposit: false,
              bonusAmount: bonusAmount,
            },
          }
        )
        .then((err, docs) => LogService.updateLog("UserWallet", err, docs));
      ResponseService.success(res, "Request Approved Successfully", {});
    } else {
      ResponseService.success(res, "Request Rejected Successfully", {});
      return;
    }
  }

  static async getWithdrawalRequests(req, res) {
    const allDeposits = await transactionModel.find({
      transactionType: TransactionType.withdraw,
      status: TransactionStatus.pending,
    });

    if (!allDeposits || allDeposits.length === 0) {
      return ResponseService.success(res, "No Withdraw requests found", []);
    }

    return ResponseService.success(res, "Withdraw requests found", allDeposits);
  }

  static async getWithdrawHistory(req, res) {
    const allDeposits = await transactionModel.find({
      transactionType: TransactionType.withdraw,
    });

    if (!allDeposits || allDeposits.length === 0) {
      return ResponseService.success(res, "No Withdraw requests found", {});
    }

    const approved = [];
    const rejected = [];

    async function separateDeposits() {
      for (let i in allDeposits) {
        const deposit = allDeposits[i];
        if (deposit.status === TransactionStatus.approved) {
          approved.push(deposit);
        } else if (deposit.status === TransactionStatus.rejected) {
          rejected.push(deposit);
        }
      }
    }

    await separateDeposits();

    return ResponseService.success(res, "Withdraw requests found", {
      approved: approved,
      rejected: rejected,
    });
  }

  static async withdrawRequest(req, res) {
    const { userId, amount, isApproved, transactionId } = req.body;

    if (!userId || !amount || isApproved === undefined || !transactionId) {
      const errorMsgs = [];

      if (!userId) errorMsgs.push("userId is required");
      if (!amount) errorMsgs.push("amount is required");
      if (isApproved === undefined) errorMsgs.push("isApproved is required");
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

    const transaction = await transactionModel.findOne({
      _id: mongo.ObjectId(transactionId),
      status: TransactionStatus.pending,
    });

    if (!transaction) {
      return ResponseService.failed(
        res,
        `No pending transaction found for user with TransactionID: ${userId}`,
        StatusCode.notFound
      );
    }
    const updatedTransaction = await transactionModel.updateOne(
      { _id: mongo.ObjectId(transactionId) },
      {
        $set: {
          status: isApproved
            ? TransactionStatus.approved
            : TransactionStatus.rejected,
        },
      }
    );

    if (isApproved) {
      const result = await walletModal.updateOne(
        { userId: userId },
        {
          $set: {
            totalWithdrawl: wallet.totalWithdrawl + amount,
          },
        }
      );
      return ResponseService.success(res, "Request Approved Successfully", {});
    } else {
      const result = await walletModal.updateOne(
        { userId: userId },
        {
          $set: {
            withdrawableAmount: wallet.withdrawableAmount + amount,
            totalAmount: wallet.totalAmount - amount * 0.95,
          },
        }
      );
      return ResponseService.success(res, "Request Rejected Successfully", {});
    }
  }
}

module.exports.TransactionAdminService = TransactionAdminService;
