const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const Otp = require("../Models/OtpModel");
const { UserServices } = require("../services/userServices");
const { WalletController } = require("./walletController");
const UserModel = require("../Models/UserModel");
const { ResponseService } = require("../../common/responseService");
const { StatusCode } = require("../../common/Constants");
const { success, error } = require("../../common/Constants").Status;

class UserController {
  static checkUserActive = async (userId) =>
    UserServices.checkUserActive(userId);

  static getAllUsers = async (req, res) => UserServices.getAllUsers(req, res);

  static getWallet = async (req, res) => UserServices.getWallet(req, res);

  static handleReferralCode = async (userId, referralCode) =>
    UserServices.handleReferralCode(userId, referralCode);
}

module.exports.sendOtp = async (req, res) => {
  const { mobile, mode } = req.body;

  if (!mobile) return ResponseService.failed(res, "mobile is required", StatusCode.badRequest);
  else if (mobile.length !== 10) return ResponseService.failed(res, "invalid mobile number", StatusCode.badRequest);
  if (!mode) return ResponseService.failed(res, "mode is required", StatusCode.badRequest);
  else if (!["new user", "reset password"].includes(mode)) return ResponseService.failed(res, "invalid mode", StatusCode.badRequest);

  const user = await User.findOne({
    mobile: mobile,
  });

  if (mode === "new user" && user) return ResponseService.failed(res, "user already exists", StatusCode.badRequest);
  else if (mode === "reset password" && !user) return ResponseService.failed(res, "user does not exist", StatusCode.badRequest);

  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const otp = new Otp({ mobile: mobile, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  console.log(OTP);

  let msg = `Please use this code as your one time password (otp). It will expire in 3 minutes.
  \n your OTP is ${OTP}.
  \n Never share your otp with anyone`;

  // await axios.get("https://type.fit/api/quotes")
  //   .then(resp => {
  //     console.log("axios quotes data", resp.data)
  //   })
  //   .catch(err => {
  //     console.log("axios err", err)
  //   });

  await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=6cFJuzYoEAtxRZ1sjgQPb8M3Ofd07pKTVe5LkaNyhBvGlqmISwyA6OrxTKaBNJu4EoYRw5XSbmQ37kLi&route=q&message=${msg}&language=english&flash=0&numbers=${mobile}`)
    .then((resp) => {
      return res.status(200).send({
        status: success,
        message: `OTP sent successfully ${OTP}`,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: false,
        message: "something wrong happend while sending otp",
      });
    });

  // return ResponseService.success(res, "Otp sent successfully", {});
};

module.exports.verifyOtp = async (req, res) => {
  const { mobile, password, referralCode, otp, mode, registrationIP } = req.body;

  if (!otp) return ResponseService.failed(res, "otp is required", StatusCode.badRequest);
  if (!password) return ResponseService.failed(res, "password is required", StatusCode.badRequest);
  if (!mode) return ResponseService.failed(res, "mode is required", StatusCode.badRequest);
  else if (!["new user", "reset password"].includes(mode)) return ResponseService.failed(res, "Invalid mode", StatusCode.badRequest);

  const otpHolder = await Otp.find({
    mobile: mobile,
  });
  if (otpHolder.length === 0) return ResponseService.failed(res, "Otp expired", StatusCode.badRequest);

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
        if (referralCode) {
          UserController.handleReferralCode(user.userId, referralCode);
        }
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
      });
    } else {
      return ResponseService.failed(res, err, StatusCode.badRequest);
    }
  }

  if (mode === "new user") {
    if (!mobile) return ResponseService.failed(res, "mobile is required", StatusCode.badRequest);

    if (!registrationIP) {
      return ResponseService.failed(res, "RegistrationIP is required", StatusCode.badRequest);
    }

    if (referralCode) {
      const users = await UserModel.find();
      const userIds = users.map((e) => e.userId);
      if (!userIds.includes(referralCode)) {
        return ResponseService.failed(
          res,
          "Invalid Referral Code",
          StatusCode.forbidden
        );
      }
    }
    if (!referralCode)
      return ResponseService.failed(res, "referralCode is required", StatusCode.badRequest);

    let validreferal = await User.findOne({
      userId: referralCode,
    });
    if (!validreferal) return ResponseService.failed(res, "invalid recommendation code", StatusCode.badRequest);
    updateUser({
      newUser: {
        mobile: mobile,
        password: password,
        referralCode: referralCode,
        registrationIP: registrationIP,
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
    return ResponseService.failed(res, "something wrong happened", StatusCode.notFound);
  }
};

module.exports.UserController = UserController;
