const { Schema, model } = require("mongoose");

const betSchema = Schema({
    periodName: {
        type: String,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    prediction: {
        type: String || Number,
        required: true
    }
}, { timestamps: true, versionKey: false });

module.exports = model('bets', betSchema)