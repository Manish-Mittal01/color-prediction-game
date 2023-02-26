const router = require("express").Router();
const { PeriodController } = require("../controllers/periodController");

router.route("/").get(PeriodController.getCurrentSession);

module.exports = router;
