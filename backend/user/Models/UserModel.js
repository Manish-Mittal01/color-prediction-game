const { Schema, model } = require("mongoose");
const jwt = require('jsonwebtoken');
const shortid = require('shortid');


const userSchema = Schema({
    user_code: {
        type: String,
        default: shortid.generate(),
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    recommendation_code: String
}, { timestamps: true, versionKey: false });

userSchema.methods.generateJWT = () => {
    const token = jwt.sign({
        _id: this._id,
        mobile: this.mobile
    },
        process.env.JWT_SECRET_JEY, { expiresIn: '7d' }
    )
    return token
}

module.exports = model("users", userSchema)
