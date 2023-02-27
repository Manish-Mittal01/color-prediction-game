const { Schema, model } = require("mongoose");

const transactionSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = model("transactions", transactionSchema);
