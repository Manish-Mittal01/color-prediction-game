const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCode } = require("../../common/Constants");
const { UserController } = require("./userController");
const { success, error } = require("../../common/Constants").Status;

module.exports.login = async (req, res) => {
  const { mobile, password } = req.body;

  const errMsg = (message, code) => {
    res.status(code).json({
      status: success,
      message: message,
    });
  };

  if (!mobile || !password)
    return errMsg("Invalid data", StatusCode.badRequest);

  const user = await User.findOne({
    mobile: mobile,
  });
  const isActive = await UserController.checkUserActive(userId);

  if (isActive == null) {
    ResponseService.failed(res, "User not Found", StatusCode.notFound);
    return;
  }
  if (!isActive) {
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
    return res.status(200).send({
      status: success,
      message: "Login Successful",
      token: token,
    });
  } else {
    return errMsg("Incorrect Mobile or Password", 401);
  }
};
