const router = require('express').Router()
const { bankDetails } = require('../controllers/bankController');
const { makeBet } = require('../controllers/betController');
const { orders } = require('../controllers/getOrders');
const { login } = require('../controllers/loginController');
const { periods, periodResult } = require('../controllers/periodController');
const { refered } = require('../controllers/refered');
const { sendOtp, verifyOtp } = require('../controllers/userController')

router.route('/sendOtp').post(sendOtp);
router.route('/sendOtp/verifyOtp').post(verifyOtp);
router.route('/login').post(login);
router.route('/callperiods').post(periods);
router.route('/periodResult').post(periodResult);
router.route('/makeBet').post(makeBet);
router.route('/getOrders').post(orders);
router.route('/referals').post(refered);
router.route('/userBank').post(bankDetails);


module.exports = router;