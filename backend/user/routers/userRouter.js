const router = require("express").Router();
// const { recharge } = require("../controllers/rechargeModel");
const { refered } = require("../controllers/refered");
const { sendOtp, verifyOtp } = require("../controllers/userController");
const { bankDetails } = require("../controllers/bankController");
const { deposits } = require("../controllers/depositsController");
// const { getBets } = require("../controllers/getBets");
const { orders } = require("../controllers/getOrders");
const { login } = require("../controllers/loginController");
// const { periods, periodResult } = require("../controllers/periodController");
const { withdraws } = require("../controllers/withdrawController");

router.route("/sendOtp").post(sendOtp);
router.route("/sendOtp/verifyOtp").post(verifyOtp);
router.route("/login").post(login);
// router.route("/callperiods").post(periods);
// router.route("/periodResult").post(periodResult);
router.route("/getOrders").post(orders);
router.route("/referals").post(refered);
router.route("/userBank").post(bankDetails);
// router.route("/recharge").post(recharge);
// router.route("/getBets").post(getBets);
router.route("/sendOtp").post(sendOtp);
router.route("/sendOtp/verifyOtp").post(verifyOtp);
router.route("/login").post(login);
router.route("/withdrawrequest").post(withdraws);
router.route("/depositrequest").post(deposits);

module.exports = router;
