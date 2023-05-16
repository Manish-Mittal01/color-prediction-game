const { Schema, model } = require("mongoose");

const transactionSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    requestTime: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    transactionType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    wallet: {
      type: Number,
      required: true
    },
    referranceId: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = model("transactions", transactionSchema);
