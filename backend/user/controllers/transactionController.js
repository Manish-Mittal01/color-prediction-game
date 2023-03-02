const { TransactionService } = require("../services/transactionService");

class TransactionController {
  static requestDeposit = async (req, res) =>
    TransactionService.requestDeposit(req, res);

  static requestWithdraw = async (req, res) =>
    TransactionService.requestWithdraw(req, res);

  static getTransactions = async (req, res) =>
    TransactionService.getTransactions(req, res);
}

module.exports.TransactionController = TransactionController;
