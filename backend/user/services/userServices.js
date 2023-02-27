const { ResponseService } = require("../../common/responseService");
const UserModel = require("../Models/UserModel");

class UserServices {
  static async getAllUsers(req, res) {
    const result = await UserModel.find();

    const users = [];
    result.forEach((user) => {
      users.push({
        userId: user.userId,
        mobile: user.mobile,
        status: user.status,
      });
    });

    ResponseService.success(res, `${users.length} User(s) Found`, users);
  }
}

module.exports.UserServices = UserServices;
