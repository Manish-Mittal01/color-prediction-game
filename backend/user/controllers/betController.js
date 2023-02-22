const Bet = require('../Models/betModel');
const { success, error } = require('../common/Constants').status;
const User = require("../Models/UserModel")


module.exports.makeBet = async (req, res) => {
    const { prediction, amount, user, period, periodName } = req.body;
    function errorMsg(err) {
        return res.status(400).json({
            status: error,
            message: "",
            err: err
        });
    };
    if (!prediction) return errorMsg("prediction is required");
    if (!amount) return errorMsg("amount is required");
    if (!user) return errorMsg("user is required");
    if (!period) return errorMsg("period is required");
    if (!periodName) return errorMsg("periodName is required");

    const validUser = await User.findOne({
        user_code: user
    });
    if (!validUser) return errorMsg("user does not exists!");

    const bet = new Bet({
        prediction: prediction,
        amount: amount,
        user: user,
        period: period,
        periodName: periodName
    });
    let result = await bet.save();
    return res.status(200).send({
        status: success,
        message: "order success",
        bet: result,
        err: ""
    })
}