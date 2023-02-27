const { TransactionService } = require("../services/transactionService");

class TransactionController {
  static requestDeposit = async (req, res) =>
    TransactionService.requestDeposit(req, res);

  static requestWithdrawl = async (req, res) =>
    TransactionService.requestWithdrawl(req, res);
}

module.exports.TransactionController = TransactionController;
