const User = require("../../user/Models/UserModel");
const { success, error } = require("../../common/Constants");
const BankModel = require("../../user/Models/bankDetailsModel");
const WalletModel = require("../../user/Models/walletModal");

module.exports.allUsers = async (req, res) => {
  let users = await User.find();
  let userBanks = await BankModel.find();
  let wallets = await WalletModel.find();

  let usersDetails = [];
  users.map((item) => {
    let userBankDetails = userBanks.filter(
      (values) => values.userId === item.userId
    );
    let userWallet = wallets.find((wallet) => wallet.userId === item.userId);

    if (userBankDetails.length > 0) {
      userBankDetails.map((bank) => {
        let userAllDetails = {
          username: item.mobile,
          userId: item.userId,
          loginIP: item.loginIP,
          registrationIP: item.registrationIP,
          balance: userWallet.totalAmount,
          name: bank.acc_holder_name,
          accountNo: bank.acc_number,
          ifsc: bank.ifsc,
          upi: bank.upi,
          status: item.status
        };
        usersDetails.push(userAllDetails);
      });
    } else {
      let userAllDetails = {
        username: item.mobile,
        userId: item.userId,
        loginIP: item.loginIP,
        registrationIP: item.registrationIP,
        balance: userWallet?.totalAmount,
        status: item.status
      };
      usersDetails.push(userAllDetails);
    }
  });

  res.status(200).send({
    status: success,
    message: "all users found",
    totalUsers: users.length,
    users: usersDetails,
  });
};
