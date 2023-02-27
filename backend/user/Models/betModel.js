const { Schema, model } = require("mongoose");

const betSchema = Schema(
  {
    periodName: {
      type: String,
      required: true,
    },
    periodId: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    betAmount: {
      type: Number,
      required: true,
    },
    resultAmount: {
      type: Number,
      default: 0,
    },
    prediction: {
      type: String || Number,
      required: true,
    },
    didWon: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("bets", betSchema);
