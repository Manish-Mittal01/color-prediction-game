const { Schema, model } = require("mongoose");


const periodSchema = Schema({
    periodName: {
        type: String
    },
    period: {
        type: Number
    },
    price: {
        type: Number
    },
    number: {
        type: Number
    },
    result: {
        type: String
    }
}, { versionKey: false });

module.exports = model('periods', periodSchema)