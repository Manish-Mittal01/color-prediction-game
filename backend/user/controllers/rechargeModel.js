const { success, error } = require('../common/Constants').status;
const BankDetails = require("../Models/bankDetailsModel");
const Recharge = require('../Models/rechargeModel');


module.exports.recharge = async (req, res) => {
    const { user, amount, createdAt, upi, request_type } = req.body;
    function errorMsg(err) {
        return res.status(400).json({
            status: error,
            message: "",
            err: err
        });
    }

    if (!user) return errorMsg("user is required");
    if (!amount) return errorMsg("amount is required");
    if (!upi) return errorMsg("upi is required");
    if (!createdAt) return errorMsg("createdAt is required");
    if (!request_type) return errorMsg("request type is required");

    const bankDetail = await BankDetails.findOne({
        user: user
    });

    if (!bankDetail) return errorMsg("user does not exist");


    const recharge = {
        user: user,
        mobile: bankDetail.mobile,
        accNumber: bankDetail.acc_number,
        ifsc: bankDetail.ifsc,
        request_time: createdAt,
        upi: upi,
        amount: amount,
        status: "pending",
        type: request_type
    };
    const newRequest = new Recharge(recharge);
    const result = await newRequest.save();

    console.log(result)


    res.status(200).send({
        status: success,
        message: "request submitted successfully",
        err: ""
    });
}