const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../common/Constants').status;


module.exports.login = async (req, res) => {
    const { mobile, password } = req.body;

    const errMsg = (error) => {
        res.status(400).json({
            status: error,
            message: "",
            err: error
        })
    }
    if (!mobile || !password) return errMsg("invalid data")

    const user = await User.findOne({
        mobile: mobile
    });
    if (!user) return errMsg("no user found");
    if (user.status === "blocked") return errMsg("user blocked");

    const validUser = await bcrypt.compare(password, user.password);
    if (user.mobile === mobile && validUser) {
        const token = jwt.sign({
            user_code: user.user_code,
            mobile: user.mobile,
            recommendation_code: user.recommendation_code
        },
            process.env.JWT_SECRET_JEY, { expiresIn: '7d' }
        );
        return res.status(200).send(
            {
                status: success,
                message: "login Success",
                token: token,
                err: ""
            });
    }
    else {
        return res.status(401).json({
            status: error,
            message: "",
            err: "incorrect password"
        });
    };
}