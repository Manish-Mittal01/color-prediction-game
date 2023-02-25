const { Schema, model } = require("mongoose");


const timerSchema = Schema({
    periodName: {
        type: String,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    expireAt: {
        type: Date,
        required: true
    },
});

module.exports = model('periodTimers', timerSchema)