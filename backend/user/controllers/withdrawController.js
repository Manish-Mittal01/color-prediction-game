const { success, error } = require("../../common/Constants").Status;
const Withdrwas = require("../Models/withdrawModel");

module.exports.withdraws = async (req, res) => {
  const { user, amount } = req.body;

  function errorMsg(err) {
    return res.status(400).json({
      status: error,
      message: "",
      err: err,
    });
  }
  if (!user) return errorMsg("user is required");
  if (!amount) return errorMsg("amount is required");

  const transaction = {
    user,
    amount,
  };

  const depositRequest = new Withdrwas(transaction);
  const result = await depositRequest.save();

  // console.log("withdraws", result);

  return res.status(200).send({
    status: success,
    message: "deposit request submitted successfully",
    err: "",
  });
};
