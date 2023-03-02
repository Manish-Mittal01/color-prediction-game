const { TransactionAdminService } = require("../services/transactionServices");

class TransactionAdminController {
  static getDepositRequests = async (req, res) =>
    TransactionAdminService.getDepositRequests(req, res);

  static depositRequest = async (req, res) =>
    TransactionAdminService.depositRequest(req, res);
}

module.exports.TransactionAdminController = TransactionAdminController;
