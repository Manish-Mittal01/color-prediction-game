const { allUsers } = require('../controllers/allUsers');

const router = require('express').Router()

router.route('/allUsers').post(allUsers);


module.exports = router;