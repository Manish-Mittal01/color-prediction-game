const { Schema, model } = require("mongoose");


const depositSchema = Schema({
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
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
}, { timestamps: true });

module.exports = model('disposits', depositSchema)