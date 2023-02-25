const { Schema, model } = require("mongoose");

const walletSchema = Schema({
    user: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    withdrawableAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model('wallets', walletSchema)