const router = require("express").Router();
const { BetController } = require("../controllers/betController");

router.route("/").get(BetController.getBets);
router.route("/").post(BetController.makeBet);

module.exports = router;
