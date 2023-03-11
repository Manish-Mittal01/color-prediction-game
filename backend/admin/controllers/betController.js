const { AdminBetService } = require("../services/betService");

class AdminBetController {
  static getBets = async (req, res) => AdminBetService.getBets(req, res);
}

module.exports.AdminBetController = AdminBetController;
