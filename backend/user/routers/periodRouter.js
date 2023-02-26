const router = require("express").Router();
const { PeriodController } = require("../controllers/periodController");

router.route("/").get(PeriodController.getCurrentSession);
router.route("/history").get(PeriodController.getHistory);

module.exports = router;
