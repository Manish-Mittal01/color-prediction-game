const { success, error } = require("../../common/Constants").Status;
const User = require("../Models/UserModel");

module.exports.refered = async (req, res) => {
  const { user } = req.body;

  const level1 = await User.find({
    recommendation_code: user,
  });
  let level2 = [];
  let level3 = [];
  for (let i = 0; i < level1.length; i++) {
    let newUser = level1[i].userId;
    level2 = await User.find({
      recommendation_code: newUser,
    });
  }
  for (let i = 0; i < level2.length; i++) {
    let newUser = level2[i].userId;
    level3 = await User.find({
      recommendation_code: newUser,
    });
  }
  console.log(level2);
  res.status(200).send({
    status: success,
    message: "all referals found",
    err: "",
    refered: {
      level1: level1,
      level2: level2,
      level3: level3,
    },
  });
};
