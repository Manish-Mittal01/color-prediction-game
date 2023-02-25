const { Schema, model } = require("mongoose");


const withdrawSchema = Schema({
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
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
}, { timestamps: true });

module.exports = model('withdraws', withdrawSchema)