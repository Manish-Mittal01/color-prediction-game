const {
  StatusCode,
  TransactionType,
  TransactionStatus,
} = require("../../common/Constants");
const { LogService } = require("../../common/logService");
const { ResponseService } = require("../../common/responseService");
const transactionModel = require("../../user/Models/transactionModel");
const UserModel = require("../../user/Models/UserModel");
const walletModal = require("../../user/Models/walletModal");
const { ReferralController } = require("../controllers/referalController");

class TransactionAdminService {
  static async getDepositRequests(req, res) {
    const allDeposits = await transactionModel.find({
      transactionType: TransactionType.deposit,
    });


    if (!allDeposits || allDeposits.length === 0) {
      return ResponseService.success(res, "No Deposit requests found", []);
    }

    const pending = [];

    async function separateDeposits() {
      for (let i in allDeposits) {
        const deposit = allDeposits[i];
        if (deposit.status === TransactionStatus.pending) {
          pending.push(deposit);
        }
      }
    }

    await separateDeposits();

    if (!pending || pending.length === 0) {
      return ResponseService.success(res, "No Deposit requests found", []);
    }


    return ResponseService.success(res, "Deposit requests found", pending);
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
    const transaction = await transactionModel.findOne({
      _id: transactionId,
      status: TransactionStatus.pending,
    });

    if (!transaction) {
      return ResponseService.failed(
        res,
        `No pending transaction found for user with TransactionID:${userId}`,
        StatusCode.notFound
      );
    }
    console.log("start")
    try {

      const updatedTransaction = await transactionModel.updateOne(
        { _id: transactionId, userId: userId },
        {
          $set: {
            "status": isApproved
              ? TransactionStatus.approved
              : TransactionStatus.rejected,
          },
        },
        (err, docs) => LogService.updateLog("Deposit-Transaction", err, docs)
      );
    } catch (e) {
      console.log('[Error] -', e);
    }

    console.log("after updating transaction===============================");

    if (isApproved) {
      console.log("isApproved found--------------------------------------------------------")
      let depositAmount;
      if (wallet.isFirstDeposit && user.referralCode) {
        console.log("first deposit----------")
        depositAmount = amount * 1.3; // Adding 30% before of referral
        ReferralController.depositReferralAmount(userId, amount);
      } else {
        console.log("not first deposit---------")
        depositAmount = wallet.notAllowedAmount + amount;
      }
      console.log("before updating wallet")
      const result = await walletModal.updateOne(
        { "userId": userId },
        {
          $set: {
            "notAllowedAmount": depositAmount,
            "totalAmount": wallet.totalAmount + depositAmount,
            "isFirstDeposit": false,
          },
        },
        (err, docs) => LogService.updateLog("Deposit-Wallet", err, docs)
      );
      console.log("after updating wallet")
      ResponseService.success(res, "Request Approved Successfully", {});
    } else {
      ResponseService.success(res, "Request Rejected Successfully", {});
      return;
    }
  }

  static async getWithdrawalRequests(req, res) {
    const allDeposits = await transactionModel.find({
      transactionType: TransactionType.withdraw,
    });

    if (!allDeposits || allDeposits.length === 0) {
      return ResponseService.success(res, "No Withdraw requests found", []);
    }

    const pending = [];

    async function separateDeposits() {
      for (let i in allDeposits) {
        const deposit = allDeposits[i];
        if (deposit.status === TransactionStatus.pending) {
          pending.push(deposit);
        }
      }
    }

    if (!pending || pending.length === 0) {
      return ResponseService.success(res, "No Withdraw requests found", []);
    }

    await separateDeposits();

    return ResponseService.success(res, "Withdraw requests found", pending);
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

    if (wallet.withdrawableAmount < amount) {
      return ResponseService.failed(
        res,
        `Not enough Withdrawable Amount Wallet`,
        StatusCode.notFound
      );
    }

    const transaction = await transactionModel.findOne({
      _id: transactionId,
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
      { _id: transactionId },
      {
        $set: {
          status: isApproved
            ? TransactionStatus.approved
            : TransactionStatus.rejected,
        },
      },
      (err, docs) => LogService.updateLog("Withdraw-Transaction", err, docs)
    );

    if (isApproved) {
      const result = await walletModal.updateOne(
        { userId: userId },
        {
          $set: {
            withdrawableAmount: wallet.withdrawableAmount - amount,
            totalAmount: wallet.totalAmount - amount,
          },
        },
        (err, docs) => LogService.updateLog("Withdraw-Wallet", err, docs)
      );
      ResponseService.success(res, "Request Approved Successfully", {});
    } else {
      ResponseService.success(res, "Request Rejected Successfully", {});
      return;
    }
  }
}

module.exports.TransactionAdminService = TransactionAdminService;
