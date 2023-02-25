const { Schema, model } = require("mongoose");


const bankDetails = Schema({
    user: {
        type: String,
        required: true
    },
    acc_holder_name: {
        type: String
    },
    acc_number: {
        type: Number,
    },
    ifsc: {
        type: String,
    },
    mobile: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
    },
    upi: {
        type: String
    }
}, { versionKey: false });

module.exports = model('bankDetails', bankDetails)