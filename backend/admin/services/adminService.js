const e = require("express");
const { StatusCode } = require("../../common/Constants");
const { ResponseService } = require("../../common/responseService");
const bankDetailsModel = require("../../user/Models/bankDetailsModel");
const adminModel = require("../models/adminModel");

class AdminService {
  static async getDetails(req, res) {
    const { userId } = req.query;

    const admin = await adminModel.findOne({ userId: userId });

    if (!admin) {
      return ResponseService.failed(res, "No admin found", StatusCode.notFound);
    }

    const bankDetails = await bankDetailsModel.find({ userId: userId });
    var data = {
      ...admin,
      bankDetails,
    };

    return ResponseService.success(res, "Admin found", data);
  }
}

module.exports.AdminService = AdminService;
