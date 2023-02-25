const { allUsers } = require('../controllers/allUsers');
const { blockUser } = require('../controllers/blockUserController');

const router = require('express').Router()

router.route('/allUsers').post(allUsers);
router.route('/blockUser').post(blockUser);


module.exports = router;