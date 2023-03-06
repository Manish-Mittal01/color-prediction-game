const { AdminService } = require("../services/adminService");

class AdminController {
  static getDetails = async (req, res) => AdminService.getDetails(req, res);
}

module.exports.AdminController = AdminController;
