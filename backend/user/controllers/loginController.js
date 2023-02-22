const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../common/Constants').status;


module.exports.login = async (req, res) => {
    const { mobile, password } = req.body;
    if (!mobile || !password) return res.status(400).json({
        status: error,
        message: "",
        err: "invalid data"
    })

    const user = await User.findOne({
        mobile: mobile
    });
    if (!user) return res.status(404).json({
        status: error,
        message: "",
        err: "no user found"
    });
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