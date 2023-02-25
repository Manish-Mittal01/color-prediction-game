const { Schema, model } = require("mongoose");


const rechargeSchema = Schema({
    user: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    request_time: {
        type: Date,
        required: true
    },
    upi: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    request_type: {
        type: String,
        required: true
    },
    accNumber: Number,
    ifsc: String,
}, { timestamps: true });

module.exports = model('recharges', rechargeSchema)