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
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = model('bankDetails', bankDetails)