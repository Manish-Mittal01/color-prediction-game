const { TransactionAdminService } = require("../services/transactionServices");

class TransactionAdminController {
  static getDepositRequests = async (req, res) =>
    TransactionAdminService.getDepositRequests(req, res);

  static getWithdrawalRequests = async (req, res) =>
    TransactionAdminService.getWithdrawalRequests(req, res);

  static getDepositHistory = async (req, res) =>
    TransactionAdminService.getDepositHistory(req, res);

  static getWithdrawHistory = async (req, res) =>
    TransactionAdminService.getWithdrawHistory(req, res);

  static depositRequest = async (req, res) =>
    TransactionAdminService.depositRequest(req, res);

  static withdrawRequest = async (req, res) =>
    TransactionAdminService.withdrawRequest(req, res);
}

module.exports.TransactionAdminController = TransactionAdminController;
