const { success, error } = require("../../common/Constants").Status;
const Deposits = require("../Models/depositModel");

module.exports.deposits = async (req, res) => {
  const { user, amount, transactionId } = req.body;

  function errorMsg(err) {
    return res.status(400).json({
      status: error,
      message: "",
      err: err,
    });
  }
  if (!user) return errorMsg("user is required");
  if (!amount) return errorMsg("amount is required");
  if (!transactionId) return errorMsg("transactionId is required");

  const transaction = {
    user,
    amount,
    transactionId,
  };

  const depositRequest = new Deposits(transaction);
  const result = await depositRequest.save();

  // console.log("deposits", result)

  return res.status(200).send({
    status: success,
    message: "deposit request submitted successfully",
    err: "",
  });
};
