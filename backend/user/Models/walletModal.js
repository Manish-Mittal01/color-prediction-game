const { Schema, model } = require("mongoose");
const shortid = require("shortid");

const walletSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
      required: shortid.generate(),
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    withdrawableAmount: {
      type: Number,
      default: 0,
    },
    referalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("wallets", walletSchema);
