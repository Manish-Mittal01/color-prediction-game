const { allUsers } = require("../controllers/allUsers");
const { blockUser } = require("../controllers/blockUserController");
const { login } = require("../controllers/loginController");
const { newRecords } = require("../controllers/todayVsTotal_records");
const {
  TransactionAdminController,
} = require("../controllers/transactionController");

const router = require("express").Router();

router.route("/home").post(newRecords);
router.route("/allUsers").post(allUsers);
router.route("/login").post(login);
router.route("/blockUser").post(blockUser);
router.route("/deposit").get(TransactionAdminController.getDepositRequests);
router
  .route("/deposit/history")
  .get(TransactionAdminController.getDepositHistory);
router.route("/deposit").post(TransactionAdminController.depositRequest);
router.route("/withdraw").get(TransactionAdminController.getWithdrawalRequests);
router
  .route("/withdraw/history")
  .get(TransactionAdminController.getWithdrawHistory);
router.route("/withdraw").post(TransactionAdminController.withdrawRequest);

module.exports = router;
