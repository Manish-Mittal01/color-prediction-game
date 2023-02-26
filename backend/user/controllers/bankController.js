const { success, error } = require("../../common/Constants").Status;
const BankDetails = require("../Models/bankDetailsModel");
const Otp = require("../Models/OtpModel");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

module.exports.bankDetails = async (req, res) => {
  const { mobile, acc_number, ifsc, otp, user, acc_holder_name, branch, upi } =
    req.body;
  function errorMsg(err) {
    return res.status(400).json({
      status: error,
      message: "",
      err: err,
    });
  }

  if (!user) return errorMsg("user is required");
  if (acc_number) {
    if (!ifsc) return errorMsg("ifsc is required");
  } else {
    if (!upi) return errorMsg("upi or account details are required");
  }
  if (!mobile) return errorMsg("mobile is required");
  if (!otp) return errorMsg("otp is required");

  const otpHolder = await Otp.find({
    mobile: mobile,
  });
  if (otpHolder.length === 0) return errorMsg("Otp expired");
  let userfound = await User.findOne({
    userId: user,
  });
  if (!userfound) return errorMsg("user does not exist");

  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(otp, rightOtpFind.otp);

  const bank = {
    user,
    acc_holder_name,
    acc_number,
    ifsc,
    mobile,
    branch,
    upi,
  };

  const addBank = new BankDetails(bank);
  const result = await addBank.save();
  const otpDelete = await Otp.deleteMany({
    mobile: rightOtpFind.mobile,
  });
  let banks = await BankDetails.find({
    user: user,
  });

  res.status(200).send({
    status: success,
    message: "bank successfulkly added",
    err: "",
    paymentDetails: banks,
  });
};
