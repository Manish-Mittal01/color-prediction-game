const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCode } = require("../../common/Constants");
const { UserController } = require("./userController");
const { ResponseService } = require("../../common/responseService");
const UserModel = require("../Models/UserModel");
const { LogService } = require("../../common/logService");
const { success, error } = require("../../common/Constants").Status;

module.exports.login = async (req, res) => {
  const { mobile, password, loginIP } = req.body;

  const errMsg = (message, code) => {
    res.status(code).json({
      status: success,
      message: message,
    });
  };

  if (!mobile || !password || !loginIP) {
    const errorMsgs = [];
    if (!mobile) {
      errorMsgs.push("Mobile is required");
    }
    if (!password) {
      errorMsgs.push("Password is required");
    }
    if (!loginIP) {
      errorMsgs.push("LoginIP is required");
    }
    return errMsg(errorMsgs, StatusCode.badRequest);
  }

  const user = await User.findOne({
    mobile: mobile,
  });

  if (!user) {
    ResponseService.failed(res, "User not Found", StatusCode.notFound);
    return;
  }
  if (user.status === "blocked") {
    ResponseService.failed(res, "User is blocked", StatusCode.unauthorized);
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (user.mobile === mobile && isPasswordCorrect) {
    const token = jwt.sign(
      {
        userId: user.userId,
        mobile: user.mobile,
        referralCode: user.referralCode,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    await UserModel.updateOne(
      { userId: user.userId },
      {
        $set: {
          loginIP: loginIP,
        },
      }
    ).then((err, docs) => LogService.updateLog("User-Login", err, docs));
    return res.status(200).send({
      status: success,
      message: "Login Successful",
      token: token,
    });
  } else {
    return errMsg("Incorrect Mobile or Password", 401);
  }
};
