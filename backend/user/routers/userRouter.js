const router = require("express").Router();
// const { recharge } = require("../controllers/rechargeModel");
const {
  sendOtp,
  verifyOtp,
  UserController,
} = require("../controllers/userController");
const { bankDetails } = require("../controllers/bankController");
// const { getBets } = require("../controllers/getBets");
const { orders } = require("../controllers/getOrders");
const { login } = require("../controllers/loginController");
// const { periods, periodResult } = require("../controllers/periodController");
const {
  TransactionController,
} = require("../controllers/transactionController");
const { ReferralController } = require("../controllers/referralController");

router.route("/all").get(UserController.getAllUsers);
router.route("/sendOtp").post(sendOtp);
router.route("/sendOtp/verifyOtp").post(verifyOtp);
router.route("/login").post(login);
// router.route("/callperiods").post(periods);
// router.route("/periodResult").post(periodResult);
router.route("/getOrders").post(orders);
router.route("/userBank").post(bankDetails);
// router.route("/recharge").post(recharge);
// router.route("/getBets").post(getBets);
router.route("/withdraw").post(TransactionController.requestWithdraw);
router.route("/deposit").post(TransactionController.requestDeposit);
router.route("/transactions").get(TransactionController.getTransactions);
router.route("/referrals").get(ReferralController.getUserReferrals);
router.route("/wallet").get(UserController.getWallet);

module.exports = router;
