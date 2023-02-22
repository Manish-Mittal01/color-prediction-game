const { success, error } = require('../common/Constants').status;
const Bet = require('../Models/betModel');


module.exports.orders = async (req, res) => {
    const { user } = req.query
    if (user) {
        let userBets = await Bet.find({
            user: user
        });
        res.status(200).send({
            status: success,
            message: "",
            err: "",
            allOrders: userBets
        })
    }
    else {
        let allBets = await Bet.find()
        res.status(200).send({
            status: success,
            message: "",
            err: "",
            allOrders: allBets
        })
    }

}