const { Schema, model } = require("mongoose");


const otpSchema = Schema({
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: '5m'
        }
    }
}, { timestamps: true });

module.exports = model('otps', otpSchema)