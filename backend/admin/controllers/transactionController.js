const { TransactionAdminService } = require("../services/transactionServices");

class TransactionAdminController {
  static depositRequest = async (req, res) =>
    TransactionAdminService.depositRequest(req, res);
}

module.exports.TransactionAdminController = TransactionAdminController;
