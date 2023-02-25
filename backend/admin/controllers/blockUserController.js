const { success, error } = require("../../user/common/Constants").status
const User = require("../../user/Models/UserModel")


module.exports.blockUser = async (req, res) => {
    let { mobile, userStatus } = req.body;

    const errMsg = (errorMsg) => {
        res.status(400).send({
            status: error,
            message: "",
            err: errorMsg
        })
    }

    if (!mobile) return errMsg("mobile is required");
    if (!userStatus) return errMsg("user status is required")
    else if (userStatus !== "active" || userStatus !== "blocked") return errMsg("invalid uaer status");

    const user = await User.findOne({
        mobile: mobile
    });

    if (!user) return errMsg("no user found");
    if (user.status === userStatus) return errMsg(`user is already ${userStatus}`);

    let result = await User.updateOne(
        { _id: user._id },
        { status: userStatus }
    );
    console.log(user);

    res.status(200).send({
        status: success,
        message: "user status updated",
        err: ""
    })
}