const User = require("../../user/Models/UserModel")
const { success, error } = require("../../user/common/Constants")

module.exports.allUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).send({
        status: success,
        message: "all users found",
        err: '',
        totalUsers: users.length,
        users: users,
    })
    console.log("called")
}