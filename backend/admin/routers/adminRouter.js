const { allUsers } = require("../controllers/allUsers");
const { blockUser } = require("../controllers/blockUserController");
const {
  TransactionAdminController,
} = require("../controllers/transactionController");

const router = require("express").Router();

router.route("/allUsers").post(allUsers);
router.route("/blockUser").post(blockUser);
router.route("/deposit").get(TransactionAdminController.getDepositRequests);
router.route("/deposit").post(TransactionAdminController.depositRequest);

module.exports = router;
