const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

const User = require("../Models/UserModel");
const Otp = require("../Models/OtpModel");
const { UserServices } = require("../services/userServices");
const { WalletController } = require("./walletController");
const { success, error } = require("../../common/Constants").Status;

class UserController {
  static getAllUsers = async (req, res) => UserServices.getAllUsers(req, res);

  static getWallet = async (req, res) => UserServices.getWallet(req, res);
}

module.exports.sendOtp = async (req, res) => {
  const { mobile, mode } = req.body;
  function errorMsg(err) {
    return res.status(400).json({
      status: error,
      message: "",
      err: err,
    });
  }
  if (!mobile) return errorMsg("mobile is required");
  else if (mobile.length !== 10) return errorMsg("invalid mobile number");
  if (!mode) return errorMsg("mode is required");
  // else if (!["new user", "reset password"].includes(mode)) return errorMsg("invalid mode");

  const user = await User.findOne({
    mobile: mobile,
  });

  if (mode === "new user" && user) return errorMsg("user already exists");
  else if (mode === "reset password" && !user)
    return errorMsg("user does not exist");

  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // const greenwebsms = new URLSearchParams();
  // greenwebsms.append('token', '05fa33c4cb50c35f4a258e85ccf50509');
  // greenwebsms.append('to', `${mobile}`);
  // greenwebsms.append('message', `verification code ${OTP}`);
  // axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then((resp) => {
  //     console.log(resp.data)
  // })

  const otp = new Otp({ mobile: mobile, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  console.log(OTP);
  return res.status(200).send({
    status: success,
    message: `OTP sent successfully ${OTP}`,
    err: "",
  });
};

module.exports.verifyOtp = async (req, res) => {
  const { mobile, password, referralCode, otp, mode } = req.body;
  function errorMsg(err) {
    return res.status(400).json({
      status: error,
      message: "",
      err: err,
    });
  }

  if (!otp) return errorMsg("otp is required");
  if (!password) return errorMsg("password is required");

  if (!mode) return errorMsg("mode is required");
  else if (!["new user", "reset password"].includes(mode))
    return errorMsg("invalid mode");

  const otpHolder = await Otp.find({
    mobile: mobile,
  });
  if (otpHolder.length === 0) return errorMsg("Otp expired");

  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(otp, rightOtpFind.otp);

  async function updateUser({ newUser, message, err }) {
    if (rightOtpFind.mobile === mobile && validUser) {
      let token;
      let result;
      if (mode === "new user") {
        const user = new User(newUser);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        token = user.generateJWT();
        result = await user.save();
        WalletController.createWallet(result.userId);
      } else if (mode === "reset password") {
        const salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(password, salt);
        result = await User.updateOne(
          { _id: newUser._id },
          { password: newPassword }
        );
        result = {};
      }
      const otpDelete = await Otp.deleteMany({
        mobile: rightOtpFind.mobile,
      });

      return res.status(200).send({
        status: success,
        message: message,
        token: token,
        data: result,
        err: "",
      });
    } else {
      return errorMsg(err);
    }
  }

  if (mode === "new user") {
    if (!mobile) return errorMsg("mobile is required");
    // if (!referralCode)
    //   return errorMsg("referralCode is required");

    // let validreferal = await User.findOne({
    //   userId: referralCode,
    // });
    // if (!validreferal) return errorMsg("invalid recommendation code");
    updateUser({
      newUser: {
        mobile: mobile,
        password: password,
        referralCode: referralCode,
      },
      message: "user registered successfully",
      err: "invalid otp or mobile",
    });
  } else if (mode === "reset password") {
    const newUser = await User.findOne({
      mobile: mobile,
    });
    updateUser({
      newUser: newUser,
      message: "password updated",
      err: "invalid otp",
    });
  } else {
    return errorMsg("something wrong happened");
  }
};

module.exports.UserController = UserController;
